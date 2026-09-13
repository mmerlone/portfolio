import type { Icon } from "@phosphor-icons/react";
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react/ssr";
import type { PortfolioSocialLink } from "@/types/portfolio";

const iconMap: Record<string, Icon> = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
  twitter: TwitterLogoIcon,
  instagram: InstagramLogoIcon,
  facebook: FacebookLogoIcon,
};

/**
 * Resolves the icon for a social platform name, falling back to a globe icon
 * when no icon mapping is found.
 */
export const getSocialIcon = (name: PortfolioSocialLink["name"]): Icon =>
  iconMap[name.toLowerCase()] ?? GlobeIcon;
