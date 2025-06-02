"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ui/ThemeToggle";
import { NavigationItem } from "@/types/site";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial check for scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const anchorLink = (item: NavigationItem) => {
    return (
      <Link
        key={item.href}
        href={item.href}
        className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        onClick={(e) => handleNavClick(e, item.href)}
      >
        {item.name}
      </Link>
    )
  }

  const labelLink = (item: NavigationItem) => {
    return (
      <Link
        key={item.href}
        href={item.href}
        className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        onClick={(e) => handleNavClick(e, item.href)}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90"
          : isOpen ? "bg-gray-200 dark:bg-gray-800  shadow sm:bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex h-16 items-center ${
            isScrolled ? "justify-between" : "justify-end"
          }`}
        >
          {isScrolled && (
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
            >
              {siteConfig.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {siteConfig.navigation.map((item) => (
              item.label ? labelLink(item) : anchorLink(item)
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="space-y-4 py-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsOpen(false);
                }}
                className="block text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
