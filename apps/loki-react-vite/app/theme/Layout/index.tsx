import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from '../providers/ThemeProvider';
import { Header, Footer, AsideMenu } from '../components';
import { Container } from '@mui/material';

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
        <ThemeProvider>
          <Header />
          <section className="flex pt-16 min-h-screen">
            <AsideMenu />
            <main className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
              <Container
                component="article"
                maxWidth="xl"
                className="flex-1"
                sx={{ p: 3 }}
              >
                {children}
              </Container>
              <Footer />
            </main>
          </section>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
