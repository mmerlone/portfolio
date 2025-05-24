# Marcio Merlone Portfolio

This is a Next.js portfolio project showcasing my experience as a Remote Software Engineer with expertise in Full-Stack Development, Cloud Technologies, and Problem Solving. The portfolio highlights my skills, professional experience, and projects while featuring tools and technologies that contribute to the overall developer experience.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## About the Project

This portfolio was built using Next.js and showcases:
- A detailed **About** section describing my background and philosophy.
- A **Skills** breakdown organized by category that displays my proficiency via icons and descriptions.
- A timeline of **Professional Experience** where I've led and contributed to innovative projects.
- A **Projects** section featuring a selection of projects, each with images, descriptions, and technologies used.
- **Credits** that respect and acknowledge the various open-source tools and APIs powering this portfolio.

## Credits

This project makes use of the following tools, services, and resources:

- **OpenWeatherMap:** Weather data provided by OpenWeatherMap.  
  URL: [https://openweathermap.org/](https://openweathermap.org/)

- **Heroicons:** Beautiful hand-crafted SVG icons created by the makers of Tailwind CSS.  
  URL: [https://heroicons.com/](https://heroicons.com/)

- **Tailwind CSS:** A utility-first CSS framework for creating custom designs.  
  URL: [https://tailwindcss.com/](https://tailwindcss.com/)

- **FontAwesome:** The iconic font and CSS toolkit.  
  URL: [https://fontawesome.com/](https://fontawesome.com/)

- **ZenQuotes API:** Inspirational quotes provided by ZenQuotes API.  
  URL: [https://zenquotes.io/](https://zenquotes.io/)

- **Vercel:** The platform for frontend developers that powers this deployment.  
  URL: [https://vercel.com/](https://vercel.com/)

- **React Slick:** The carousel component used for the Credits and other sliders.  
  URL: [https://react-slick.neostack.com/](https://react-slick.neostack.com/)

- **Google Analytics:** Tracks website usage and performance.  
  URL: [https://analytics.google.com/](https://analytics.google.com/)

- **Google Tag Manager:** Manages tags for analytics and remarketing.  
  URL: [https://tagmanager.google.com/](https://tagmanager.google.com/)

- **Vercel Speed Insights:** Provides performance insights for the website.  
  URL: [https://vercel.com/speed](https://vercel.com/speed)

  ... and many more. Thanks for anyone involved on those projects.

## Learn More

To learn more about Next.js, please refer to the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying) – learn how to deploy your Next.js application on Vercel.

## License

This project is licensed under the terms specified in the repository.

## Site Configuration and Environment Variables

This project relies on a set of configuration values and environment variables to function properly. Since your site configuration is public and contains non-sensitive data, you can update it directly in the file. All sensitive information (for example, the `GOOGLE_TAG_MANAGER_ID`) is stored in the `.env` file, which is ignored by git.

### 1. Site Config

The site-wide configuration is located in `/src/config/site.ts`. Update this file with your site-specific details such as:
- Site name, title, headline, and description
- Contact information and social links
- Navigation and footer details

### 2. Environment Variables

The project depends on certain environment variables which are defined in a `.env` file at the root of the project. A sample file is provided as `.env.sample`.

To set up your environment:
1. Copy the sample file to create a new `.env` file:
    ```bash
    cp .env.sample .env
    ```
2. Update the `.env` file with the required values for your development or production environment.

### 3. Site Data

Various content sections are managed via data files located in `/src/data/`. These include:
- **About:** `/src/data/about.ts`
- **Credits:** `/src/data/credits.ts`
- **Skills:** `/src/data/skills.ts`
- **Experience:** `/src/data/experience.ts`
- **Projects:** `/src/data/projects.ts`

Ensure that the data in these files is updated to reflect your portfolio content.

Once configured, you can run the development server and see your changes reflected in the portfolio.

## Environment Variables Details

The project relies on certain environment variables to function properly. These variables are stored in a `.env` file at the root of the project (which is git‑ignored to keep sensitive information secure). Below are the keys currently in use, along with details on where they come from and how to obtain their values:

### GOOGLE_TAG_MANAGER_ID

- **Purpose:**  
  This key is used to integrate Google Tag Manager into your portfolio. It enables you to manage and deploy marketing tags without having to modify code directly.

- **Where It Comes From:**  
  The value for `GOOGLE_TAG_MANAGER_ID` is provided by Google Tag Manager when you create a new container.

- **How to Obtain It:**  
  1. Visit [Google Tag Manager](https://tagmanager.google.com/) and sign in with your Google account.  
  2. Create a new account and container for your website.  
  3. Once the container is created, you will see the container ID (it usually starts with "GTM-").  
  4. Copy this ID and paste it into your `.env` file as the value for `GOOGLE_TAG_MANAGER_ID`.

### Additional Keys (if applicable)

If you integrate further external services in the future (such as API keys for weather data or analytics tools), please follow a similar approach:
- **API_KEY_NAME:**  
  **Purpose:** Brief description of how this key is used.  
  **Where It Comes From:** Brief instructions on which service provides the key (e.g., "Visit [ServiceName](link) to sign up and obtain your API key.").  
  **How to Obtain It:** Outline the process similar to the steps for Google Tag Manager.

### How to Set Up Your Environment

1. **Create the .env File:**  
   Copy the provided sample file to create a new .env file:
   ```bash
   cp .env.sample .env
   ```

2. **Update the .env File:**  
   Open the newly created `.env` file in your favorite editor and update the keys with your own values (for example, paste your actual `GOOGLE_TAG_MANAGER_ID`).

3. **Run the Project:**  
   Once the .env file is configured, you can start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

With your environment variables properly set, your project can securely utilize the necessary external services.
