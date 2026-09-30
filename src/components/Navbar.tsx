"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type {
  NavigationGroupItem,
  NavigationItem,
  NavigationLinkItem,
} from "@/types/site";

const isNavigationGroupItem = (
  item: NavigationItem,
): item is NavigationGroupItem => "children" in item;

/**
 * Tailwind's `md` breakpoint (`--breakpoint-md: 48rem`), which is where the
 * mobile panel becomes `md:hidden`. Kept in the same `rem` unit so it tracks
 * the root font size the way the stylesheet does.
 */
const DESKTOP_BREAKPOINT_QUERY = "(min-width: 48rem)";

const Navbar = (): ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * The mobile panel is `md:hidden`, but `showModal()` keeps it in the top
   * layer and leaves the rest of the document inert. Hiding it therefore does
   * not dismiss it: the close control is unreachable and the page cannot be
   * used until the viewport shrinks again. Close it when the desktop
   * breakpoint becomes active.
   */
  useEffect((): (() => void) => {
    // SSR guard: matchMedia not available on server
    if (typeof window.matchMedia !== "function") {
      return (): void => {
        // noop: no listener was registered
      };
    }

    const desktopQuery = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);

    const closeOnDesktop = (): void => {
      if (desktopQuery.matches) {
        mobileDialogRef.current?.close();
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return (): void => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const isActiveLink = (item: NavigationLinkItem): boolean =>
    pathname === item.href;

  /**
   * A section target is same-document navigation whenever we are already on the
   * home page. A bare fragment is unambiguous there: the browser replaces the
   * existing one. Routing it as `/#section` instead lets the client router
   * resolve it against a URL that already carries a fragment, which can
   * concatenate into `/<old>#<new>`.
   */
  const resolveHref = (href: string): string =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  const renderDesktopGroup = (item: NavigationGroupItem): ReactElement => (
    <NavigationMenuItem key={item.id}>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid min-w-56">
          {item.children.map((child) => (
            <li key={child.href}>
              <NavigationMenuLink
                render={<Link href={resolveHref(child.href)} />}
                closeOnClick
                className="w-full"
              >
                {child.shortLabel ?? child.label}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const renderDesktopItem = (item: NavigationItem): ReactElement => {
    if (isNavigationGroupItem(item)) {
      return renderDesktopGroup(item);
    }

    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink
          render={<Link href={resolveHref(item.href)} />}
          closeOnClick
          active={isActiveLink(item)}
          className={navigationMenuTriggerStyle()}
        >
          {item.shortLabel ?? item.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileItem = (item: NavigationItem): ReactElement => {
    const closeDialog = (): void => {
      mobileDialogRef.current?.close();
    };

    if (isNavigationGroupItem(item)) {
      return (
        <li key={item.id}>
          <p className="text-foreground px-4 text-sm font-semibold">
            {item.label}
          </p>
          <ul className="mt-2 space-y-2">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={resolveHref(child.href)}
                  onClick={closeDialog}
                  className="text-muted-foreground hover:text-primary block px-4"
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
          href={resolveHref(item.href)}
          onClick={closeDialog}
          className="text-muted-foreground hover:text-primary block px-4"
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <header
      className={
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300 " +
        (isScrolled || pathname !== "/"
          ? "bg-background/90 backdrop-blur-sm"
          : "bg-transparent")
      }
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-foreground hover:text-primary text-xl font-bold"
        >
          {portfolio.basic.name}
        </Link>

        <NavigationMenu
          aria-label="Primary"
          className="hidden md:flex"
          delay={50}
          closeDelay={150}
        >
          <NavigationMenuList>
            {siteConfig.navigation.map(renderDesktopItem)}
          </NavigationMenuList>
        </NavigationMenu>

        <button
          type="button"
          className="text-muted-foreground hover:bg-muted hover:text-primary rounded-md p-2 md:hidden"
          aria-label="Open main menu"
          onClick={(): void => {
            mobileDialogRef.current?.showModal();
          }}
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/*
        Native <dialog> supplies the top-layer placement, Escape handling, focus
        trap, scroll lock, and focus restoration that the previous hand-rolled
        mobile menu implemented with document-level listeners.
      */}
      <dialog
        ref={mobileDialogRef}
        aria-label="Mobile navigation"
        className="bg-card text-card-foreground m-0 h-full max-h-full w-full max-w-sm border-0 p-0 text-left backdrop:bg-black/60 md:hidden"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">{portfolio.basic.name}</span>
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted rounded-md p-2"
            aria-label="Close main menu"
            onClick={(): void => {
              mobileDialogRef.current?.close();
            }}
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        <ul className="space-y-4 overflow-y-auto py-4">
          {siteConfig.navigation.map(renderMobileItem)}
        </ul>
      </dialog>
    </header>
  );
};

export default Navbar;
