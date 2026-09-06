export const portfolioData = {
  personal: {
    name: "Onkar Shivaji Gutti",
    title: "MERN Stack & Backend Developer",
    tagline: "Engineering Scalable Web Architectures, Resilient APIs & 3D Interactive Systems",
    email: "onkar.gutti.dev@gmail.com",
    phone: "+91 98765 43210",
    location: "Solapur, Maharashtra, India",
    status: "Available for Backend & Full-Stack Roles",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    bio: "Motivated and results-driven MERN Stack Developer seeking a Backend Developer position. Passionate about backend architecture, problem-solving, and building secure, scalable, user-focused solutions using Node.js, Express.js, MongoDB, RESTful APIs, and modern frontend paradigms.",
    stats: [
      { label: "Academic Rank", value: "#1", sub: "SPM Polytechnic (92%)" },
      { label: "Internship Award", value: "1st Prize", sub: "Deram Technology" },
      { label: "Hackathons", value: "3+", sub: "Orchathon, BLDE, SVERI" },
      { label: "Backend Core", value: "100%", sub: "RESTful & Modular" }
    ]
  },

  skills: {
    backend: [
      { name: "Node.js", level: 92, icon: "server", desc: "Event-driven runtime, streams, cluster, worker threads" },
      { name: "Express.js", level: 90, icon: "cpu", desc: "Modular routing, custom middleware, error handling, rate limiting" },
      { name: "RESTful APIs", level: 94, icon: "network", desc: "Resource modeling, HTTP semantics, versioning, pagination" },
      { name: "JWT & Security", level: 88, icon: "shield-check", desc: "Token rotation, bcrypt hashing, CORS, RBAC, helmet" },
      { name: "MVC Architecture", level: 90, icon: "layers", desc: "Separation of concerns, clean controllers, services, repositories" }
    ],
    database: [
      { name: "MongoDB", level: 90, icon: "database", desc: "Document modeling, aggregation pipelines, indexing, sharding" },
      { name: "Mongoose", level: 89, icon: "git-commit", desc: "Schema validation, virtuals, pre/post middleware hooks" },
      { name: "PostgreSQL", level: 82, icon: "hard-drive", desc: "Relational modeling, ACID compliance, joins, foreign keys" },
      { name: "MySQL", level: 85, icon: "table", desc: "Stored procedures, indexing, normalization, transaction queries" }
    ],
    frontend: [
      { name: "React.js", level: 88, icon: "atom", desc: "Component lifecycle, state management, custom hooks, Virtual DOM" },
      { name: "JavaScript (ES6+)", level: 92, icon: "code-2", desc: "Closures, async/await, event loop, prototypes, destructuring" },
      { name: "TypeScript", level: 80, icon: "file-code", desc: "Interfaces, generics, strict typing, TS compiler config" },
      { name: "HTML5 & Modern CSS", level: 92, icon: "palette", desc: "CSS grid, flexbox, glassmorphism, responsive micro-animations" },
      { name: "Tailwind CSS & Bootstrap", level: 86, icon: "layout", desc: "Rapid UI prototyping, utility-first design, mobile-first grid" }
    ],
    languages: [
      { name: "JavaScript", level: 92, icon: "zap" },
      { name: "TypeScript", level: 80, icon: "file-text" },
      { name: "Java (Core & Adv)", level: 85, icon: "coffee" },
      { name: "C++", level: 82, icon: "terminal" },
      { name: "SQL", level: 88, icon: "database" },
      { name: "Python", level: 78, icon: "binary" }
    ],
    devops: [
      { name: "Docker", level: 78, icon: "container", desc: "Containerization, Dockerfile recipes, container networking" },
      { name: "Git & GitHub", level: 90, icon: "git-branch", desc: "Branching strategies, PR reviews, CI/CD workflows" },
      { name: "Postman", level: 92, icon: "send", desc: "API testing, automated collections, environment variables, mock servers" },
      { name: "Vercel & Render", level: 88, icon: "cloud", desc: "Serverless deployments, environment secrets, continuous delivery" },
      { name: "VS Code", level: 95, icon: "monitor", desc: "Debugging workflows, extensions, terminal integration" }
    ]
  },

  projects: [
    {
      id: "banking-system",
      title: "ApexBank - Full-Stack Banking System",
      subtitle: "Secure Core Banking with ACID Transactions & RBAC",
      badge: "MERN Stack Core",
      tagline: "Enterprise-grade financial transactions with cryptographic audit logging and role-based access control.",
      description: "Developed a full-stack banking ecosystem featuring modular backend architecture, JSON Web Token authentication, real-time balance calculations, and multi-tier transaction ledgers. Applied robust input validation, rate limiting, and defensive database error handling.",
      tech: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT", "Bcrypt", "REST APIs"],
      color: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.4)",
      highlights: [
        "Architected RESTful endpoints for deposit, withdrawal, and inter-account fund transfers with rollback guarantees",
        "Configured secure authentication with bcrypt password salting and dual JWT token expiration flow",
        "Built responsive client dashboard with interactive transaction history, statement filters, and balance analytics"
      ],
      mockApi: {
        endpoint: "/api/v1/accounts/transfer",
        method: "POST",
        payload: {
          fromAccount: "ACC-892401",
          toAccount: "ACC-304912",
          amount: 2500,
          currency: "INR",
          remark: "Vendor payment"
        },
        response: {
          status: 200,
          success: true,
          message: "Transfer executed successfully",
          transactionId: "TXN_78F9A1B24",
          timestamp: "2026-09-06T13:45:00Z",
          balanceAfter: 48750.00
        }
      }
    },
    {
      id: "ai-interview-system",
      title: "NexusAI - AI Interview & Group Discussion Simulator",
      subtitle: "Dynamic Speech & Interaction Assessment Engine",
      badge: "AI + Full-Stack",
      tagline: "Next-generation preparation platform empowering candidates with simulated AI panel interviews and GD dynamics.",
      description: "Designed and engineered an intelligent interview preparation web platform. Implemented dynamic application workflows, conversation state management, interactive prompt response analysis, and multi-speaker Group Discussion simulations.",
      tech: ["Node.js", "Express.js", "MongoDB", "React.js", "REST APIs", "AI Orchestration"],
      color: "#8b5cf6",
      glowColor: "rgba(139, 92, 246, 0.4)",
      highlights: [
        "Engineered real-time prompt-response pipeline with personalized feedback metrics and score cards",
        "Modeled user performance analytics tracking clarity, technical depth, and confidence over time",
        "Structured modular backend APIs supporting multi-role group discussion turn-taking protocols"
      ],
      mockApi: {
        endpoint: "/api/v1/interview/evaluate",
        method: "POST",
        payload: {
          sessionId: "INT-4820",
          questionId: "Q_ARCH_04",
          response: "We can scale Node.js using cluster mode and Redis pub/sub..."
        },
        response: {
          status: 200,
          success: true,
          scores: {
            technicalAccuracy: 94,
            articulation: 89,
            relevance: 92
          },
          feedback: "Strong architectural explanation with sound knowledge of concurrency patterns."
        }
      }
    },
    {
      id: "course-management",
      title: "LearnFlow - Enterprise Course Management Engine",
      subtitle: "Awarded 1st Prize at Deram Technology Internship",
      badge: "Award Winner 🏆",
      tagline: "Scalable course creation, student enrollment pipeline, and dynamic curriculum tracking engine.",
      description: "Engineered during a 1-month intensive MERN Stack internship at Deram Technology and earned 1st Prize out of all cohort submissions. Implemented multi-tier authentication, dynamic curriculum schemas, secure enrollment payment simulation, and instructor analytics.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Modular MVC", "REST APIs"],
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      highlights: [
        "Won 1st Prize at Deram Technology for superior project architecture and execution",
        "Developed end-to-end CRUD controllers with Mongoose models for courses, modules, and enrollments",
        "Implemented role-based dashboards differentiating student learners from instructor administrators"
      ],
      mockApi: {
        endpoint: "/api/v1/courses/enroll",
        method: "POST",
        payload: {
          courseId: "COURSE-MERN-901",
          studentId: "STU-8821",
          batch: "Fall-2026"
        },
        response: {
          status: 201,
          success: true,
          enrollmentId: "ENR_9019283",
          accessGranted: true,
          validTill: "2027-09-06"
        }
      }
    }
  ],

  experience: [
    {
      role: "MERN Stack Developer Intern",
      organization: "Deram Technology",
      period: "Internship (1 Month)",
      badge: "🏆 1st Prize Winner",
      type: "Internship",
      details: [
        "Developed a complete MERN Stack Course Management Website from inception to deployment.",
        "Engineered RESTful API routes, schema validation, and responsive React frontend interfaces.",
        "Honored with 1st Prize for outstanding project development, code hygiene, and implementation."
      ]
    },
    {
      role: "Technical & Soft Skills Trainee",
      organization: "Zensar Technologies",
      period: "February 2026",
      badge: "8-Day Intensive",
      type: "Training",
      details: [
        "Completed rigorous hands-on technical training spanning Core Java, Advanced Java, SQL, and Python.",
        "Practiced real-world coding problems, object-oriented design patterns, and database query optimizations.",
        "Participated in 2 days of corporate workplace communication and technical presentation workshops."
      ]
    },
    {
      role: "Pre-Placement Aptitude & Problem Solving",
      organization: "Aptech",
      period: "March 2026",
      badge: "Assessment Ready",
      type: "Training",
      details: [
        "Completed specialized pre-placement training centered on quantitative aptitude, logical reasoning, and data interpretation.",
        "Refined rapid problem-solving strategies for corporate placement exams and technical assessments."
      ]
    }
  ],

  hackathons: [
    {
      title: "Orchathon 2026",
      type: "36-Hour Hackathon",
      year: "2026",
      desc: "Architected high-velocity solution under intense 36-hour sprint with real-time teamwork and continuous deployment."
    },
    {
      title: "BLDE Vijayapura Hackathon",
      type: "36-Hour Hackathon",
      year: "2025",
      desc: "Built full-stack prototype tackling community problem statement, emphasizing rapid API prototyping and database modeling."
    },
    {
      title: "SVERI Pandharpur Hackathon",
      type: "24-Hour Hackathon",
      year: "2026",
      desc: "Collaborated on rapid product MVP delivering clean modular code, intuitive UI, and reliable database connectivity."
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "N. K. Orchid College of Engineering, Solapur",
      period: "Pursuing • Expected 2027",
      score: "Undergraduate",
      highlight: "Deep focus on Advanced Data Structures, Backend Systems, DBMS, and Distributed Architecture."
    },
    {
      degree: "Diploma in Computer Science",
      institution: "SPM Polytechnic, Kumthe",
      period: "Completed 2024",
      score: "92% (Secured 1st Rank in Academics 🥇)",
      highlight: "Awarded 1st Rank across the institution with 92% aggregate. Solid foundational mastery of OOP, C++, Java, and Web Basics."
    },
    {
      degree: "10th SSC (Secondary School Certificate)",
      institution: "Shri Mallikarjun High School",
      period: "Completed 2021",
      score: "83.14%",
      highlight: "Excellence in Mathematics and Science foundation."
    }
  ],

  certifications: [
    {
      title: "SQL Certification",
      issuer: "HackerRank",
      icon: "database",
      badge: "Verified Skill",
      desc: "Advanced relational queries, complex joins, aggregations, subqueries, and window functions."
    },
    {
      title: "Java Certification",
      issuer: "HackerRank",
      icon: "coffee",
      badge: "Verified Skill",
      desc: "Core Java, OOP principles, collections framework, exception handling, and multithreading."
    },
    {
      title: "JavaScript Certification",
      issuer: "Scaler",
      icon: "zap",
      badge: "Advanced Core",
      desc: "Asynchronous programming, event loop, functional patterns, ES6+ semantics, and DOM mechanics."
    },
    {
      title: "Python Certification",
      issuer: "Reliance Foundation",
      icon: "binary",
      badge: "Certified",
      desc: "Data manipulation, scripting, algorithmic problem solving, and Python standard library."
    },
    {
      title: "PHP Certification",
      issuer: "Infosys Springboard",
      icon: "code",
      badge: "Enterprise Training",
      desc: "Server-side scripting, request handling, sessions, and backend architecture."
    }
  ]
};
