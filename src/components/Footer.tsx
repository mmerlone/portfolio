'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaGithub':
        return <FaGithub className="w-5 h-5" />;
      case 'FaLinkedin':
        return <FaLinkedin className="w-5 h-5" />;
      case 'FaTwitter':
        return <FaTwitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>
            &copy; {currentYear} {siteConfig.name}. {siteConfig.footer.copyright.text}
          </p>
          <div className="flex space-x-4">
            {siteConfig.footer.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 flex items-center space-x-1"
                title={item.name}
              >
                {getIcon(item.icon)}
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 