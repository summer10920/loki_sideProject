import { type LinksFunction } from 'react-router';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
    as: 'style',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
  },
  {
    rel: 'stylesheet',
    href: '../../../styles.css',
  },
]; 