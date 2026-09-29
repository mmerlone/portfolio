"use client";

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const Navbar = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  const closeNavigationSurfaces = (): void => {
    setIsOpen(false);
    setOpenGroupId(null);
  };

  const clearHash = (): void => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  const navClasses =
    isScrolled || pathname !== "/"
      ? "bg-gray-200 dark:bg-gray-700"
      : "transparent";

  const renderNavLink = (
    item: NavigationLinkItem,
    extraClassName: string,
    label: string,
    onClick?: () => void,
  ): ReactElement => {
    const isActive = pathname === item.href;
    const className = [
      "nav-link transition-colors duration-500 ease-in-out",
      extraClassName,
      isActive
        ? "nav-link--active text-orange-600 dark:text-orange-400"
        : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400",
    ]
      .filter((cls): cls is string => Boolean(cls))
      .join(" ");

    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {label}
      </Link>
    );
  };

  const renderDesktopItem = (item: NavigationItem): ReactElement => {
    if (isNavigationLinkItem(item)) {
      return (
        <li key={item.href}>
          {renderNavLink(
            item,
            "",
            item.shortLabel ?? item.label,
            item.behavior === "home" ? clearHash : undefined,
          )}
        </li>
      );
    }

    const isOpenGroup = openGroupId === item.id;
    const menuId = `primary-navigation-${item.id}`;

    return (
      <li key={item.id} className="relative" data-nav-group={item.id}>
        <button
          id={`${menuId}-trigger`}
          type="button"
          className={
            isOpenGroup
              ? "nav-link nav-link--active flex items-center gap-1 text-orange-600 transition-colors duration-500 ease-in-out dark:text-orange-400"
              : "nav-link flex items-center gap-1 text-gray-600 transition-colors duration-500 ease-in-out hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
          }
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
                  "block rounded-md px-2 py-1",
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
                  "block px-4",
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
          "block px-4",
          item.label,
            item.behavior === "home"
            ? (): void => {
                clearHash();
                closeNavigationSurfaces();
              }
            : closeNavigationSurfaces,
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
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition-colors hover:text-orange-600 dark:text-gray-100 dark:hover:text-orange-400"
            onClick={clearHash}
          >
            {portfolio.basic.name}
          </Link>

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
          {isOpen && (
            <div
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation"
              data-mobile-navigation
              className="fixed top-16 right-0 left-0 z-40 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-b-xl border border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-800"
            >
              <ul className="space-y-4 py-4">
                {siteConfig.navigation.map(renderMobileItem)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
