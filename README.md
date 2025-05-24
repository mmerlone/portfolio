# Marcio Merlone Portfolio

This is a Next.js portfolio project showcasing my experience as a Remote Software Engineer. It highlights my skills, professional experience, and projects while featuring the tools and technologies that contribute to a superior developer experience.

[Visit the live site](https://mmerlone.dev.br)

---

## Table of Contents

- [Getting Started](#getting-started)
- [About the Project](#about-the-project)
- [Credits](#credits)
- [Site Configuration and Environment Variables](#site-configuration-and-environment-variables)
  - [Site Config](#1-site-config)
  - [Environment Variables](#2-environment-variables)
  - [Site Data](#3-site-data)
  - [Environment Variables Details](#environment-variables-details)
- [Learn More](#learn-more)
- [License](#license)

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

This portfolio was built with Next.js and showcases:
- A detailed **About** section describing my background and philosophy.
- A **Skills** breakdown organized by category that displays my proficiency via icons and descriptions.
- A timeline of **Professional Experience** demonstrating leadership and project contributions.
- A **Projects** section highlighting selected works with images, detailed descriptions, and the technologies used.
- **Credits** acknowledging the open-source tools and APIs that power this portfolio.

---

## Credits

This project leverages the following tools, services, and resources:

- **OpenWeatherMap:** Weather data provided by OpenWeatherMap.  
  [Visit OpenWeatherMap](https://openweathermap.org/)
- **Heroicons:** Beautiful hand-crafted SVG icons created by the makers of Tailwind CSS.  
  [Visit Heroicons](https://heroicons.com/)
- **Tailwind CSS:** A utility-first CSS framework for custom designs.  
  [Visit Tailwind CSS](https://tailwindcss.com/)
- **FontAwesome:** The iconic font and CSS toolkit.  
  [Visit FontAwesome](https://fontawesome.com/)
- **ZenQuotes API:** Inspirational quotes provided by ZenQuotes API.  
  [Visit ZenQuotes](https://zenquotes.io/)
- **Vercel:** The platform for frontend developers that powers this deployment.  
  [Visit Vercel](https://vercel.com/)
- **React Slick:** Carousel component used for Credits and other sliders.  
  [Visit React Slick](https://react-slick.neostack.com/)
- **Google Analytics:** Tracks website usage and performance.  
  [Visit Google Analytics](https://analytics.google.com/)
- **Google Tag Manager:** Manages tags for analytics and remarketing.  
  [Visit Google Tag Manager](https://tagmanager.google.com/)
- **Vercel Speed Insights:** Provides performance insights for this website.  
  [Visit Vercel Speed Insights](https://vercel.com/speed)

*... and many more. Kudos to everyone involved!*

---

## Site Configuration and Environment Variables

This project relies on both public configuration and sensitive environment variables to operate correctly. The site config (non-sensitive data) is public, while sensitive keys are stored in the `.env` file (which is git‑ignored).

### 1. Site Config

Update the site-wide configuration in `/src/config/site.ts` with your details:

- **Basic Info:** Site name, title, headline, and description.
- **Contact:** Email, phone, and location.
- **Social Links:** URLs and icons for social profiles.
- **Navigation & Footer:** Menu items and footer copyright.

### 2. Environment Variables

Sensitive information—such as keys for Google Tag Manager—is stored in the `.env` file at the project root. A sample of these keys is provided via `.env.sample`.

To set up:
1. Copy the sample file to create a new `.env` file:
   ```bash
   cp .env.sample .env
   ```
2. Edit the `.env` file and insert your production or development values.

### 3. Site Data

Content for various sections is maintained in `/src/data/`:
- **About:** `/src/data/about.ts`
- **Credits:** `/src/data/credits.ts`
- **Skills:** `/src/data/skills.ts`
- **Experience:** `/src/data/experience.ts`
- **Projects:** `/src/data/projects.ts`

Ensure these files reflect your updated portfolio content.

### Environment Variables Details

All sensitive keys must be managed in the `.env` file. For example:

#### GOOGLE_TAG_MANAGER_ID
- **Purpose:** Integrates Google Tag Manager to deploy marketing tags without modifying code.
- **Origin:** Provided by Google Tag Manager when you create a new container.
- **How to Obtain:**
  1. Visit [Google Tag Manager](https://tagmanager.google.com/) and sign in.
  2. Create a new container for your site.
  3. Copy the provided container ID (usually starting with "GTM-") into your `.env` file as `GOOGLE_TAG_MANAGER_ID`.

For any additional external services (e.g., API keys for weather data or analytics tools), follow similar steps: check the provider’s documentation, sign up, and add your key to the `.env` file.

---

## Learn More

For further documentation on Next.js and additional resources, please visit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
  
---

## License

This project is licensed under the terms specified in the repository.

---

## Terms of Service and Cookie Consent

This project includes a Terms of Service (TOS) component with cookie handling. When a user first visits the site, a consent banner (displayed as a toast at the bottom of the screen) asks if they agree to the use of cookies for tracking interactions and enhancing their experience.

### How It Works

- **Display:**  
  The consent banner appears only if the user has not previously accepted the terms (i.e. if a specific cookie is not found).

- **User Interaction:**  
  When the user clicks the **Accept** button, a cookie named `portfolioTosAccepted` is set (with a validity of one year), which prevents the banner from reappearing on subsequent visits.

- **Implementation:**  
  The component is implemented in `/src/components/TermsOfServiceToast.tsx` and is included site-wide via the layout file (`/src/app/layout.tsx`).

No further action is needed by visitors—the banner will automatically disappear once the consent is given.
