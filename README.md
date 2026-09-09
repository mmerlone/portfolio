# Marcio Merlone Portfolio

![Build](https://img.shields.io/github/actions/workflow/status/mmerlone/portfolio/ci.yml?branch=main)
![License](https://img.shields.io/github/license/mmerlone/portfolio)
![Vercel](https://img.shields.io/badge/deployed%20on-vercel-000?logo=vercel)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

This is a Next.js portfolio project showcasing a small part of my experience in Technology. It highlights my skills, professional experience, and projects, while featuring the tools and technologies that contribute to a superior developer experience.

[Visit the live site](https://mmerlone.dev.br)

---

## Table of Contents

- [Getting Started](#getting-started)
- [About the Project](#about-the-project)
- [Site Configuration](#site-configuration)
  - [Site Config File](#site-config-file)
  - [Site Data Files](#site-data-files)
- [Features & Environment Variables](#features--environment-variables)
  - [Managing Environment Variables](#managing-environment-variables)
  - [Analytics & Cookie Consent](#analytics--cookie-consent)
  - [GitHub Repo Widget](#github-repo-widget)
- [Credits](#credits)
- [Learn More](#learn-more)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser. Any changes you make will auto-update the page.

You can start editing the page by modifying the `app/page.tsx` file.

---

## About the Project

This portfolio was built with [Next.js](https://nextjs.org/) and showcases:

- A detailed **About** section describing my background and philosophy.
- A **Technical Skills** breakdown organized by category.
- A timeline of **Professional Experience** and **Education**.
- A **Challenges** section highlighting notable problems solved.
- A **Projects** section highlighting selected works with images, detailed descriptions, and the technologies used.
- A **Credentials** section listing certifications.
- A **GitHub** widget showing live repository statistics.

---

## Site Configuration

### Site Config File

Update the site-wide configuration in `/src/config/site.ts` with your details:

- **Basic Info:** Site name, title, headline, and description.
- **Contact:** Email, phone, and location.
- **Social Links:** URLs and icons for social profiles.
- **Navigation & Footer:** Menu items and copyright.
- **Widgets:** The GitHub repo widget can be enabled or disabled by setting its config to `null` or omitting it.
- **Effects:** Configure visual effects and animations.

### Site Data Files

Content for various sections is maintained in `/src/data/`:

- **Portfolio (about, skills, experience, education, credentials, expertise):** `/src/data/portfolio.ts`
- **Credits:** `/src/data/credits.ts`
- **Experiences detail:** `/src/data/experiences.ts`
- **Education detail:** `/src/data/education.ts`
- **Challenges:** `/src/data/challenges.ts`
- **Projects:** `/src/data/projects.ts`

Ensure these files reflect your updated portfolio content.

---

## Features & Environment Variables

### Managing Environment Variables

Sensitive information—such as API keys for analytics—is stored in the `.env` file at the project root.  
A sample of these keys is provided via `.env.example`.

To set up:

```bash
cp .env.example .env
```

Then edit the `.env` file and insert your production or development values.

---

### Analytics & Cookie Consent

This project includes a Terms of Service (TOS) component with cookie handling and analytics integration.

- **Cookie Consent:**  
  The consent banner appears only if the user has not previously accepted the terms. When the user clicks **Accept**, a cookie (default: `mmerlone-dev-br-analytics-consent`) is set for one year, preventing the banner from reappearing.
- **Analytics:**  
  Analytics will only be loaded after the user accepts the cookie consent notice (GDPR compliant).
  - **Google Analytics:** Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXX"` in your `.env` to enable.
  - **Google Tag Manager:** Set `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID="GTM-XXXXXX"` in your `.env` to enable.
  - **Ahrefs Analytics:** Set `NEXT_PUBLIC_AHREFS_ANALYTICS_KEY="..."` to enable. This site identifier is public by design and is not a secret.
  - When both are configured, Google Tag Manager takes precedence and should own the Google Analytics tag to prevent duplicate page views.

If these variables are not set, the respective features will be disabled automatically.

### Search Engine Verification

Search-console verification metadata is optional and omitted when unset:

- **Google Search Console:** Set `GOOGLE_SITE_VERIFICATION` to the token from the `google-site-verification` meta tag.
- **Bing Webmaster Tools:** Set `BING_SITE_VERIFICATION` to the token from the `msvalidate.01` meta tag.

---

### GitHub Repo Widget

The GitHub repository statistics widget is also **optional**.

- To enable, set the `github.repoUrl` property in your site config.
- To disable, set `github: null` or remove the `github` property.

---

## Credits

This project leverages the following tools, services, and resources:

- **Vercel:** Hosting and performance ([vercel.com](https://vercel.com/)).
- **Vercel Speed Insights:** Performance insights ([vercel.com/docs/speed-insights](https://vercel.com/docs/speed-insights)).
- **Google Analytics:** Web analytics ([analytics.google.com](https://analytics.google.com/)).
- **Google Tag Manager:** Tag management, takes precedence over Google Analytics when both are configured ([tagmanager.google.com](https://tagmanager.google.com/)).
- **Ahrefs Analytics:** Cookieless web analytics ([ahrefs.com/web-analytics](https://ahrefs.com/web-analytics)).
- **Cloudflare:** CDN, security, and performance optimization ([cloudflare.com](https://cloudflare.com/)).
- **improvmx.com:** Email forwarding ([improvmx.com](https://improvmx.com/)).
- **Next.js:** The React framework for production ([nextjs.org](https://nextjs.org/)).
- **React:** The JavaScript library for building user interfaces ([react.dev](https://react.dev/)).
- **Open Props:** CSS token library for design system primitives ([open-props.style](https://open-props.style/)).
- **Phosphor Icons:** Icon family used throughout this interface ([phosphoricons.com](https://phosphoricons.com/)).
- **Tailwind CSS:** Utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/)).

_Kudos to everyone involved!_

---

## Learn More

For further documentation on Next.js and additional resources, please visit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)

---

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear messages.
4. Open a pull request describing your changes.

---

## Technologies

This project utilizes the following technologies:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Sass
- ESLint
- Prettier
- Jest
- Vercel

## Contact

Feel free to reach out!

- **Email:** [mmerlone@gmail.com](mailto:mmerlone@gmail.com)
- **Phone:** +55 41 99536-8488
- **Location:** Remote
- **LinkedIn:** [linkedin.com/in/mmerlone](https://linkedin.com/in/mmerlone)
- **GitHub:** [github.com/mmerlone](https://github.com/mmerlone)
- **Instagram:** [instagram.com/mmerlone](https://instagram.com/mmerlone)

---

_Suggestions for further improvement:_

- Add a "Screenshots" section with images of your portfolio.
- Add more interactive demos and examples.
- Implement more advanced visual effects.
