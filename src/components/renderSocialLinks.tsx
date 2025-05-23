import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaInstagram,
  } from "react-icons/fa";
  import { siteConfig } from "@/config/site";

const iconMap: { [key: string]: React.ElementType } = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

export const renderSocialLinks = (socialLinks: typeof siteConfig.social) => {
  return socialLinks.map((social) => { // Removed index from map
    const Icon = social.icon && iconMap[social.icon.toLowerCase()];

    return (
      <a
        key={social.url} // Changed key from index to social.url
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
        aria-label={social.name}
      >
        {Icon && <Icon className="w-6 h-6" />}
      </a>
    );
  });
};