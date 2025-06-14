import usa from './us.svg';
import brazil from './br.svg';
import spain from './es.svg';
import france from './fr.svg';
import germany from './de.svg';

export const flags = {
  en: usa,
  pt: brazil,
  es: spain,
  fr: france,
  de: germany,
} as const;

export type CountryCode = keyof typeof flags;
