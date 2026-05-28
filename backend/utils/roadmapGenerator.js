/**
 * Intelligent Hardcoded Roadmap Database and Generator Engine.
 * Tailors career paths by role and experience level (Beginner, Intermediate, Advanced).
 */

const roadmapDatabase = {
  frontend: {
    Beginner: {
      phases: [
        {
          title: "Web Fundamentals & Semantics",
          duration: "3 Weeks",
          description: "Establish a rock-solid understanding of semantic document structure and standard styles.",
          topics: ["HTML5 Semantics", "CSS3 Basics", "Flexbox & Grid Layouts", "Responsive Web Design"],
          project: {
            title: "Responsive Personal Portfolio",
            description: "Design and build a multi-page portfolio website using clean HTML and CSS grid systems."
          }
        },
        {
          title: "JavaScript Foundations & DOM",
          duration: "4 Weeks",
          description: "Master procedural logic, array manipulations, and dynamic client-side interactions.",
          topics: ["JS Variables & Scope", "DOM Manipulation", "ES6+ Features", "Fetch API & JSON Async operations"],
          project: {
            title: "Interactive Dashboard & Weather App",
            description: "Create a web app that queries a public weather API and dynamically updates the DOM without reloading."
          }
        },
        {
          title: "Version Control & Tooling",
          duration: "1 Week",
          description: "Get familiar with modern developer environments, terminal commands, and versioning.",
          topics: ["Git & GitHub basics", "NPM & Package management", "ESLint & Prettier integrations"],
          project: {
            title: "Git-backed collaborative repository",
            description: "Publish your portfolio and dashboard code to GitHub, using branches and pull requests."
          }
        }
      ]
    },
    Intermediate: {
      phases: [
        {
          title: "Component-Driven Architecture",
          duration: "4 Weeks",
          description: "Transition to building declarative interfaces using component models, hooks, and clean state practices.",
          topics: ["React.js Core Concepts", "State & Props Management", "Custom Hooks & Lifecycle", "Tailwind CSS Integration"],
          project: {
            title: "Task Management Board",
            description: "Build a Trello clone with drag-and-drop mechanics, search filters, and persistent local storage state."
          }
        },
        {
          title: "Advanced Routing & Layout Patterns",
          duration: "3 Weeks",
          description: "Structure scaleable multi-route applications using modern framework systems.",
          topics: ["Next.js App Router", "Server Components vs Client Components", "Static & Dynamic Rendering", "Dynamic Routing"],
          project: {
            title: "SaaS Marketing Website & Blog",
            description: "Build a multi-page Next.js site featuring optimized page speeds, metadata tags, and content models."
          }
        },
        {
          title: "State Management & Forms",
          duration: "3 Weeks",
          description: "Perform structured data mutations and state sync across large layouts.",
          topics: ["Context API & Zustand", "React Hook Form", "Yup/Zod Validations", "Axios client interceptors"],
          project: {
            title: "E-Commerce Checkout Workflow",
            description: "Develop a multi-step purchase checkout flow verifying shipping addresses, validating inputs, and listing final totals."
          }
        }
      ]
    },
    Advanced: {
      phases: [
        {
          title: "Production Routing & SSR Architectures",
          duration: "4 Weeks",
          description: "Optimize high-scale applications with server execution strategies and server actions.",
          topics: ["Next.js Server Actions", "Middleware Routing", "Incremental Static Regeneration (ISR)", "Custom Next.js Webpack configs"],
          project: {
            title: "Enterprise Dashboard Portal",
            description: "Build a highly responsive analytics dashboard fetching live data from APIs, with granular middleware role access control."
          }
        },
        {
          title: "Performance & Rendering Optimization",
          duration: "3 Weeks",
          description: "Audit load times, eliminate layout shifts, and design optimized rendering structures.",
          topics: ["Core Web Vitals tuning", "Image & Font optimization", "Dynamic Code Splitting", "Virtual Windowing for huge datasets"],
          project: {
            title: "Ultra-Fast Content Feed",
            description: "Create an infinite scrolling media feed that lazily loads images, pre-fetches assets, and runs clean repaint actions."
          }
        },
        {
          title: "Quality Engineering & Testing",
          duration: "3 Weeks",
          description: "Verify operational resilience with automated test suites.",
          topics: ["Jest & React Testing Library", "Playwright E2E testing", "MSW API Mocking", "CI/CD automated test integrations"],
          project: {
            title: "Fully Tested Authentication Flow",
            description: "Implement tests covering token refresh, invalid sign-ins, and redirect configurations with 90%+ code coverage."
          }
        }
      ]
    }
  },
  backend: {
    Beginner: {
      phases: [
        {
          title: "Backend Setup & Routing Basics",
          duration: "3 Weeks",
          description: "Understand the request-response lifecycle and design initial HTTP routing modules.",
          topics: ["Node.js runtime basics", "Express.js initial setup", "HTTP Methods (GET, POST, etc.)", "URL Query & Params"],
          project: {
            title: "RESTful Contact Directory",
            description: "Build a contact list manager API running in memory with full CRUD endpoints."
          }
        },
        {
          title: "Data Persistence with Databases",
          duration: "4 Weeks",
          description: "Connect APIs to a database and perform standard schema queries.",
          topics: ["MongoDB Basics", "Mongoose Schemas & Models", "SQL vs NoSQL differences", "Mongoose Queries & Updates"],
          project: {
            title: "Product Inventory API",
            description: "Develop an Express API connected to MongoDB Atlas that filters products by stock levels, price ranges, and search tags."
          }
        },
        {
          title: "Deployment & Environment Safety",
          duration: "2 Weeks",
          description: "Prepare and deploy secure codebases to public hosting platforms.",
          topics: ["Environment Variables (.env)", "Express Error Middleware", "CORS Configuration", "Render/Heroku hosting basics"],
          project: {
            title: "Live Production API",
            description: "Deploy your Express backend online with Mongoose logs redirected to a secure Atlas cloud database cluster."
          }
        }
      ]
    },
    Intermediate: {
      phases: [
        {
          title: "REST API Design & Validation",
          duration: "3 Weeks",
          description: "Design robust, self-descriptive APIs with schema level protections.",
          topics: ["RESTful naming guidelines", "Express Request validation", "Mongoose model indices", "Schema validation hooks"],
          project: {
            title: "E-Commerce Catalog Backend",
            description: "Design an API with nested product, category, and review schemas with complete sanitization."
          }
        },
        {
          title: "Identity & Session Security",
          duration: "4 Weeks",
          description: "Verify caller identities and manage secure sessions.",
          topics: ["JWT (JSON Web Tokens)", "Bcrypt password hashing", "Auth Middleware routes", "CORS & Cookie attributes"],
          project: {
            title: "Secure Member Platform",
            description: "Develop a secure auth module featuring user signup, login, password hashes, and user roles access controls."
          }
        },
        {
          title: "File Operations & Email Integration",
          duration: "3 Weeks",
          description: "Integrate cloud assets storage and automated mailing systems.",
          topics: ["Multer parsing middleware", "AWS S3 / Cloudinary integrations", "Nodemailer SMTP integration", "SendGrid email templates"],
          project: {
            title: "Social Post Platform",
            description: "Build an API allowing users to post updates, upload images to cloud storage, and trigger welcome emails on sign-up."
          }
        }
      ]
    },
    Advanced: {
      phases: [
        {
          title: "System Design & Distributed Architectures",
          duration: "4 Weeks",
          description: "Scale applications for high concurrent traffic and async tasks.",
          topics: ["Microservices vs Monoliths", "Redis Caching strategies", "Message Queues (BullMQ / RabbitMQ)", "WebSockets for real-time events"],
          project: {
            title: "Real-time Notification Service",
            description: "Build an Express-Redis system that queues notification events and pushes them to client websockets."
          }
        },
        {
          title: "Query Optimizations & Performance",
          duration: "3 Weeks",
          description: "Resolve slow queries and optimize resource efficiency.",
          topics: ["Database indexing strategies", "N+1 Query avoidance & Mongoose Populate", "Aggregation Pipelines", "Server memory profiling"],
          project: {
            title: "High-Scale Analytics Aggregator",
            description: "Build an API reporting complex system metrics from millions of documents, leveraging compound indexes and Mongoose aggregates."
          }
        },
        {
          title: "Security Hardening & Production Operations",
          duration: "3 Weeks",
          description: "Guard against cyber vulnerabilities and configure monitoring dashboards.",
          topics: ["OWASP Top 10 mitigations", "Rate Limiting & Helmet", "Docker containerization", "PM2 process manager & log rotation"],
          project: {
            title: "Production-Hardened Docker API",
            description: "Deploy a backend running inside a secure Docker container, outfitted with request rate limiters, security headers, and health checks."
          }
        }
      ]
    }
  }
};

/**
 * Maps input string to nearest matching profile in roadmap database
 * @param {string} role Input career role
 * @returns {string} Key in database: 'frontend' or 'backend'
 */
function resolveRoleKey(role) {
  const normalized = role.toLowerCase();
  
  if (normalized.includes("front") || normalized.includes("react") || normalized.includes("ui") || normalized.includes("ux") || normalized.includes("design") || normalized.includes("client")) {
    return "frontend";
  }
  
  // Default to backend for server-side, devops, database, system design, or everything else
  return "backend";
}

/**
 * Helper to build custom phase sets if a non-traditional career path is entered
 * @param {string} role Target Role
 * @param {Array<string>} skills Existing Skills
 * @param {string} level Experience Level
 */
function generateDynamicRoadmap(role, skills, level) {
  const resolvedKey = resolveRoleKey(role);
  const baseTemplate = roadmapDatabase[resolvedKey][level] || roadmapDatabase[resolvedKey]["Beginner"];
  
  // If the user's role is not frontend or backend (e.g. DevOps, Data Science, Cyber Security, Android Developer),
  // we will dynamically modify titles/descriptions to match the user's exact requested career.
  // This keeps the generator incredibly smart and dynamic!
  
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);
  const normalizedSkills = skills.map(s => s.toLowerCase().trim());
  
  const customizedPhases = baseTemplate.phases.map((phase, idx) => {
    let customTitle = phase.title;
    let customDesc = phase.description;
    let customTopics = [...phase.topics];
    let customProjectTitle = phase.project.title;
    let customProjectDesc = phase.project.description;

    // Apply role-based text updates
    if (resolvedKey === "backend") {
      if (roleName.toLowerCase().includes("devops") || roleName.toLowerCase().includes("cloud")) {
        if (idx === 0) {
          customTitle = "DevOps Foundations & Scripting";
          customDesc = "Understand infrastructure workflows, Linux shells, and automation scripts.";
          customTopics = ["Linux Commands", "Bash/Python Scripting", "YAML Syntax", "Networking Basics"];
          customProjectTitle = "Automated System Check Utility";
          customProjectDesc = "Write a bash/python script that reports CPU, memory, and database status parameters on a timer.";
        } else if (idx === 1) {
          customTitle = "Containerization & Cloud Services";
          customDesc = "Package applications into isolated layers and host on cloud clusters.";
          customTopics = ["Docker Containers", "Docker Compose", "AWS EC2/S3 basics", "Terraform Infrastructure"];
          customProjectTitle = "Dockerized Multi-service Setup";
          customProjectDesc = "Build a multi-container Docker infrastructure with web server, database, and cache network configurations.";
        } else if (idx === 2) {
          customTitle = "Continuous Delivery & Orchestration";
          customDesc = "Automate testing, integration, deployment, and cluster scheduling workflows.";
          customTopics = ["Kubernetes Pods & Services", "GitHub Actions CI/CD", "Prometheus & Grafana logs", "SSL & Nginx Gateway Configuration"];
          customProjectTitle = "Production-grade CI/CD pipeline";
          customProjectDesc = "Implement a GitHub Actions flow that runs tests, builds docker images, and deploys to a Kubernetes cluster.";
        }
      } else if (roleName.toLowerCase().includes("data") || roleName.toLowerCase().includes("machine") || roleName.toLowerCase().includes("ml") || roleName.toLowerCase().includes("ai")) {
        if (idx === 0) {
          customTitle = "Data Wrangling & Mathematics";
          customDesc = "Develop math foundations and parse raw datasets into analysis matrices.";
          customTopics = ["Python (NumPy, Pandas)", "Linear Algebra & Statistics", "Jupyter Notebooks", "Data Loading & JSON parsing"];
          customProjectTitle = "CSV Analysis Dashboard";
          customProjectDesc = "Load and clean a dataset containing thousands of rows, compiling statistical insights and averages.";
        } else if (idx === 1) {
          customTitle = "Model Training & Visualizations";
          customDesc = "Construct regression/classification algorithms and design visual reports.";
          customTopics = ["Scikit-Learn models", "Matplotlib & Seaborn plots", "SQL Databases & queries", "Feature Engineering"];
          customProjectTitle = "Housing Price Prediction Model";
          customProjectDesc = "Build and train a regression model that estimates housing values based on historical parameters.";
        } else if (idx === 2) {
          customTitle = "Deep Learning & Model Deployment";
          customDesc = "Build neural networks and deploy modeling endpoints for application usage.";
          customTopics = ["TensorFlow / PyTorch basics", "REST API model hosting", "SQL Aggregations & indices", "Vector databases (Pinecone/Milvus)"];
          customProjectTitle = "Semantic Search & Image Tagging API";
          customProjectDesc = "Deploy a Flask/Express application that queries a neural network classifier to tag custom uploads.";
        }
      } else {
        // General customized backend role
        customTitle = customTitle.replace("Backend", roleName);
        customProjectTitle = customProjectTitle.replace("RESTful", `${roleName} RESTful`);
      }
    } else {
      // General customized frontend / UX role
      if (roleName.toLowerCase().includes("ui") || roleName.toLowerCase().includes("ux") || roleName.toLowerCase().includes("design")) {
        if (idx === 0) {
          customTitle = "User Interface & Figma Basics";
          customDesc = "Learn layout principles, component grids, type systems, and responsive design guidelines.";
          customTopics = ["Figma Layout Grids", "Color Harmonies & Contrast", "Typography Hierarchies", "UI component design library"];
          customProjectTitle = "High-fidelity Desktop & Mobile Prototypes";
          customProjectDesc = "Design a complete responsive SaaS landing page mockup using interactive component variants in Figma.";
        } else if (idx === 1) {
          customTitle = "User Research & Prototypes";
          customDesc = "Conduct research interviews, build user flows, and link frames into clickable wireframes.";
          customTopics = ["Information Architecture", "Interactive Figma Prototyping", "User persona research", "Usability testing audits"];
          customProjectTitle = "Interactive Web Platform Mockup";
          customProjectDesc = "Build a high-fidelity prototype with dynamic scroll behaviors, hover effects, and slide-in panels.";
        } else if (idx === 2) {
          customTitle = "Design System & Handoff Operations";
          customDesc = "Translate designs into code structures and manage design-to-engineering handoffs.";
          customTopics = ["Figma Design Tokens", "Tailwind CSS mappings", "Storybook Component Documentation", "Accessibility (WCAG) guidelines"];
          customProjectTitle = "Storybook Theme Library Design";
          customProjectDesc = "Deliver a complete documented design library containing buttons, cards, and modal components mapped to Tailwind style parameters.";
        }
      } else if (roleName.toLowerCase().includes("mobile") || roleName.toLowerCase().includes("ios") || roleName.toLowerCase().includes("android")) {
        if (idx === 0) {
          customTitle = "Mobile Framework Foundations";
          customDesc = "Set up mobile runtimes, compiler tooling, and basic screen layouts.";
          customTopics = ["React Native / Flutter setup", "Mobile Flexbox layouts", "State & Props in Mobile", "Navigation routing libraries"];
          customProjectTitle = "Mobile Contact Directory";
          customProjectDesc = "Build a contacts app displaying names and numbers in a scrollable list, linking to a details screen.";
        } else if (idx === 1) {
          customTitle = "Mobile API Fetch & Local Storage";
          customDesc = "Fetch data from JSON web endpoints and save preferences to mobile storage.";
          customTopics = ["Axios Mobile integrations", "AsyncStorage / SQLite databases", "Camera & Image Picker access", "Push Notification setups"];
          customProjectTitle = "Offline Weather Forecast App";
          customProjectDesc = "Build a weather forecast app that caches the last-viewed city search data to persistent storage.";
        } else if (idx === 2) {
          customTitle = "App Store Preparation & Optimizations";
          customDesc = "Prepare application bundles for submission to Apple App Store or Google Play Store.";
          customTopics = ["App Bundle signing", "Native build files (Gradle/Xcode)", "Performance audits & memory leak removals", "Over-the-Air updates (Expo EAS)"];
          customProjectTitle = "Published App Store Ready Bundle";
          customProjectDesc = "Configure splash screens, app store assets, and compile production-grade release binaries.";
        }
      } else {
        customTitle = customTitle.replace("Web", roleName);
      }
    }

    // Skip verification logic:
    // If user already knows all topics in this phase, we highlight it as "accelerated"
    const knownTopics = customTopics.filter(topic => 
      normalizedSkills.includes(topic.toLowerCase().trim()) || 
      normalizedSkills.some(skill => topic.toLowerCase().includes(skill))
    );

    let phaseDuration = phase.duration;
    let phaseDescription = customDesc;
    if (knownTopics.length === customTopics.length) {
      phaseDuration = "Accelerated (1-2 Days Review)";
      phaseDescription = `You have already demonstrated knowledge in all areas: ${knownTopics.join(", ")}. Spend 1-2 days verifying setup, then skip directly to the project milestone!`;
    } else if (knownTopics.length > 0) {
      phaseDuration = `Fast-Tracked (${parseInt(phase.duration) - 1} Weeks)`;
      phaseDescription = `Accelerated since you know: ${knownTopics.join(", ")}. Focus on the remaining areas: ${customTopics.filter(t => !knownTopics.includes(t)).join(", ")}.`;
    }

    return {
      phaseNumber: idx + 1,
      title: customTitle,
      duration: phaseDuration,
      description: phaseDescription,
      topics: customTopics,
      project: {
        title: customProjectTitle,
        description: customProjectDesc
      }
    };
  });

  return {
    phases: customizedPhases
  };
}

module.exports = {
  generateDynamicRoadmap
};
