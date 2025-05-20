import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { ContactProps } from '@/types/components';

const Contact = ({ className = '' }: ContactProps) => {
  return (
    <footer id="contact" className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">Contact Info</h3>
            <div className="space-y-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                <FaEnvelope className="w-5 h-5" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
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
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">Social Links</h3>
            <div className="flex space-x-4">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                  Experience
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">About</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {siteConfig.description}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact; 