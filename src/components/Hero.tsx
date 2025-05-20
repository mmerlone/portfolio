'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { HeroProps } from '@/types/components';

const Hero = ({ className = '' }: HeroProps) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background gradient overlay with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-white to-orange-50/90 dark:from-gray-900/90 dark:via-gray-900 dark:to-orange-900/90">
        <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl text-orange-600 dark:text-orange-400 mb-8">
              {siteConfig.title}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-indigo-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 group-hover:from-orange-500/40 group-hover:to-indigo-500/40 transition-all duration-500" />
              <div className="relative transform transition-all duration-500">
                <Image
                  src="/images/profile/profile.png"
                  alt={siteConfig.name}
                  width={500}
                  height={500}
                  className="rounded-full shadow-2xl group-hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 