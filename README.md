Next.js SEO Blog Platform
A high-performance, SEO-optimized blog platform built with Next.js, MDX, and Tailwind CSS. This project demonstrates modern web development patterns including Static Site Generation (SSG), containerization, and automated asset generation for search engine visibility.

🏗 Architecture & Design Decisions
Framework: Built using Next.js to leverage its superior Static Site Generation (SSG) capabilities, ensuring fast load times and reliable SEO.

Content Management: Uses local MDX files stored in the /posts directory. This allows for a component-driven content approach where React components can be used directly inside articles.

Containerization: Fully containerized with Docker and Docker Compose to ensure consistent development and production environments across different machines.

SEO & Metadata: Integrated next-seo for dynamic Open Graph and Twitter card meta tags. Automated scripts generate sitemap.xml and rss.xml during the build process.

Styling: Utilizes Tailwind CSS for a responsive design with a built-in light/dark theme toggle system.

🚀 Setup & Installation
Prerequisites
Docker Desktop installed and running.

Node.js (for local development, though Docker is recommended).

Deployment with Docker
To build and run the application in a production-ready container:

Clone the repository.

Environment Setup: Create a .env file based on .env.example.

Bash
cp .env.example .env
Start the Container:

Bash
docker-compose up --build
Access the App: Open http://localhost:3000 in your browser.

🛠 Features & Technical Contract
This project adheres to the following mandatory technical requirements:

Docker Health Check: The docker-compose.yml includes a health check using curl to monitor the server status.

Static Generation: The Homepage (/), Blog List (/blog), and Post Pages (/posts/[slug]) are all pre-rendered at build time.

Optimized Images: All images in MDX are rendered via next/image with the data-testid="optimized-image" attribute.

Syntax Highlighting: Integrated code blocks with syntax highlighting classes and data-testid="code-block" on <pre> tags.

Pagination: The blog listing handles pagination (10 posts per page) with dedicated test IDs for navigation.

Theme Toggle: A toggle button switches between light and dark modes by modifying the root HTML class.

📁 Project Structure
/posts: Source MDX files for blog content.

/components: Reusable UI components including MDX mappers.

/lib: Utility functions for fetching and parsing post data.

/pages: Dynamic and static routes for the application.

/public: Static assets including generated sitemap.xml and rss.xml.

/scripts: Post-build scripts for asset generation.