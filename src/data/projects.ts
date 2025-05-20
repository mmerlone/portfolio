export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveLink?: string;
  githubLink: string;
  isPrivate?: boolean;
}

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and secure checkout.",
    imageUrl: "/images/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubLink: "https://github.com/username/ecommerce",
    isPrivate: true
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    imageUrl: "/images/projects/taskmanager.jpg",
    technologies: ["React", "Firebase", "Material-UI"],
    githubLink: "https://github.com/username/taskmanager",
    isPrivate: true
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current conditions and forecasts using multiple weather APIs.",
    imageUrl: "/images/projects/weather.jpg",
    technologies: ["React", "OpenWeather API", "Chart.js"],
    liveLink: "https://weather-demo.com",
    githubLink: "https://github.com/username/weather-dashboard",
    isPrivate: false
  }
]; 