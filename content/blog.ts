import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { blogEn } from './blog.en';
import { blogEs } from './blog.es';
import type { BlogContent, BlogPost } from './blog.en';

const BLOG: Record<Locale, BlogContent> = { en: blogEn, es: blogEs };

export const getBlog = (locale: Locale): BlogContent => BLOG[locale] ?? BLOG[DEFAULT_LOCALE];
export type { BlogContent, BlogPost };
