import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Work',
      links: [
        {
          text: 'Case Studies',
          href: getPermalink('/#case-studies'),
        },
        {
          text: 'Expertise',
          href: getPermalink('/#features'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'The Lab',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Get In Touch', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Work',
      links: [
        { text: 'Case Studies', href: getPermalink('/#case-studies') },
        { text: 'Expertise', href: getPermalink('/#features') },
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'The Lab',
      links: [
        { text: 'All Posts', href: getBlogPermalink() },
        { text: 'AI & Agents', href: getPermalink('ai-agents', 'category') },
        { text: 'Infrastructure', href: getPermalink('infrastructure', 'category') },
        { text: 'Game Dev', href: getPermalink('game-dev', 'category') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `Built with Astro · All rights reserved.`,
};
