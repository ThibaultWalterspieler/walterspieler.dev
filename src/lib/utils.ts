import { DICTIONARIES } from '@/lib/i18n/constants';
import { Locale } from '@/lib/i18n/types';
import { clsx, type ClassValue } from 'clsx';
import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { twMerge } from 'tailwind-merge';
import { BASE_URL } from '../../next.constants.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateAlternates = (
  pathWithoutLang: string,
  lang: Locale
): AlternateURLs => {
  const locales = Object.keys(DICTIONARIES) as Locale[];

  const languages: AlternateURLs['languages'] = locales.reduce<
    Record<Locale | 'x-default', string>
  >(
    (languages, language) => {
      languages[language] = `${BASE_URL}/${language}/${pathWithoutLang}`;

      return languages;
    },
    {
      'x-default': `${BASE_URL}/${pathWithoutLang}`,
      'en-gb': '',
      'fr-fr': '',
    }
  );

  return {
    canonical: `${BASE_URL}/${lang === 'en-gb' ? '' : lang}${pathWithoutLang}`,
    languages,
  };
};
