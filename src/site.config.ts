/** Site configuration — edit this file to customize your blog. */
export const site = {
  /** Production URL (no trailing slash). */
  baseUrl: 'https://astro-theme-aonote.vercel.app',
  /** GitHub Pages subpath, e.g. "/repo-name". Leave empty for root deploy. */
  repoSubpath: '',
  title: 'Kr4ko',
  description:
    'My Blog',
  author: 'Kr4ko',
  language: 'ja',
  maxPostsOnIndex: 5,
  copyright: {
    enable: true,
    type: 'CC_BY_NC_SA_4_0' as const,
    customText: '',
    showLicenseIcon: true,
    showStandardFormat: true,
    additionalNote: '',
  },
} as const;

export type SiteConfig = typeof site;
