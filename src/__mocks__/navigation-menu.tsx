import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Lightweight stand-in for the shadcn navigation menu.
 *
 * The real component is built on Base UI's positioning machinery, which costs
 * roughly 25 seconds per render under jsdom — enough to make any suite that
 * renders the navbar unusable. These tests are about the navbar's own behaviour:
 * that it is data-driven, that it renders the right groups and links in the
 * right order, and that it keeps link semantics. Base UI's internals are a
 * dependency concern and are not re-tested here.
 *
 * The mock deliberately preserves the observable contract the navbar relies on:
 * the same element types, so roles stay `navigation` / `list` / `link` /
 * `button`, and the `render` prop still decides the underlying element.
 */

type RenderProp = ReactElement<Record<string, unknown>>;

const passthrough = (
  Tag: "nav" | "ul" | "li" | "div",
  displayName: string,
): ((
  props: {
    className?: string;
    children?: ReactNode;
  } & Record<string, unknown>,
) => ReactElement) => {
  function Component({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: ReactNode;
  } & Record<string, unknown>): ReactElement {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }
  Component.displayName = displayName;
  return Component;
};

const NavigationMenu = passthrough("nav", "NavigationMenu");
const NavigationMenuList = passthrough("ul", "NavigationMenuList");
const NavigationMenuItem = passthrough("li", "NavigationMenuItem");
const NavigationMenuContent = passthrough("div", "NavigationMenuContent");

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>): ReactElement {
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
}

function NavigationMenuLink({
  render,
  className,
  children,
  ...props
}: {
  render?: RenderProp;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>): ReactElement {
  // `render` carries the real element (usually a next/link), so cloning it
  // keeps the href and the anchor semantics the tests assert on.
  if (isValidElement(render)) {
    return cloneElement(render, { ...props, className }, children);
  }
  return (
    <a className={className} {...props}>
      {children}
    </a>
  );
}

const navigationMenuTriggerStyle = (): string => "";

function navigationMenuMockFactory(): {
  NavigationMenu: typeof NavigationMenu;
  NavigationMenuList: typeof NavigationMenuList;
  NavigationMenuItem: typeof NavigationMenuItem;
  NavigationMenuContent: typeof NavigationMenuContent;
  NavigationMenuTrigger: typeof NavigationMenuTrigger;
  NavigationMenuLink: typeof NavigationMenuLink;
  navigationMenuTriggerStyle: typeof navigationMenuTriggerStyle;
} {
  return {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
  };
}

jest.mock("@/components/ui/navigation-menu", navigationMenuMockFactory);
