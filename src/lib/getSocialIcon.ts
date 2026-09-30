import {
  getSocialIcon as getSocialIconComponent,
  type SocialIconProps,
} from "@/components/ui/SocialIcons";
import type { PortfolioSocialLink } from "@/types/portfolio";

type SocialIconComponent = React.FC<SocialIconProps>;

/**
 * Resolves the icon for a social platform name, falling back to a website icon
 * when no icon mapping is found.
 */
export const getSocialIcon = (
  name: PortfolioSocialLink["name"],
): SocialIconComponent => getSocialIconComponent(name);
