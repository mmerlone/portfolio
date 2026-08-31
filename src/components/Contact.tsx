import { type ReactElement } from "react";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { renderSocialLinks } from "@/components/renderSocialLinks";
import { cn } from "@/lib/cn";

interface ContactProps {
  className?: string;
}

export default function Contact({
  className = "",
}: ContactProps): ReactElement {
  const { contact, social } = portfolio.basic;

  return (
    <section id="contact" className="relative">
      <div className={cn(className, "bg-surface-muted")}>
        <hr className="border-accent/10 border-3" />
        <div className="relative z-10 container mx-auto mt-12 px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Contact Info */}
            <aside className="space-y-4">
              <h3 className="text-accent text-xl font-bold">Contact Info</h3>
              <div className="space-y-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted-foreground hover:text-accent flex items-center space-x-2"
                >
                  <EnvelopeSimpleIcon size={20} weight="bold" />
                  <span>{contact.email}</span>
                </a>
                <p className="text-muted-foreground flex items-center space-x-2">
                  <MapPinIcon size={20} weight="bold" />
                  <span>{portfolio.basic.location}</span>
                </p>
              </div>
            </aside>

            {/* Social Links */}
            <aside className="space-y-4">
              <h3 className="text-accent text-xl font-bold">Social Links</h3>
              <div className="flex space-x-4">
                {social && renderSocialLinks(social)}
              </div>
            </aside>

            {/* Quick Links */}
            <aside className="space-y-4">
              <h3 className="text-accent text-xl font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* About */}
            <aside className="space-y-4">
              <h3 className="text-accent text-xl font-bold">About</h3>
              <p className="text-muted-foreground mb-3">
                {portfolio.basic.summary}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
