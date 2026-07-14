'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';

export interface Quiz {
  questionTitle: string;
  correctAnswer: string | string[];
  options: string[];
  text: string;
}

export interface UserAnswer {
  question: string;
  correctAnswer: string | string[];
  userAnswers: string[];
}

interface LocalQuizState {
  currentQuizIndex: number;
  selectedAnswers: string[];
  correctAnswers: number;
  wrongAnswers: number;
  userAnswers: UserAnswer[];
  quizFinished: boolean;
}

type LocalQuizAction =
  | { type: 'TOGGLE_SELECTED_ANSWER'; payload: string }
  | { type: 'VALIDATE_ANSWER'; payload: UserAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' };

interface LocalQuizContextType extends LocalQuizState {
  dispatch: React.Dispatch<LocalQuizAction>;
  quizData: Quiz[];
}

const LocalQuizContext = createContext<LocalQuizContextType | null>(null);

const initialState: LocalQuizState = {
  currentQuizIndex: 0,
  selectedAnswers: [],
  correctAnswers: 0,
  wrongAnswers: 0,
  userAnswers: [],
  quizFinished: false,
};

function localQuizReducer(
  state: LocalQuizState,
  action: LocalQuizAction,
  toast: any,
  t: any,
): LocalQuizState {
  switch (action.type) {
    case 'TOGGLE_SELECTED_ANSWER':
      // console.log('Vorher:', state.selectedAnswers);
      // console.log('Aktuelle Auswahl:', action.payload);

      const isSelected = state.selectedAnswers.includes(action.payload);
      const newSelectedAnswers = isSelected
        ? state.selectedAnswers.filter((answer) => answer !== action.payload)
        : [...state.selectedAnswers, action.payload];

      // console.log('Nachher:', newSelectedAnswers);
      return {
        ...state,
        selectedAnswers: newSelectedAnswers,
        currentQuizIndex: state.currentQuizIndex,
      };
    // console.log('toggle');
    // const isSelected = state.selectedAnswers.includes(action.payload);
    // const newSelectedAnswers = isSelected
    //   ? state.selectedAnswers.filter((answer) => answer !== action.payload)
    //   : [...state.selectedAnswers, action.payload];
    // return { ...state, selectedAnswers: newSelectedAnswers };
    case 'VALIDATE_ANSWER':
      const correctAnswer = Array.isArray(action.payload.correctAnswer)
        ? action.payload.correctAnswer
        : [action.payload.correctAnswer];
      const isCorrect =
        correctAnswer.length === action.payload.userAnswers.length
        && correctAnswer.every((answer) => action.payload.userAnswers.includes(answer));
      toast({
        title: isCorrect ? t('toast.correctTitle') : t('toast.incorrectTitle'),
        // description: isCorrect ? t('toast.correctDescription') : t('toast.incorrectDescription'),
        description: isCorrect
          ? t('toast.correctDescription')
          : `Correct Answer(s): ${correctAnswer}`,
        variant: isCorrect ? 'success' : 'destructive',
      });
      return {
        ...state,
        correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
        wrongAnswers: isCorrect ? state.wrongAnswers : state.wrongAnswers + 1,
        userAnswers: [...state.userAnswers, action.payload],
        selectedAnswers: [],
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuizIndex: state.currentQuizIndex + 1,
        selectedAnswers: [],
      };
    case 'FINISH_QUIZ':
      return { ...state, quizFinished: true };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

export const LocalQuizProvider: React.FC<{ children: React.ReactNode; quizData: Quiz[] }> = ({
  children,
  quizData,
}) => {
  const { toast } = useToast();
  const t = useTranslations('Quiz1');
  const [state, dispatch] = useReducer(
    (state: LocalQuizState, action: LocalQuizAction) => localQuizReducer(state, action, toast, t),
    initialState,
  );

  return (
    <LocalQuizContext.Provider value={{ ...state, dispatch, quizData }}>
      {children}
    </LocalQuizContext.Provider>
  );
};

export const useLocalQuiz = () => {
  const context = useContext(LocalQuizContext);
  if (!context) {
    throw new Error('useLocalQuiz must be used within a LocalQuizProvider');
  }
  return context;
};
