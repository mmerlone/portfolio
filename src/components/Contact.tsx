import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { ContactProps } from "@/types/components";
import { renderSocialLinks } from "@/components/renderSocialLinks";

const Contact = ({ className = "" }: ContactProps) => {
  return (
    <section
      id="contact"
      className={`contact-background relative py-20 ${className}`}
    >
      <hr className="border-3 border-orange-600/10 dark:border-orange-400/10" />
      <div className="relative z-10 container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Contact Info
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
              >
                <FaEnvelope className="h-5 w-5" />
                <span>{siteConfig.contact.email}</span>
              </a>
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
                >
                  <FaPhone className="h-5 w-5" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              )}
              <p className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="h-5 w-5" />
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
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
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
