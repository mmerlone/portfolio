"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { FaBars, FaTimes } from "react-icons/fa";
import ConfigBar from "@/components/ConfigBar";
import { cn } from "@/lib/cn"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef, mobileMenuButtonRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by boundingClientRect.top to find the topmost visible section
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActiveSection(visibleEntries[0].target.id);
        } else if (window.scrollY < 100) {
          // If at the very top of the page
          setActiveSection("");
        }
        // If no sections are intersecting and not at the top, activeSection retains its value
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }, // Adjusted threshold and rootMargin for better detection
    );

    siteConfig.navigation.forEach((item) => {
      if (item.href.startsWith("/#")) {
        const id = item.href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => {
      siteConfig.navigation.forEach((item) => {
        if (item.href.startsWith("/#")) {
          const id = item.href.substring(2);
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        }
      });
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      // Only prevent default and scroll if we are already on the main page
      if (pathname === "/") {
        e.preventDefault();
        const id = href.substring(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }
      } else {
        // If navigating from a different page, allow Next.js Link to handle full page navigation
        // The browser will then handle the anchor scroll after the page loads
        setActiveSection(href.substring(2)); // Set active section immediately for visual feedback
      }
    }
  };

  const navClasses =
    isScrolled || isOpen
      ? "bg-gray-200 shadow dark:bg-gray-800"
      : !isOpen
        ? "transparent"
        : "bg-gray-200 shadow dark:bg-gray-800";

  return (
    <nav
      className={cn("fixed top-0 right-0 left-0 z-50 transition-all duration-300", navClasses)}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex h-16 items-center",
            isScrolled ? "justify-between" : "justify-end"
          )}
        >
          {isScrolled && (
            <Link
              href="/#top"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
            >
              {siteConfig.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors duration-500 ease-in-out",
                  item.href.startsWith("/#")
                    ? activeSection === item.href.substring(2)
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                    : pathname === item.href
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                )}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
            <ConfigBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef} // Attach ref to button
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
          ref={mobileMenuRef} // Attach ref to mobile menu div
          className={cn(
            "transition-all duration-300 ease-in-out md:hidden overflow-hidden",
            isOpen ? "opacity-100" : "max-h-0 opacity-0"
          )}
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
                className={cn(
                  "block transition-colors duration-500 ease-in-out",
                  item.href.startsWith("/#")
                    ? activeSection === item.href.substring(2)
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    : pathname === item.href
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="m-1 max-w-fit flex-none">
              <ConfigBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
