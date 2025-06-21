import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { MainLayout } from './MainLayout';
import { MuiProvider } from './MuiProvider';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        suppressHydrationWarning={true}
        className="text-gray-900 dark:text-white"
      >
        <MuiProvider>
          <MainLayout>{children}</MainLayout>
        </MuiProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
