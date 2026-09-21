"use client";

import { useEffect, useState, type MouseEvent, type ReactElement } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
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

const getNavigationLinks = (
  navigation: readonly NavigationItem[],
): NavigationLinkItem[] =>
  navigation.flatMap((item) =>
    isNavigationGroupItem(item) ? [...item.children] : [item],
  );

const getHashFromHref = (href: string): string | null => {
  if (!href.startsWith("/#")) return null;
  return href.substring(2);
};

const isHomeNavigationItem = (item: NavigationLinkItem): boolean =>
  item.behavior === "home";

const isNavItemActive = (
  item: NavigationLinkItem,
  activeSection: string,
  pathname: string,
): boolean => {
  if (isHomeNavigationItem(item)) {
    return pathname === "/" && activeSection === "";
  }

  const hash = getHashFromHref(item.href);
  if (hash !== null) {
    return pathname === "/" && activeSection === hash;
  }

  return pathname === item.href;
};

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

const getGroupTriggerClassName = (isActive: boolean): string =>
  isActive
    ? "nav-link nav-link--active flex items-center gap-1 text-orange-600 transition-colors duration-500 ease-in-out dark:text-orange-400"
    : "nav-link flex items-center gap-1 text-gray-600 transition-colors duration-500 ease-in-out hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400";

const shouldHandleClientNavigation = (
  event: MouseEvent<HTMLAnchorElement>,
): boolean =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

const Navbar = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

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

    const elements: HTMLElement[] = getNavigationLinks(siteConfig.navigation)
      .map((item) => getHashFromHref(item.href))
      .filter((hash): hash is string => hash !== null)
      .map((hash) => document.getElementById(hash))
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

  useEffect(() => {
    if (!isOpen && openGroupId === null) return;

    const handlePointerDown = (event: globalThis.PointerEvent): void => {
      if (!(event.target instanceof Element)) return;

      if (isOpen && !event.target.closest("[data-mobile-navigation]")) {
        setIsOpen(false);
      }

      if (openGroupId !== null && !event.target.closest("[data-nav-group]")) {
        setOpenGroupId(null);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (openGroupId !== null) {
        document
          .getElementById(`primary-navigation-${openGroupId}-trigger`)
          ?.focus();
      } else if (isOpen) {
        document.getElementById("mobile-navigation-trigger")?.focus();
      }
      setIsOpen(false);
      setOpenGroupId(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return (): void => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, openGroupId]);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: NavigationLinkItem,
  ): void => {
    if (!isHomeNavigationItem(item)) return;
    if (!shouldHandleClientNavigation(event)) return;

    event.preventDefault();
    setActiveSection("");
    router.replace("/", { scroll: true });
  };

  const closeNavigationSurfaces = (): void => {
    setIsOpen(false);
    setOpenGroupId(null);
  };

  const navClasses =
    isScrolled || isOpen ? "bg-gray-200 dark:bg-gray-700" : "transparent";
  const showLogo = isScrolled || pathname !== "/";

  // Navbar persists across route changes; stale in-page-section state must not leak off "/".
  const effectiveActiveSection = pathname === "/" ? activeSection : "";

  const renderNavLink = (
    item: NavigationLinkItem,
    className: string,
    label: string,
    onAfterClick?: () => void,
  ): ReactElement => (
    <Link
      href={item.href}
      className={className}
      onClick={(event): void => {
        handleLinkClick(event, item);
        onAfterClick?.();
      }}
    >
      {label}
    </Link>
  );

  const renderDesktopItem = (item: NavigationItem): ReactElement => {
    if (isNavigationLinkItem(item)) {
      return (
        <li key={item.href}>
          {renderNavLink(
            item,
            getNavLinkClassName(item, effectiveActiveSection, pathname),
            item.shortLabel ?? item.label,
          )}
        </li>
      );
    }

    const isOpenGroup = openGroupId === item.id;
    const isGroupActive = item.children.some((child) =>
      isNavItemActive(child, effectiveActiveSection, pathname),
    );
    const menuId = `primary-navigation-${item.id}`;

    return (
      <li key={item.id} className="relative" data-nav-group={item.id}>
        <button
          id={`${menuId}-trigger`}
          type="button"
          className={getGroupTriggerClassName(isGroupActive)}
          aria-haspopup="true"
          aria-expanded={isOpenGroup}
          aria-controls={menuId}
          onClick={() => {
            setOpenGroupId((currentGroupId) =>
              currentGroupId === item.id ? null : item.id,
            );
          }}
        >
          {item.label}
          <CaretDownIcon
            size={14}
            weight="bold"
            className={
              isOpenGroup
                ? "rotate-180 transition-transform duration-200"
                : "transition-transform duration-200"
            }
          />
        </button>
        <div
          id={menuId}
          hidden={!isOpenGroup}
          className="absolute top-full left-0 z-40 mt-2 min-w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <ul className="space-y-1">
            {item.children.map((child) => (
              <li key={child.href}>
                {renderNavLink(
                  child,
                  getNavLinkClassName(
                    child,
                    effectiveActiveSection,
                    pathname,
                    "block rounded-md px-2 py-1",
                  ),
                  child.shortLabel ?? child.label,
                  () => {
                    setOpenGroupId(null);
                  },
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  };

  const renderMobileItem = (item: NavigationItem): ReactElement => {
    if (isNavigationGroupItem(item)) {
      return (
        <li key={item.id}>
          <p className="px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {item.label}
          </p>
          <ul className="mt-2 space-y-2">
            {item.children.map((child) => (
              <li key={child.href}>
                {renderNavLink(
                  child,
                  getNavLinkClassName(
                    child,
                    effectiveActiveSection,
                    pathname,
                    "block px-4",
                  ),
                  child.label,
                  closeNavigationSurfaces,
                )}
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.href}>
        {renderNavLink(
          item,
          getNavLinkClassName(
            item,
            effectiveActiveSection,
            pathname,
            "block px-4",
          ),
          item.label,
          closeNavigationSurfaces,
        )}
      </li>
    );
  };

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
              href="/"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-orange-600 dark:text-gray-100 dark:hover:text-orange-400"
              onClick={(event): void => {
                handleLinkClick(event, {
                  label: portfolio.basic.name,
                  href: "/",
                  behavior: "home",
                });
              }}
            >
              {portfolio.basic.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <ul className="hidden items-center space-x-4 md:flex">
            {siteConfig.navigation.map(renderDesktopItem)}
          </ul>

          {/* Mobile Menu Button */}
          <button
            id="mobile-navigation-trigger"
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-orange-600 focus:ring-2 focus:ring-orange-600 focus:outline-none focus:ring-inset md:hidden dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-orange-400 dark:focus:ring-orange-400"
            onClick={() => {
              setIsOpen((open) => !open);
            }}
            data-mobile-navigation
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
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            hidden={!isOpen}
            data-mobile-navigation
            className="fixed top-16 right-0 left-0 z-40 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-b-xl border border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-800"
          >
            <ul className="space-y-4 py-4">
              {siteConfig.navigation.map(renderMobileItem)}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
