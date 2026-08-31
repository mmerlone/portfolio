import type { ReactElement, ComponentType } from "react";
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react/ssr";
import type { PortfolioSocialLink } from "@/types/portfolio";

type IconProps = {
  size?: number | string;
  className?: string;
};

const iconMap: Record<string, ComponentType<IconProps>> = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
  twitter: TwitterLogoIcon,
  instagram: InstagramLogoIcon,
  facebook: FacebookLogoIcon,
};

/**
 * Renders a list of social link icons from portfolio social data.
 * Falls back to a globe icon when no icon mapping is found for a name.
 */
export const renderSocialLinks = (
  socialLinks: readonly PortfolioSocialLink[],
): ReactElement[] => {
  return socialLinks.map((social) => {
    const Icon = iconMap[social.name.toLowerCase()] ?? GlobeIcon;

    return (
      <a
        key={social.url}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-accent"
        aria-label={social.name}
      >
        <Icon className="h-6 w-6" />
      </a>
    );
  });
};
