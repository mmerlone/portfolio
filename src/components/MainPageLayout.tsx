"use client";

import React, { ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout: React.FC<MainPageLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col pt-16">
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default MainPageLayout;
