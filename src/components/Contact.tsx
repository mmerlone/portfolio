import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { ContactProps } from "@/types/components";
import { renderSocialLinks } from "@/components/renderSocialLinks";

const Contact = ({ className = "" }: ContactProps) => {
  return (
    <section
      id="contact"
      className={`py-20 relative contact-background ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Contact Info
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              >
                <FaPhone className="w-5 h-5" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <p className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="w-5 h-5" />
                <span>{siteConfig.contact.location}</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Social Links
            </h3>
            <div className="flex space-x-4">
              {renderSocialLinks(siteConfig.social)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              About
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
