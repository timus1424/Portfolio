import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  status: string;
  role: string;
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
  thumbnail: string;
  details: {
    overview: string;
    features: string[];
    challenges: string[];
    learned: string[];
  };
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  const [expandedProject, setExpandedProject] = useState<
    number | null
  >(null);

  // MANUALLY EDITABLE PROJECT DATA
  // To add a new project: duplicate an object below and replace all fields
  const projects: Project[] = [
    {
      title: "PartyPal AI – Event Planning Platform",
      description:
        "AI-assisted event planning platform built for the Devopia Hackathon to simplify party and event management workflows.",
      techStack: [
        "HTML",
        "Python",
        "SQL",
        "Figma",
        "AI Workflow",
      ],
      status: "Hackathon Build",
      role: "Research, UI/UX & Workflow Design",
      links: {
        github:
          "https://github.com/timus1424/party-pal-ai-website-64",
        demo: "https://party-pal-ai-website-64.lovable.app",
      },
      thumbnail:
        "https://raw.githubusercontent.com/timus1424/thumbnails/main/party_pal.png",
      details: {
        overview:
          "Developed during Devopia, a Dell-supported hackathon involving 120+ participants and 32 competing teams. The platform focused on improving event coordination and planning through AI-assisted workflows, usability-focused design, and streamlined user interaction.",
        features: [
          "AI-assisted event planning workflow",
          "User-focused event management interface",
          "Structured planning and coordination system",
          "Responsive and minimal UI design",
        ],
        challenges: [
          "Managing feature prioritization within hackathon deadlines",
          "Designing intuitive workflows for multiple event-planning scenarios",
          "Balancing usability with rapid prototyping constraints",
        ],
        learned: [
          "Learned rapid AI-assisted prototyping and workflow structuring",
          "Improved prompt engineering through iterative design refinement",
          "Understood the importance of usability-focused interface planning",
          "Experienced collaborative product development under time constraints",
        ],
      },
    },
    {
  title: 'Face Recognition Attendance Tracker',
  description: 'AI-assisted attendance management system designed to automate student attendance tracking through facial recognition workflows.',
  techStack: ['Python', 'OpenCV', 'Figma', 'AI Workflow', 'HTML'],
  status: 'Hackathon Build',
  role: 'Frontend, Workflow Design & Research',
  links: {
    github: 'https://github.com/timus1424/FaceAttendanceTracker',
    demo: 'https://pair-proto-76924666.figma.site/',
  },
  thumbnail: 'https://raw.githubusercontent.com/timus1424/FaceAttendanceTracker/main/Face%20Recognition%20Attendance%20Tracker/Face_Attendance.png',
  details: {
    overview: 'Developed during a hackathon organized by SIGIL (Special Interest Group and Industry Liaison), a constituent body under ACCESS (All Core Computer Engineering Student Society). The project focused on improving attendance management through AI-assisted workflows, facial recognition concepts, and usability-focused system design.',
    features: [
      'Face recognition-based attendance workflow',
      'Automated attendance tracking interface',
      'Achievement and gamification system',
      'Clean and responsive UI structure',
      'AI-assisted workflow prototyping and iteration',
    ],
    challenges: [
      'Designing scalable attendance workflows within limited hackathon time',
      'Structuring intuitive user interaction for attendance management',
      'Balancing feature implementation with usability and responsiveness',
    ],
    learned: [
      'Learned practical AI-assisted prototyping and iterative workflow refinement',
      'Improved understanding of prompt structuring for better design and development outputs',
      'Explored gamification techniques to improve user engagement',
      'Understood the importance of user-focused interface and workflow design',
    ],
  },
},
    
    {
  title: 'FinanceTracker – Personal Finance Management System',
  description: 'AI-assisted personal finance tracking prototype focused on budgeting, expense organization, and gamified financial habits.',
  techStack: ['Figma', 'HTML', 'Supabase', 'AI Workflow', 'UI/UX'],
  status: 'Prototype',
  role: 'Product Design, Workflow Structuring & UI/UX',
  links: {
    github: 'https://github.com/timus1424/FaceAttendanceTracker',
    demo: 'https://circus-north-87402779.figma.site/',
  },
  thumbnail: 'https://raw.githubusercontent.com/timus1424/thumbnails/main/1778977566782.jpeg',
  details: {
    overview: 'Designed as a personal finance tracking prototype inspired by modern budgeting applications like TrackWallet. The project explored AI-assisted workflows, gamification concepts, and usability-focused financial management systems while experimenting with scalable UI structuring and smart productivity features.',
    features: [
      'Expense and budget tracking workflows',
      'Achievement and gamification system inspired by Duolingo',
      'Voice-based expense input system',
      'Tax helper for tracking taxable expenses',
      'AI-assisted budget coach chatbot concept',
      'Responsive and minimal finance dashboard UI',
    ],
    challenges: [
      'Structuring scalable finance workflows while maintaining usability',
      'Understanding backend integration limitations with Supabase',
      'Designing engaging gamification systems without cluttering the interface',
    ],
    learned: [
      'Improved prompt engineering through structured AI-assisted development workflows',
      'Learned how prompt clarity and wording significantly affect AI-generated outputs',
      'Explored gamification techniques to improve user engagement and retention',
      'Understood the challenges involved in backend integration and scalable system planning',
    ],
  },
},
 /*   {
      title: "Campus Event Management System",
      description:
        "Full-stack platform for managing university events with registration tracking, scheduling, and real-time notifications.",
      techStack: [
        "Next.js",
        "PostgreSQL",
        "Tailwind",
        "Supabase",
      ],
      status: "In Development",
      role: "Full Stack",
      links: {
        github: "https://github.com/yourusername/project2",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      details: {
        overview:
          "Developed to streamline event coordination for SMITMUN and Sports Council activities. Addresses manual registration bottlenecks.",
        features: [
          "QR-based attendance tracking",
          "Automated email confirmations",
          "Admin dashboard with analytics",
          "Role-based access control",
        ],
        challenges: [
          "Handling concurrent registrations during peak traffic",
          "Designing intuitive admin workflows",
          "Ensuring data consistency across multiple event types",
        ],
        learned: [
          "Learned database optimization for concurrent operations",
          "Improved backend architecture planning",
          "Understood user-centered design for non-technical admins",
          "Explored real-time sync challenges with Supabase",
        ],
      },
    },
    {
      title: "Gesture-Controlled Presentation Tool",
      description:
        "OpenCV-based system that enables hands-free slide navigation using hand gesture recognition for accessibility.",
      techStack: ["Python", "OpenCV", "MediaPipe", "Flask"],
      status: "Research Project",
      role: "Research & Development",
      links: {
        github: "https://github.com/yourusername/project3",
        caseStudy: "https://research.example.com",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      details: {
        overview:
          "Academic research project exploring accessibility tools for speakers with mobility constraints. Presented at internal symposium.",
        features: [
          "Real-time hand landmark detection",
          "Configurable gesture mapping",
          "Low-latency slide transitions",
          "Multi-display support",
        ],
        challenges: [
          "Reducing false positives in gesture detection",
          "Optimizing for varying lighting conditions",
          "Balancing accuracy with processing speed",
        ],
        learned: [
          "Learned computer vision fundamentals and ML model tuning",
          "Improved understanding of real-time processing constraints",
          "Explored user testing methodologies for accessibility features",
          "Understood trade-offs between accuracy and responsiveness",
        ],
      },
    },
    {
      title: "Minimal Task Tracker CLI",
      description:
        "Lightweight command-line task manager with deadline tracking and minimal friction for technical users.",
      techStack: ["Go", "SQLite", "CLI Design"],
      status: "Hackathon Build",
      role: "Backend",
      links: {
        github: "https://github.com/yourusername/project4",
      },
      thumbnail:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      details: {
        overview:
          "Built during a 24-hour hackathon as a personal productivity tool. Designed for developers who prefer terminal-based workflows.",
        features: [
          "Natural language date parsing",
          "Priority-based sorting",
          "Cross-platform binary compilation",
          "Export to markdown/JSON",
        ],
        challenges: [
          "Designing an intuitive CLI interface without a GUI",
          "Implementing reliable local data persistence",
          "Ensuring cross-platform compatibility",
        ],
        learned: [
          "Learned Go fundamentals and CLI tooling patterns",
          "Improved understanding of user experience in terminal interfaces",
          "Explored build automation and distribution strategies",
          "Understood importance of documentation for CLI tools",
        ],
      },
    },*/
    
];

  const toggleProject = (index: number) => {
    setExpandedProject(
      expandedProject === index ? null : index,
    );
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full"
      >
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4 tracking-tight"
            style={{ fontWeight: 600 }}
          >
            Projects
          </h2>
          <p
            className="text-muted-foreground max-w-3xl"
            style={{ fontWeight: 400 }}
          >
            A collection of hackathon builds, research-driven
            systems, and experimental prototypes focused on
            usability, AI-assisted workflows, and practical
            problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              {/* Project Card */}
              <div className="border border-border/50 rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-300">
                {/* Thumbnail */}
                <div className="aspect-video w-full overflow-hidden bg-secondary">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Status & Role Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs border border-accent/30 text-accent rounded-md">
                      {project.status}
                    </span>
                    <span className="px-2 py-1 text-xs border border-border/50 text-muted-foreground rounded-md">
                      {project.role}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl text-foreground mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-muted-foreground text-sm mb-4 leading-relaxed"
                    style={{ fontWeight: 400 }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs border border-border/30 text-muted-foreground/90 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                        style={{ fontWeight: 400 }}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                        style={{ fontWeight: 400 }}
                      >
                        <ExternalLink size={16} />
                        <span>Demo</span>
                      </a>
                    )}
                    {project.links.caseStudy && (
                      <a
                        href={project.links.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                        style={{ fontWeight: 400 }}
                      >
                        <ExternalLink size={16} />
                        <span>Case Study</span>
                      </a>
                    )}
                    <button
                      onClick={() => toggleProject(index)}
                      className="ml-auto text-sm text-accent hover:text-accent/80 transition-colors duration-300"
                      style={{ fontWeight: 400 }}
                    >
                      {expandedProject === index
                        ? "Close"
                        : "Details"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedProject === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 border border-border/50 rounded-lg p-6 bg-background/50 backdrop-blur-sm"
                >
                  {/* Overview */}
                  <div className="mb-6">
                    <h4
                      className="text-sm text-accent mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      Overview
                    </h4>
                    <p
                      className="text-muted-foreground text-sm leading-relaxed"
                      style={{ fontWeight: 400 }}
                    >
                      {project.details.overview}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4
                      className="text-sm text-accent mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      Key Features
                    </h4>
                    <ul className="space-y-1.5">
                      {project.details.features.map(
                        (feature) => (
                          <li
                            key={feature}
                            className="text-muted-foreground text-sm flex items-start"
                            style={{ fontWeight: 400 }}
                          >
                            <span className="mr-2 mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div className="mb-6">
                    <h4
                      className="text-sm text-accent mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      Challenges Faced
                    </h4>
                    <ul className="space-y-1.5">
                      {project.details.challenges.map(
                        (challenge) => (
                          <li
                            key={challenge}
                            className="text-muted-foreground text-sm flex items-start"
                            style={{ fontWeight: 400 }}
                          >
                            <span className="mr-2 mt-2 w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                            <span>{challenge}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* What I Learned - IMPORTANT SECTION */}
                  <div>
                    <h4
                      className="text-sm text-foreground mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      What I Learned
                    </h4>
                    <ul className="space-y-1.5">
                      {project.details.learned.map(
                        (learning) => (
                          <li
                            key={learning}
                            className="text-muted-foreground text-sm flex items-start"
                            style={{ fontWeight: 400 }}
                          >
                            <span className="mr-2 mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                            <span>{learning}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}