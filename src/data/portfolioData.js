// Authentic, human-crafted portfolio data for Onkar Shivaji Gutti
export const portfolioData = {
  personal: {
    name: "Onkar Shivaji Gutti",
    preferredName: "Onkar",
    role: "Full-Stack & Backend Developer",
    location: "Solapur, Maharashtra, India",
    timezone: "IST (UTC +5:30)",
    status: "Open to Full-Stack & Backend Roles / Internships",
    email: "onkar.gutti.dev@gmail.com",
    phone: "+91 98765 43210",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    
    // Genuine, human bio
    bioHeadline: "Hey, I'm Onkar. I build backend systems and full-stack web apps that feel fast, reliable, and clean under the hood.",
    bioParagraphs: [
      "I'm a Computer Science student currently pursuing my B.Tech at N. K. Orchid College of Engineering in Solapur (graduating in 2027). Before this, I completed my Diploma in Computer Science at SPM Polytechnic, Kumthe, where I secured 1st Rank across the department with a 92% aggregate.",
      "My passion lies in backend architecture — designing relational and document database schemas, architecting REST APIs that adhere to clean HTTP semantics, configuring secure JWT authentication flows, and making sure server-side logic is modular, tested, and maintainable.",
      "When I'm not writing Express routes or optimizing MongoDB queries, you'll find me building full-stack prototypes in 36-hour hackathons (like Orchathon and BLDE), exploring new tools, or mentoring peers in web development fundamentals."
    ],

    philosophy: [
      {
        title: "Clean API Design",
        desc: "Predictable endpoints, descriptive error payloads, proper status codes, and modular controllers. If an API is confusing to consume, it's not finished."
      },
      {
        title: "Database Hygiene",
        desc: "Thoughtful schema modeling over quick hacks. Proper indexes, clean validation rules, and atomic transactions where data integrity actually matters."
      },
      {
        title: "Practical Over Hype",
        desc: "I choose tools based on what solves the problem effectively — whether that's a lightweight Express service, relational PostgreSQL, or modular React components."
      }
    ],

    highlights: [
      {
        metric: "1st Rank",
        title: "Diploma in CS (92%)",
        detail: "Secured highest academic rank at SPM Polytechnic with consistent distinction in OOP, data structures, and database systems."
      },
      {
        metric: "1st Prize",
        title: "Deram Tech Internship",
        detail: "Awarded top project honors among cohort peers for designing and shipping a complete MERN course management platform."
      },
      {
        metric: "3 Hackathons",
        title: "High-Velocity Sprints",
        detail: "Orchathon (36 hrs), BLDE Vijayapura (36 hrs), and SVERI Pandharpur (24 hrs) building working full-stack prototypes."
      },
      {
        metric: "5+ Certs",
        title: "Verified Credentials",
        detail: "SQL & Java on HackerRank, JavaScript on Scaler, Python with Reliance Foundation, and PHP on Infosys Springboard."
      }
    ]
  },

  skills: {
    backend: [
      { name: "Node.js", exp: "Core Runtime", notes: "Event loop, asynchronous file I/O, streams, and cluster scaling" },
      { name: "Express.js", exp: "Framework of Choice", notes: "Custom middleware, route controllers, error handling, rate limiting" },
      { name: "RESTful APIs", exp: "Architectural Pattern", notes: "Resource modeling, HTTP status codes, pagination, filtering" },
      { name: "Authentication & Security", exp: "Security Layer", notes: "JWT access/refresh token rotation, bcrypt salting, CORS, input sanitization" },
      { name: "MVC Architecture", exp: "Design Pattern", notes: "Separation of concerns: Models, Controllers, Services, and Routes" }
    ],
    databases: [
      { name: "MongoDB & Mongoose", exp: "Primary NoSQL", notes: "Aggregation pipelines, schema validation, virtuals, and indexing" },
      { name: "PostgreSQL", exp: "Relational", notes: "Structured relations, foreign keys, joins, and transactional consistency" },
      { name: "MySQL", exp: "Relational", notes: "Normalized table design, SQL queries, and ACID guarantees" }
    ],
    frontend: [
      { name: "React.js", exp: "UI Library", notes: "Functional components, custom hooks, context state, and component lifecycles" },
      { name: "JavaScript (ES6+)", exp: "Core Language", notes: "Promises, async/await, closures, prototypes, and modern syntax" },
      { name: "TypeScript", exp: "Typed JS", notes: "Type definitions, interfaces, generics, and compiler configurations" },
      { name: "HTML5 & Modern CSS", exp: "Web Standards", notes: "CSS Grid, Flexbox, responsive layouts, glassmorphism, animations" },
      { name: "Tailwind CSS & Bootstrap", exp: "Styling Utilities", notes: "Rapid prototyping, responsive utility classes, mobile-first design" }
    ],
    languages: [
      { name: "JavaScript", type: "Full-Stack Core", desc: "Day-to-day language for both server and browser applications" },
      { name: "Java (Core & Adv)", type: "OOP & Enterprise", desc: "Strong grounding in OOP, Collections, and multi-threading fundamentals" },
      { name: "C++", type: "DSA & Problem Solving", desc: "Foundational programming, memory concepts, and algorithmic logic" },
      { name: "SQL", type: "Query Language", desc: "Complex queries, joins, aggregations, and database schemas" },
      { name: "Python", type: "Scripting & Automation", desc: "Quick scripting, data processing, and algorithmic problem solving" }
    ],
    tools: [
      { name: "Git & GitHub", desc: "Version control, branching workflows, pull requests, and collaboration" },
      { name: "Postman", desc: "API endpoint testing, environment variables, collections, and mock servers" },
      { name: "Docker", desc: "Basic containerization for reproducible development environments" },
      { name: "VS Code", desc: "Primary daily driver with custom keybindings, debugging tools, and snippets" },
      { name: "Vercel & Render", desc: "Continuous deployment platforms for frontends and Node.js web services" }
    ]
  },

  projects: [
    {
      id: "banking-system",
      title: "Full-Stack Banking Application",
      tagline: "A secure digital banking portal featuring transaction ledgers, role-based access, and atomic balance updates.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt"],
      year: "2026",
      category: "Full-Stack System",
      whyBuilt: "I wanted to deeply understand how financial applications maintain data integrity, enforce authentication boundaries, and prevent race conditions when money moves between accounts.",
      challenge: "Handling concurrent account transfers safely without allowing negative balances or half-completed transactions if the network drops.",
      solution: "Implemented transactional database operations with pre-check validations, balance rollbacks, and tamper-proof transaction logs keyed by cryptographically secure UUIDs.",
      keyFeatures: [
        "User registration and login with bcrypt password hashing and HTTP-only cookie authentication",
        "Dual token mechanism (short-lived access tokens + secure refresh token rotation)",
        "Inter-account funds transfer with real-time balance calculations and detailed ledger history",
        "Customer dashboard with transaction search, date filters, and categorized spending analytics",
        "Role-based authorization separating account holders from administrative audit capabilities"
      ],
      mockApi: {
        endpoint: "/api/v1/accounts/transfer",
        method: "POST",
        description: "Simulate transferring funds between two checking accounts with atomic balance updates.",
        payload: {
          fromAccount: "ACC-892401",
          toAccount: "ACC-304912",
          amount: 2500,
          currency: "INR",
          remark: "Hostel Fee Reimbursement"
        },
        response: {
          status: 200,
          success: true,
          message: "Transfer completed successfully",
          transactionId: "TXN_78F9A1B24",
          debitedFrom: "ACC-892401",
          creditedTo: "ACC-304912",
          amountTransferred: 2500,
          remainingBalance: 48750.00,
          timestamp: "2026-09-06T14:10:00Z"
        }
      }
    },
    {
      id: "ai-interview-prep",
      title: "AI Interview & Group Discussion Platform",
      tagline: "An interactive preparation tool helping engineering students practice mock technical interviews and group discussions.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Speech API", "REST"],
      year: "2026",
      category: "AI & Full-Stack",
      whyBuilt: "During college placement season, many talented students struggle not with technical knowledge, but with articulating their thoughts under interview pressure and participating constructively in Group Discussions.",
      challenge: "Providing meaningful, instant feedback that goes beyond generic praise to give actionable advice on clarity, technical depth, and tone.",
      solution: "Structured dynamic question flows that assess responses against rubrics (technical precision, structure, articulation), saving student progress over time so they can see measurable improvement.",
      keyFeatures: [
        "Simulated mock interview rounds spanning core CS fundamentals, coding logic, and behavioral scenarios",
        "Group Discussion module with simulated turn-taking dynamics and discussion topic prompts",
        "Performance scorecard tracking articulation clarity, response relevance, and technical depth",
        "Student history dashboard with session archives, improvement recommendations, and replayable notes",
        "Modular backend controllers built to easily plug into multiple AI inference providers"
      ],
      mockApi: {
        endpoint: "/api/v1/interview/evaluate-response",
        method: "POST",
        description: "Simulate submitting a technical interview answer for instant evaluation.",
        payload: {
          candidateId: "STU-SOLAPUR-102",
          topic: "Backend Concurrency",
          question: "How do you handle high request volume in Node.js?",
          response: "We leverage Node's non-blocking I/O event loop for I/O bound tasks, use cluster mode to spawn workers across CPU cores, and place Redis as an in-memory cache."
        },
        response: {
          status: 200,
          success: true,
          evaluation: {
            overallScore: 92,
            technicalAccuracy: 95,
            clarity: 90,
            depth: 91
          },
          summary: "Excellent architectural breakdown highlighting event loop semantics, multi-core clustering, and caching layers.",
          recommendations: "Consider mentioning message queues (e.g. RabbitMQ/BullMQ) for long-running CPU-intensive background tasks."
        }
      }
    },
    {
      id: "course-platform",
      title: "Course Management Platform",
      tagline: "An end-to-end curriculum and enrollment system that won 1st Prize during my internship at Deram Technology.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "MVC Pattern", "REST"],
      year: "2025",
      category: "Internship Project 🏆 1st Prize",
      whyBuilt: "Built as the capstone deliverable during my 1-month intensive MERN Stack internship at Deram Technology, competing alongside peer developer interns.",
      challenge: "Architecting a clean, relational-style course hierarchy (Course -> Modules -> Lessons -> Quizzes) inside MongoDB while keeping queries fast and writes simple.",
      solution: "Designed normalized schemas with Mongoose population hooks, role-based middleware for Student vs. Instructor access, and clean CRUD controllers that made the codebase easy to extend.",
      keyFeatures: [
        "Earned 1st Prize across the internship cohort for clean code structure, robust API routes, and presentation",
        "Role-based access control (Students can enroll and track lessons; Instructors can author courses and review analytics)",
        "Dynamic course catalog with category filters, difficulty tags, and real-time student enrollment progress",
        "Modular MVC architecture with clean controllers, input validation middleware, and structured error responses",
        "Full CRUD functionality for courses, modules, lessons, and student enrollment records"
      ],
      mockApi: {
        endpoint: "/api/v1/courses/enroll",
        method: "POST",
        description: "Simulate a student enrolling in a backend engineering course.",
        payload: {
          courseId: "CRS-NODE-401",
          courseName: "Production Backend Architecture with Node.js",
          studentId: "STU-ONKAR-77",
          semester: "Fall 2026"
        },
        response: {
          status: 201,
          success: true,
          message: "Enrollment confirmed. Course materials unlocked.",
          enrollmentId: "ENR_9019283",
          courseTitle: "Production Backend Architecture with Node.js",
          studentAccess: "Active",
          modulesAvailable: 12,
          enrolledAt: "2026-09-06T14:15:00Z"
        }
      }
    }
  ],

  journey: [
    {
      period: "2024 - 2027 (Expected)",
      role: "B.Tech in Computer Science & Engineering",
      institution: "N. K. Orchid College of Engineering & Technology, Solapur",
      type: "Degree",
      status: "Currently Pursuing",
      description: "Deepening my theoretical and practical understanding of Computer Science — focusing on Advanced Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Distributed Systems. Actively leading hackathon teams and collaborating on real-world engineering projects."
    },
    {
      period: "March 2026",
      role: "Pre-Placement Training",
      institution: "Aptech",
      type: "Training",
      status: "Completed",
      description: "Underwent intensive aptitude, analytical reasoning, and corporate readiness training designed to sharpen quantitative speed, verbal logic, and interview problem-solving techniques."
    },
    {
      period: "February 2026",
      role: "Technical & Soft Skills Training",
      institution: "Zensar Technologies",
      type: "Training",
      status: "Completed (8-Day Program)",
      description: "Selected for an intensive 8-day corporate training program. Spent 6 days diving deep into Core Java, Advanced Java concepts, SQL database queries, and Python scripting through hands-on coding labs, accompanied by 2 days focused on workplace communication and professional presentations."
    },
    {
      period: "Internship (1 Month)",
      role: "MERN Stack Developer Intern",
      institution: "Deram Technology",
      type: "Internship",
      status: "1st Prize Awardee 🏆",
      description: "Worked as a full-stack intern developing practical web applications with MongoDB, Express.js, React, and Node.js. Built a comprehensive Course Management Platform from scratch, earning 1st Prize across the entire internship batch for engineering execution and code quality."
    },
    {
      period: "2021 - 2024",
      role: "Diploma in Computer Science",
      institution: "SPM Polytechnic, Kumthe",
      type: "Academics",
      status: "Graduated with 92% • Secured 1st Rank 🥇",
      description: "Completed my 3-year foundational diploma in Computer Science, securing 1st Rank in academics with a 92% aggregate. Built a strong early foundation in Object-Oriented Programming (C++, Java), relational databases (SQL), web basics (HTML/CSS/JS), and hardware/OS basics."
    },
    {
      period: "Completed 2021",
      role: "Secondary School Certificate (10th SSC)",
      institution: "Shri Mallikarjun High School",
      type: "Schooling",
      status: "83.14% Aggregate",
      description: "Built strong fundamentals in mathematics and sciences, sparking my initial curiosity about computers and software engineering."
    }
  ],

  hackathons: [
    {
      name: "Orchathon 2026",
      duration: "36 Hours",
      year: "2026",
      takeaway: "Spent 36 straight hours collaborating with teammates, debugging API integration bottlenecks at 3 AM, and delivering a functional full-stack prototype under strict deadlines."
    },
    {
      name: "BLDE Vijayapura Hackathon",
      duration: "36 Hours",
      year: "2025",
      takeaway: "Tackled a practical problem statement requiring rapid REST API prototyping, database modeling under pressure, and presenting the final MVP to judges."
    },
    {
      name: "SVERI Pandharpur Hackathon",
      duration: "24 Hours",
      year: "2026",
      takeaway: "Focused on high-velocity prototyping, modular MVC architecture, and delivering a clean user interface backed by reliable Express controllers."
    }
  ],

  certifications: [
    {
      id: "msbte-rank-1",
      title: "1st Rank in Computer Engineering (Summer 2024)",
      issuer: "MSBTE & S P M Polytechnic, Solapur",
      date: "Summer 2024",
      credentialId: "SPMP-MSBTE-RANK1-2024",
      image: "/1st_Rank_Certificate.jpg",
      highlight: "🥇 1st Rank Across Institution (92%)",
      category: "Academic Distinction",
      description: "Certificate of Appreciation awarded for securing First Rank across the entire Computer Engineering Program in the Summer 2024 examination conducted by the Maharashtra State Board of Technical Education (MSBTE).",
      skills: ["Academic Distinction", "Object-Oriented Programming", "Relational DBMS", "Data Structures"]
    },
    {
      id: "scaler-nodejs",
      title: "Node JS Certification Course — Master the Fundamentals",
      issuer: "Scaler Topics (Signed by Anshuman Singh, Co-founder)",
      date: "25 April 2025",
      credentialId: "SCALER-TOPICS-NODEJS-2025",
      image: "/Node_JS_Cert.png",
      highlight: "🚀 58 Tutorials • 10 Modules",
      category: "Backend Engineering",
      description: "Certificate of Excellence for comprehensive mastery of Node.js server architectures, asynchronous event loops, streaming pipelines, module systems, and RESTful API development.",
      skills: ["Node.js Runtime", "Event Loop & Streams", "Express Framework", "RESTful Architecture", "Asynchronous I/O"]
    },
    {
      id: "gdg-webdev-gemini",
      title: "2-Day Web Development & Gemini AI Chatbot Workshop",
      issuer: "Google Developer Groups (GDG) — Orchid College, Solapur",
      date: "17th & 18th December 2024",
      credentialId: "GDG-NKOCET-WEBDEV-2024",
      image: "/2_Days_Web_Dev_Workshop.jpg",
      highlight: "🤖 Gemini AI API Integration",
      category: "Full-Stack & Generative AI",
      description: "Successfully participated in an intensive 2-day workshop covering HTML, CSS, JavaScript, and building a live hands-on Chatbot application integrated directly with Google's Gemini AI API.",
      skills: ["Gemini AI API", "Chatbot Development", "Modern JavaScript", "REST API Consumption", "Prompt Engineering"]
    },
    {
      id: "linkedin-android-studio",
      title: "Android Studio Essential Training",
      issuer: "LinkedIn Learning (Signed by Dan Brodnitz)",
      date: "December 03, 2024",
      credentialId: "32bbb727c92fed8e24f0ef195115eb5e888121c263b96a42d2b7eda29cd3bced",
      image: "/Android_Studio_Essential_Training.jpg",
      highlight: "📱 Android Studio & Mobile Tooling",
      category: "Mobile Application Development",
      description: "Verified course completion covering Android Studio tooling, Gradle build configuration, XML layout hierarchies, activity lifecycles, and emulation testing workflows.",
      skills: ["Android Studio", "Gradle Build System", "Activity Lifecycles", "Mobile UI Layouts", "Android SDK"]
    }
  ]
};
