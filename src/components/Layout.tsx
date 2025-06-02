import Head from 'next/head';
import { siteConfig } from '@/config/site';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from "@/components/Footer";
import { LayoutProps } from '@/types/components';

const Layout = ({ 
  children, 
  title = siteConfig.title,
  description = siteConfig.description
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={`${siteConfig.name} - ${siteConfig.title}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col flex-1 pt-16">
          <main className="flex flex-col flex-1">{children}</main>

          <Footer />
        </div>

        <ScrollToTop />
      </div>
    </>
  );
};

export default Layout;
