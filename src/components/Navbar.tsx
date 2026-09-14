"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
  type ReactElement,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import { ListIcon, XIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useDismissOnOutsideOrEscape } from "@/hooks/useDismissOnOutsideOrEscape";
import type {
  NavigationGroupItem,
  NavigationItem,
  NavigationLinkItem,
} from "@/types/site";

const isNavigationLinkItem = (
  item: NavigationItem,
): item is NavigationLinkItem => "href" in item;

const isNavigationGroupItem = (
  item: NavigationItem,
): item is NavigationGroupItem => "children" in item;

const isNavItemActive = (
  item: NavigationLinkItem,
  activeSection: string,
  pathname: string,
): boolean =>
  item.href.startsWith("/#")
    ? activeSection === item.href.substring(2)
    : pathname === item.href;

const getNavLinkClassName = (
  item: NavigationLinkItem,
  activeSection: string,
  pathname: string,
  extra?: string,
): string =>
  [
    "nav-link transition-colors duration-500 ease-in-out",
    extra,
    isNavItemActive(item, activeSection, pathname)
      ? "nav-link--active text-orange-600 dark:text-orange-400"
      : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400",
  ]
    .filter((cls): cls is string => Boolean(cls))
    .join(" ");

const Navbar = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasMobileMenuOpenRef = useRef(false);
  const sectionsTriggerRef = useRef<HTMLButtonElement>(null);
  const sectionsPanelRef = useRef<HTMLDivElement>(null);
  const sectionsFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasSectionsOpenRef = useRef(false);
  const caseStudiesTriggerRef = useRef<HTMLButtonElement>(null);
  const caseStudiesPanelRef = useRef<HTMLDivElement>(null);
  const caseStudiesFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasCaseStudiesOpenRef = useRef(false);

  const closeMobileMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const closeSectionsMenu = useCallback((): void => {
    setIsSectionsOpen(false);
  }, []);

  const closeCaseStudiesMenu = useCallback((): void => {
    setIsCaseStudiesOpen(false);
  }, []);

  useDismissOnOutsideOrEscape({
    isOpen,
    onDismiss: closeMobileMenu,
    containerRefs: [mobileMenuRef, mobileMenuButtonRef],
  });

  useDismissOnOutsideOrEscape({
    isOpen: isSectionsOpen,
    onDismiss: closeSectionsMenu,
    containerRefs: [sectionsPanelRef, sectionsTriggerRef],
  });

  useDismissOnOutsideOrEscape({
    isOpen: isCaseStudiesOpen,
    onDismiss: closeCaseStudiesMenu,
    containerRefs: [caseStudiesPanelRef, caseStudiesTriggerRef],
  });

  useEffect(() => {
    if (isOpen) {
      wasMobileMenuOpenRef.current = true;
      const frame = window.requestAnimationFrame(() => {
        mobileFirstLinkRef.current?.focus();
      });

      return (): void => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (wasMobileMenuOpenRef.current) {
      wasMobileMenuOpenRef.current = false;
      mobileMenuButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSectionsOpen) {
      wasSectionsOpenRef.current = true;
      const frame = window.requestAnimationFrame(() => {
        sectionsFirstLinkRef.current?.focus();
      });

      return (): void => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (wasSectionsOpenRef.current) {
      wasSectionsOpenRef.current = false;
      sectionsTriggerRef.current?.focus();
    }
  }, [isSectionsOpen]);

  useEffect(() => {
    if (isCaseStudiesOpen) {
      wasCaseStudiesOpenRef.current = true;
      const frame = window.requestAnimationFrame(() => {
        caseStudiesFirstLinkRef.current?.focus();
      });

      return (): void => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (wasCaseStudiesOpenRef.current) {
      wasCaseStudiesOpenRef.current = false;
      caseStudiesTriggerRef.current?.focus();
    }
  }, [isCaseStudiesOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      .filter(isNavigationLinkItem)
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => document.getElementById(item.href.substring(2)))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => {
      observer.observe(el);
    });
    return (): void => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
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
    isScrolled || isOpen ? "bg-gray-200 dark:bg-gray-700" : "transparent";
  const showLogo = isScrolled || pathname !== "/";

  // Navbar persists across route changes; stale in-page-section state must not leak off "/".
  const effectiveActiveSection = pathname === "/" ? activeSection : "";

  const sectionItems = siteConfig.navigation.filter(
    (item): item is NavigationLinkItem =>
      isNavigationLinkItem(item) && item.group === "sections",
  );
  const caseStudiesGroup = siteConfig.navigation.find(
    (item) => item.group === "case-studies",
  );
  const isCaseStudiesActive =
    caseStudiesGroup !== undefined &&
    isNavigationGroupItem(caseStudiesGroup) &&
    caseStudiesGroup.children.some((item) =>
      isNavItemActive(item, effectiveActiveSection, pathname),
    );
  const isSectionsActive = sectionItems.some((item) =>
    isNavItemActive(item, effectiveActiveSection, pathname),
  );

  const desktopNavItems: ReactElement[] = [];
  let sectionsDropdownInserted = false;
  siteConfig.navigation.forEach((item) => {
    if (isNavigationLinkItem(item) && item.group === "sections") {
      if (sectionsDropdownInserted) return;
      sectionsDropdownInserted = true;
      desktopNavItems.push(
        <li key="on-this-page" className="relative">
          <button
            ref={sectionsTriggerRef}
            type="button"
            className={
              isSectionsActive
                ? "nav-link nav-link--active flex items-center gap-1 text-orange-600 transition-colors duration-500 ease-in-out dark:text-orange-400"
                : "nav-link flex items-center gap-1 text-gray-600 transition-colors duration-500 ease-in-out hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
            }
            aria-haspopup="true"
            aria-expanded={isSectionsOpen}
            aria-controls="on-this-page-menu"
            onClick={() => {
              setIsSectionsOpen((open) => !open);
            }}
          >
            Root
            <CaretDownIcon
              size={14}
              weight="bold"
              className={
                isSectionsOpen
                  ? "rotate-180 transition-transform duration-200"
                  : "transition-transform duration-200"
              }
            />
          </button>
          <div
            ref={sectionsPanelRef}
            id="on-this-page-menu"
            hidden={!isSectionsOpen}
            className="absolute top-full left-0 z-40 mt-2 min-w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <ul className="space-y-1">
              {sectionItems.map((sectionItem, index) => (
                <li key={sectionItem.href}>
                  <Link
                    ref={index === 0 ? sectionsFirstLinkRef : undefined}
                    href={sectionItem.href}
                    className={getNavLinkClassName(
                      sectionItem,
                      effectiveActiveSection,
                      pathname,
                      "block rounded-md px-2 py-1",
                    )}
                    onClick={(e): void => {
                      handleNavClick(e, sectionItem.href);
                      setIsSectionsOpen(false);
                    }}
                  >
                    {sectionItem.shortLabel ?? sectionItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>,
      );
      return;
    }

    if (isNavigationGroupItem(item)) {
      desktopNavItems.push(
        <li key={item.group} className="relative">
          <button
            ref={caseStudiesTriggerRef}
            type="button"
            className={
              isCaseStudiesActive
                ? "nav-link nav-link--active flex items-center gap-1 text-orange-600 transition-colors duration-500 ease-in-out dark:text-orange-400"
                : "nav-link flex items-center gap-1 text-gray-600 transition-colors duration-500 ease-in-out hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
            }
            aria-haspopup="true"
            aria-expanded={isCaseStudiesOpen}
            aria-controls="case-studies-menu"
            onClick={() => {
              setIsCaseStudiesOpen((open) => !open);
            }}
          >
            {item.label}
            <CaretDownIcon
              size={14}
              weight="bold"
              className={
                isCaseStudiesOpen
                  ? "rotate-180 transition-transform duration-200"
                  : "transition-transform duration-200"
              }
            />
          </button>
          <div
            ref={caseStudiesPanelRef}
            id="case-studies-menu"
            hidden={!isCaseStudiesOpen}
            className="absolute top-full left-0 z-40 mt-2 min-w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <ul className="space-y-1">
              {item.children.map((child, index) => (
                <li key={child.href}>
                  <Link
                    ref={index === 0 ? caseStudiesFirstLinkRef : undefined}
                    href={child.href}
                    className={getNavLinkClassName(
                      child,
                      effectiveActiveSection,
                      pathname,
                      "block rounded-md px-2 py-1",
                    )}
                    onClick={() => {
                      setIsCaseStudiesOpen(false);
                    }}
                  >
                    {child.shortLabel ?? child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>,
      );
      return;
    }

    desktopNavItems.push(
      <li key={item.href}>
        <Link
          href={item.href}
          className={getNavLinkClassName(
            item,
            effectiveActiveSection,
            pathname,
          )}
          onClick={(e): void => {
            handleNavClick(e, item.href);
          }}
        >
          {item.shortLabel ?? item.label}
        </Link>
      </li>,
    );
  });

  return (
    <nav
      aria-label="Primary navigation"
      className={
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 " +
        navClasses
      }
    >
      <div className="container mx-auto px-4">
        <div
          className={
            "flex h-16 items-center " +
            (showLogo ? "justify-between" : "justify-end")
          }
        >
          {showLogo && (
            <Link
              href="/#top"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-orange-600 dark:text-gray-100 dark:hover:text-orange-400"
            >
              {portfolio.basic.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <ul className="hidden items-center space-x-4 md:flex">
            {desktopNavItems}
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-orange-600 focus:ring-2 focus:ring-orange-600 focus:outline-none focus:ring-inset md:hidden dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-orange-400 dark:focus:ring-orange-400"
            onClick={() => {
              setIsOpen((open) => !open);
            }}
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
            className="fixed top-16 right-0 left-0 z-40 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-b-xl border border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-800"
          >
            <ul className="space-y-4 py-4">
              {sectionItems.length > 0 && (
                <li>
                  <p className="px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Root
                  </p>
                  <ul className="mt-2 space-y-2">
                    {sectionItems.map((item, index) => (
                      <li key={item.href}>
                        <Link
                          ref={index === 0 ? mobileFirstLinkRef : undefined}
                          href={item.href}
                          onClick={(e): void => {
                            handleNavClick(e, item.href);
                            setIsOpen(false);
                          }}
                          className={getNavLinkClassName(
                            item,
                            effectiveActiveSection,
                            pathname,
                            "block px-4",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              {siteConfig.navigation
                .filter(
                  (item) =>
                    !isNavigationLinkItem(item) || item.group !== "sections",
                )
                .map((item) => {
                  if (isNavigationGroupItem(item)) {
                    return (
                      <li key={item.group}>
                        <p className="px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item.label}
                        </p>
                        <ul className="mt-2 space-y-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                                className={getNavLinkClassName(
                                  child,
                                  effectiveActiveSection,
                                  pathname,
                                  "block px-4",
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e): void => {
                          handleNavClick(e, item.href);
                          setIsOpen(false);
                        }}
                        className={getNavLinkClassName(
                          item,
                          effectiveActiveSection,
                          pathname,
                          "block px-4",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
