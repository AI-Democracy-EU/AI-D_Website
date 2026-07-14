import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LiteratureProps, LiteratureItem } from './types';

/*
 * NOTE: The following functions are used to format the literature items.
 * See https://studyflix.de/studientipps/nach-apa-zitieren-998 for reference.
 */

function formatAuthor(item: LiteratureItem) {
  const formatted = item.author ? item.author : item.title;
  return formatted;
}

function formatTitle(item: LiteratureItem) {
  if (item.author) {
    let formatted = item.title;
    if (item.edition) formatted += ` (${item.edition} ed.)`;
    formatted += '. ';
    return formatted;
  }

  return ' ';
}

function formatEditors(item: LiteratureItem) {
  if (item.editors && item.editors.length > 0) {
    let formatted = `In ${item.editors.join(',')}`;
    if (item.editors.length === 1) formatted += ' (Ed.), ';
    else formatted += ' (Eds.), ';
    return formatted;
  }

  return '';
}
function formatJournal(item: LiteratureItem) {
  let formatted = formatEditors(item);
  formatted += item.journal;
  if (item.volume) {
    formatted += `, ${item.volume}`;
    if (item.issue) formatted += `(${item.issue})`;
  }
  if (item.number) {
    formatted += `, ${item.number}`;
  }
  if (item.pages) {
    if (item.pages.includes('-')) formatted += `, pp. ${item.pages}`;
    else formatted += `, p. ${item.pages}`;
  }
  formatted += '. ';
  return formatted;
}

function Literature({ sections }: LiteratureProps) {
  const t = useTranslations('Bibliography');
  const retrievedText = t('retrievedText');

  return (
    <div>
      {sections
        && sections.length > 0
        && sections.map((section, ix1) => (
          <div key={ix1}>
            {section.heading && section.heading.length > 0 && (
              <h2 className="lg:text_2xl mb-2 text-lg md:text-xl">{t(section.heading)}</h2>
            )}
            <ul className="mb-4 text-sm md:text-base">
              {section.items.map((item, ix2) => (
                <li className="mb-2" key={ix2} id={item.id}>
                  {formatAuthor(item)}
                  {item.date ? ` (${item.date}). ` : '. '}
                  <span className="italic">{formatTitle(item)}</span>
                  {item.source && `${item.source}. `}
                  {item.journal && formatJournal(item)}
                  {item.publisher && `${item.publisher}. `}
                  {item.link && (
                    <Link href={item.link.url}>
                      {item.link.text ? item.link.text : item.link.url}
                    </Link>
                  )}
                  {item.retrieved && ` (${retrievedText}: ${item.retrieved})`}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default Literature;
