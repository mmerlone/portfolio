"use client";

import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactElement,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import ConfigBar from "@/components/ConfigBar";
import { cn } from "@/lib/cn";

const Navbar = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent): void => {
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
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      wasMobileMenuOpenRef.current = true;
      const frame = window.requestAnimationFrame(() => {
        mobileFirstLinkRef.current?.focus();
      });

      return (): void => window.cancelAnimationFrame(frame);
    }

    if (wasMobileMenuOpenRef.current) {
      wasMobileMenuOpenRef.current = false;
      mobileMenuButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries): void => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActiveSection(visibleEntries[0].target.id);
        } else if (window.scrollY < 100) {
          setActiveSection("");
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
    );

    const elements: HTMLElement[] = siteConfig.navigation
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => document.getElementById(item.href.substring(2)))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));
    return (): void => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ): void => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const id = href.substring(2);
        const el = document.getElementById(id);
        if (el) {
          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          el.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
          setActiveSection(id);
        }
      } else {
        setActiveSection(href.substring(2));
      }
    }
  };

  const navClasses =
    isScrolled || isOpen
      ? "bg-gray-200 dark:bg-gray-800"
      : !isOpen
        ? "transparent"
        : "bg-gray-200 dark:bg-gray-800";

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        navClasses,
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex h-16 items-center",
            isScrolled ? "justify-between" : "justify-end",
          )}
        >
          {isScrolled && (
            <Link
              href="/#top"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
            >
              {portfolio.basic.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <ul className="hidden items-center space-x-4 md:flex">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors duration-500 ease-in-out",
                    item.href.startsWith("/#")
                      ? activeSection === item.href.substring(2)
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                      : pathname === item.href
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400",
                  )}
                  onClick={(e): void => handleNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ConfigBar />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-inset md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
          >
            {isOpen ? (
              <XIcon size={24} weight="bold" />
            ) : (
              <ListIcon size={24} weight="bold" />
            )}
          </button>

          {/* Mobile menu content */}
          <div
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            hidden={!isOpen}
            className={cn(
              "fixed top-16 right-0 left-0 z-40 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-b-xl border border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900",
            )}
          >
            <ul className="space-y-4 py-4">
              {siteConfig.navigation.map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? mobileFirstLinkRef : undefined}
                    href={item.href}
                    onClick={(e): void => {
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
                          : "text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="m-1 max-w-fit flex-none">
                <ConfigBar />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
