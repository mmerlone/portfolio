# Marcio Merlone Portfolio

![Build](https://img.shields.io/github/actions/workflow/status/mmerlone/portfolio/ci.yml?branch=main)
![License](https://img.shields.io/github/license/mmerlone/portfolio)
![Vercel](https://img.shields.io/badge/deployed%20on-vercel-000?logo=vercel)

This is a Next.js portfolio project showcasing my experience as a Remote Software Engineer. It highlights my skills, professional experience, and projects, while featuring the tools and technologies that contribute to a superior developer experience.

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
  - [Weather Widget](#weather-widget)
  - [Quote Widget](#quote-widget)
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
- A **Skills** breakdown organized by category, displaying proficiency via icons and descriptions.
- A timeline of **Professional Experience** demonstrating leadership and project contributions.
- A **Projects** section highlighting selected works with images, detailed descriptions, and the technologies used.
- A **Contributions** section showcasing selected contributions on private projects.

---

## Site Configuration

### Site Config File

Update the site-wide configuration in `/src/config/site.ts` with your details:

- **Basic Info:** Site name, title, headline, and description.
- **Contact:** Email, phone, and location.
- **Social Links:** URLs and icons for social profiles.
- **Navigation & Footer:** Menu items and copyright.
- **Widgets:** Weather, GitHub, and Quotes widgets can now be enabled or disabled by setting their config to `null` or omitting them.

### Site Data Files

Content for various sections is maintained in `/src/data/`:

- **About:** `/src/data/about.ts`
- **Credits:** `/src/data/credits.ts`
- **Skills:** `/src/data/skills.ts`
- **Experience:** `/src/data/experience.ts`
- **Projects:** `/src/data/projects.ts`
- **Contributions:** `/src/data/contributions.ts`

Ensure these files reflect your updated portfolio content.

---

## Features & Environment Variables

### Managing Environment Variables

Sensitive information—such as API keys for analytics and weather—is stored in the `.env` file at the project root.  
A sample of these keys is provided via `.env.sample`.

To set up:

```bash
cp .env.sample .env
```

Then edit the `.env` file and insert your production or development values.

---

### Analytics & Cookie Consent

This project includes a Terms of Service (TOS) component with cookie handling and analytics integration.

- **Cookie Consent:**  
  The consent banner appears only if the user has not previously accepted the terms. When the user clicks **Accept**, a cookie (default: `mmerlone-analytics-consent`) is set for one year, preventing the banner from reappearing.
- **Analytics:**  
  Analytics will only be loaded after the user accepts the cookie consent notice (GDPR compliant).
  - **Google Analytics:** Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXX"` in your `.env` to enable.
  - **Google Tag Manager:** Set `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID="GTM-XXXXXX"` in your `.env` to enable.

If these variables are not set, the respective features will be disabled automatically.

---

### Weather Widget

The weather widget is **optional** and will only be displayed if configured.

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add it to your environment variables:
   ```bash
   WEATHER_API_KEY="your-api-key"
   ```
- **Security:**  
  The weather API key is never exposed to the client. The widget is only rendered if the key is present on the server.

If the `WEATHER_API_KEY` is not set, the weather widget will not be rendered.

---

### Quote Widget

The quote widget is now **optional** and can be enabled or disabled in the site config.

- To disable, set `quotes: null` or remove the `quotes` property from your site config.
- If enabled, quotes are fetched from [ZenQuotes API](https://zenquotes.io/) and can be cached locally for faster access.

---

### GitHub Repo Widget

The GitHub repository statistics widget is also **optional**.

- To enable, set the `github.repoUrl` property in your site config.
- To disable, set `github: null` or remove the `github` property.

---

## Credits

This project leverages the following tools, services, and resources:

- **OpenWeatherMap:** Weather data provided by [OpenWeatherMap](https://openweathermap.org/).
- **Heroicons:** SVG icons by the makers of [Tailwind CSS](https://heroicons.com/).
- **Tailwind CSS:** Utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/)).
- **FontAwesome:** Iconic font and CSS toolkit ([fontawesome.com](https://fontawesome.com/)).
- **ZenQuotes API:** Inspirational quotes ([zenquotes.io](https://zenquotes.io/)).
- **Vercel:** Hosting and performance ([vercel.com](https://vercel.com/)).
- **React Slick:** Carousel component ([react-slick.neostack.com](https://react-slick.neostack.com/)).
- **Google Analytics:** Web analytics ([analytics.google.com](https://analytics.google.com/)).
- **Google Tag Manager:** Tag management ([tagmanager.google.com](https://tagmanager.google.com/)).
- **Vercel Speed Insights:** Performance insights ([vercel.com/speed](https://vercel.com/speed)).
- **improvmx.com:** Email forwarding ([improvmx.com](https://improvmx.com/)).

*...and many more. Kudos to everyone involved!*

---

## Learn More

For further documentation on Next.js and additional resources, please visit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)

---

## License

This project is licensed under the terms specified in the repository.

---

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear messages.
4. Open a pull request describing your changes.

---

## Contact

Feel free to reach out!

- **Email:** [mmerlone@gmail.com](mailto:mmerlone@gmail.com)
- **Phone:** +55 41 99536-8488
- **Location:** Remote
- **LinkedIn:** [linkedin.com/in/mmerlone](https://linkedin.com/in/mmerlone)
- **GitHub:** [github.com/mmerlone](https://github.com/mmerlone)
- **Instagram:** [instagram.com/mmerlone](https://instagram.com/mmerlone)

---

*Suggestions for further improvement:*
- Add a "Screenshots" section with images of your portfolio.
