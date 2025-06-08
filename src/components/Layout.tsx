import Head from "next/head";
import { siteConfig } from "@/config/site";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { LayoutProps } from "@/types/components";

const Layout = ({
  children,
  title = siteConfig.title,
  description = siteConfig.description,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content={`${siteConfig.name} - ${title}`}
        />
        <meta property="og:description" content={description} />
      </Head>

      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col pt-16">
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Layout;
