'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/dist/client/link';

interface MemoryCard {
  id: string;
  content: string;
  type: 'term' | 'definition';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const hoverStyle = `
  @media (hover: hover) {
    .memory-card:not(:disabled):hover {
      @apply from-slate-150 to-slate-100 border-futurePink shadow-md;
    }
  }
  
  @media (hover: none) {
    .memory-card {
      outline: none !important;
      -webkit-tap-highlight-color: transparent;
    }
    .memory-card:focus {
      outline: none !important;
    }
    .memory-card:focus-visible {
      outline: none !important;
    }
  }
  
  @keyframes cardFlipBack {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
  
  .card-flip-back {
    animation: cardFlipBack 0.5s ease-in-out forwards;
  }
`;

export default function MemoryGame() {
  const t = useTranslations('MemoryGame');
  const terms = t.raw('terms') as any[];
  const showExplanations = t.raw('showExplanations') === true;

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardsToFlip, setCardsToFlip] = useState<string[]>([]);
  const [pairLimit, setPairLimit] = useState<number | null>(null);
  const [pairCount, setPairCount] = useState<number>(terms.length);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [explanationData, setExplanationData] = useState<{
    term: string;
    explanation: string;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameWon]);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [terms, pairLimit]);

  // Compute how many pairs fit in the viewport (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mounted = true;

    const computeLimit = () => {
      const gridEl = gridRef.current;

      // If we're on a desktop-sized viewport, use a deterministic cap: 9 pairs (18 cards).
      // This avoids variability caused by measuring elements before fonts/images/layout stabilize.
      if (window.innerWidth >= 1024) {
        if (mounted) setPairLimit(Math.min(9, terms.length));
        return;
      }

      // Determine columns and estimated card height based on breakpoints to keep
      // behavior consistent across refreshes on mobile devices.
      let cols: number;
      let cardHeight: number;

      if (window.innerWidth >= 768) {
        cols = 5; // md:grid-cols-5
        cardHeight = 150;
      } else if (window.innerWidth >= 640) {
        cols = 4; // sm:grid-cols-4
        cardHeight = 150;
      } else {
        cols = 2; // small phones
        cardHeight = 120;
      }

      // Compute available height for the grid. Prefer exact position if available,
      // otherwise use a stable fraction of viewport height to avoid jitter.
      let availHeight = Math.floor(window.innerHeight * 0.6);
      if (gridEl) {
        const gridRect = gridEl.getBoundingClientRect();
        const safetyMargin = 100;
        if (gridRect && gridRect.top > 0) {
          availHeight = Math.max(0, window.innerHeight - gridRect.top - safetyMargin);
        }
      }

      const rows = Math.max(1, Math.floor(availHeight / cardHeight));
      const maxCardsVisible = rows * cols;
      const maxPairsVisible = Math.max(2, Math.floor(maxCardsVisible / 2));

      if (mounted) setPairLimit(Math.min(maxPairsVisible, terms.length));
    };

    const id = window.setTimeout(computeLimit, 50);
    window.addEventListener('resize', computeLimit);
    window.addEventListener('orientationchange', computeLimit);

    return () => {
      mounted = false;
      window.clearTimeout(id);
      window.removeEventListener('resize', computeLimit);
      window.removeEventListener('orientationchange', computeLimit);
    };
  }, [terms]);

  const initializeGame = () => {
    // determine which terms to use (limit by pairLimit if available)
    const effectiveLimit = pairLimit && pairLimit < terms.length ? pairLimit : terms.length;
    let termsToUse = terms;
    if (effectiveLimit < terms.length) {
      const idxs = terms.map((_, i) => i);
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
      }
      termsToUse = idxs.slice(0, effectiveLimit).map((i) => terms[i]);
    }

    const gameCards: MemoryCard[] = [];
    termsToUse.forEach((item: any) => {
      gameCards.push({
        id: `term-${item.id}`,
        content: item.term,
        type: 'term',
        pairId: item.id,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `def-${item.id}`,
        content: item.definition,
        type: 'definition',
        pairId: item.id,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setPairCount(termsToUse.length);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setSeconds(0);
    setGameWon(false);
    setGameStarted(false);
    setIsChecking(false);
    setCardsToFlip([]);
  };

  const handleCardClick = (cardId: string) => {
    // Start timer on first card click
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Prevent clicking if:
    // - card is already flipped
    // - currently checking for a match
    // - already matched
    // - game is won
    if (
      flippedCards.includes(cardId)
      || isChecking
      || matchedPairs.includes(cards.find((c) => c.id === cardId)?.pairId || 0)
      || gameWon
    ) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    // If we already have 2 flipped cards and user clicks a third, check the previous pair
    if (newFlipped.length === 3) {
      setMoves(moves + 1);
      setIsChecking(true);
      checkMatch([newFlipped[0], newFlipped[1]]);
      // Remove the first two cards and keep only the new card
      setFlippedCards([cardId]);
    } else if (newFlipped.length === 2) {
      // Check if this is the last pair (no more unflipped/unmatched cards to click)
      const unmatchedUnflippedCards = cards.filter(
        (c) => !matchedPairs.includes(c.pairId) && !newFlipped.includes(c.id),
      );

      // If no more cards to flip, auto-check this pair after a short delay
      if (unmatchedUnflippedCards.length === 0) {
        setMoves(moves + 1);
        setIsChecking(true);
        // Small delay so user can see both cards before checking
        setTimeout(() => {
          checkMatch(newFlipped);
          setFlippedCards([]);
        }, 800);
      } else {
        // Just record the second card, don't check yet
        setIsChecking(false);
      }
    }

    // Blur the button to remove focus on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      (document.activeElement as HTMLButtonElement)?.blur();
    }
  };

  const checkMatch = (flipped: string[]) => {
    const card1 = cards.find((c) => c.id === flipped[0]);
    const card2 = cards.find((c) => c.id === flipped[1]);

    if (card1 && card2 && card1.pairId === card2.pairId) {
      // Match found
      const matchedPairId = card1.pairId;
      setMatchedPairs((prev) => {
        const next = [...prev, matchedPairId];
        // Check if game is won using current pair count
        if (next.length === pairCount) {
          setTimeout(() => setGameWon(true), 300);
        }
        return next;
      });

      // Show explanation modal if enabled - get term data by pairId
      if (showExplanations) {
        const termData = terms.find((t: any) => t.id === matchedPairId);
        if (termData && termData.explanation) {
          setExplanationData({
            term: termData.term,
            explanation: termData.explanation,
          });
          setShowExplanationModal(true);
        }
      }

      setIsChecking(false);
    } else {
      // No match, animate cards flipping back
      setCardsToFlip(flipped);
      setTimeout(() => {
        setFlippedCards((prev) => prev.filter((id) => !flipped.includes(id)));
        setCardsToFlip([]);
        setIsChecking(false);
      }, 600);
    }
  };

  const isCardFlipped = (cardId: string) => {
    return (
      flippedCards.includes(cardId)
      || matchedPairs.includes(cards.find((c) => c.id === cardId)?.pairId || 0)
    );
  };

  const closeExplanationModal = () => {
    setShowExplanationModal(false);
    setExplanationData(null);
  };

  return (
    <div className="w-full p-4">
      <style>{hoverStyle}</style>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-cableBlack">{t('title')}</h1>
        <p className="mb-6 text-lg text-gray-600">{t('description')}</p>
        <div className="mb-6 flex flex-wrap justify-center gap-8">
          <div className="text-lg">
            <span className="font-semibold text-cableBlack">{t('moves')}:</span>{' '}
            <span className="ml-2 text-xl font-bold text-futurePink">{moves}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-cableBlack">{t('matched')}:</span>{' '}
            <span className="ml-2 text-xl font-bold text-futurePink">
              {matchedPairs.length}/{pairCount}
            </span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-cableBlack">{t('time')}:</span>{' '}
            <span className="ml-2 text-xl font-bold text-futurePink">
              {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Win Animation */}
      {gameWon && (
        <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-100 p-8 text-center">
          <p className="text-3xl font-bold text-green-700">{t('congratulations')}</p>
        </div>
      )}

      {/* Game Grid - Horizontal Layout */}
      <div className="mb-8 flex justify-center px-1 sm:px-2">
        <div
          ref={gridRef}
          className="grid w-full max-w-7xl grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2 md:grid-cols-5 md:gap-3 lg:grid-cols-6"
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isChecking || gameWon || isCardFlipped(card.id)}
              className="memory-card w-full outline-none disabled:opacity-100 md:aspect-square"
            >
              <Card
                className={`flex h-full min-h-[130px] w-full cursor-pointer flex-col items-center justify-center border-2 p-2 transition-all duration-200 sm:min-h-[150px] sm:p-2.5 md:min-h-0 md:p-3 ${
                  isCardFlipped(card.id)
                    ? matchedPairs.includes(card.pairId)
                      ? 'border-gray-500 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 shadow-lg'
                      : card.type === 'term'
                        ? 'border-blue-400 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 shadow-lg'
                        : 'border-purple-400 bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 shadow-lg'
                    : 'border-gray-400 bg-gradient-to-br from-gray-500 to-gray-600 [&:hover]:shadow-md'
                } ${cardsToFlip.includes(card.id) ? 'card-flip-back' : ''}`}
                style={
                  !isCardFlipped(card.id)
                    ? {
                        backgroundImage: `url('/memory_background.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                {isCardFlipped(card.id) ? (
                  <div
                    className={`max-w-full break-words text-center text-[9px] font-semibold leading-tight sm:text-xs md:text-sm ${
                      matchedPairs.includes(card.pairId)
                        ? 'text-gray-700'
                        : card.type === 'term'
                          ? 'text-blue-900'
                          : 'text-purple-900'
                    }`}
                  >
                    {card.content}
                  </div>
                ) : null}
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="mx-4 my-4 flex flex-col items-center justify-center md:flex-row lg:mx-0">
        <div className="flex w-auto justify-center md:w-full">
          <Button
            onClick={initializeGame}
            className="mx-auto my-4 block flex h-12 w-auto items-center justify-center gap-4 px-6 text-base font-medium sm:text-lg">
            {gameWon ? t('playAgain') : t('resetGame')}
          </Button>
        </div>
        <Link href="webinars" className="flex w-auto justify-center md:w-full">
          <Button className="mx-auto my-4 block flex h-12 items-center justify-center gap-4 px-6 text-base font-medium sm:text-lg">
            {t('backToWebinars')}
          </Button>
        </Link>
      </div>

      {/* Explanation Modal */}
      {showExplanationModal && explanationData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={closeExplanationModal}
        >
          <div
            className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeExplanationModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="pr-8">
              <h2 className="mb-4 text-2xl font-bold text-cableBlack">{explanationData.term}</h2>
              <p className="leading-relaxed text-gray-700">{explanationData.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
