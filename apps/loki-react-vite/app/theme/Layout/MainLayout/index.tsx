import { Header, Footer, AsideMenu } from './components';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section className="flex pt-16 min-h-screen">
        <AsideMenu />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 pb-12">
          <article className="prose dark:prose-invert max-w-none">
            {children}
          </article>
        </main>
        <Footer />
      </section>
    </>
  );
};
