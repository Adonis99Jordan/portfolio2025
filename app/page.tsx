"use client";


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ComputerIcon,
  TimerIcon,
  MessageCircleIcon,
  FileCode2Icon,
} from "lucide-react";
import Image from "next/image";
// import { image } from "framer-motion/client";


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "Future Focus",
        "pricing",
        "learning",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    // { id: "pricing", label: "Services" },
    // { id: "learning", label: "Learning" },
    { id: "contact", label: "Contact" },
  ];


  const skills = [
    { name: "Backend Development", level: 90 },
    { name: "Python", level: 85 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB and SQL", level: 82 },
    { name: "Algorithms & Data Structures", level: 85 },
    { name: "HTML, CSS and JavaScript", level: 90 },
    { name: "API Interactions", level: 88 },
    { name: "Frontend Frameworks", level: 92 },
  ];


  // const pricingPlans = [
  //   {
  //     icon: Briefcase,
  //     title: "FAANG Career Prep",
  //     price: "$299",
  //     duration: "per session",
  //     features: [
  //       "1-on-1 technical interview coaching",
  //       "STEM-focused career strategy",
  //       "Resume and portfolio optimization",
  //       "Mock interviews with real FAANG questions",
  //     ],
  //     cta: "Accelerate Your Career",
  //   },
  //   {
  //     icon: Smartphone,
  //     title: "Application Development",
  //     price: "Custom",
  //     duration: "project-based",
  //     features: [
  //       "Full-stack app development",
  //       "Mobile and web app expertise",
  //       "UI/UX design consultation",
  //       "Performance optimization",
  //     ],
  //     cta: "Build Your App",
  //   },
  //   {
  //     icon: Cpu,
  //     title: "AI Optimization",
  //     price: "$499",
  //     duration: "per consultation",
  //     features: [
  //       "AI model fine-tuning",
  //       "Machine learning pipeline optimization",
  //       "AI integration strategies",
  //       "Performance benchmarking",
  //     ],
  //     cta: "Enhance Your AI",
  //   },
  //   {
  //     icon: Zap,
  //     title: "Process Automation",
  //     price: "Custom",
  //     duration: "project-based",
  //     features: [
  //       "Internal tool development",
  //       "Workflow automation",
  //       "Custom software solutions",
  //       "Integration with existing systems",
  //     ],
  //     cta: "Streamline Your Processes",
  //   },
  // ];


  const CircularNodeGraph = () => {
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [debugInfo, setDebugInfo] = useState("");


    useEffect(() => {
      const updateDimensions = () => {
        const width = Math.min(800, window.innerWidth - 40);
        const height = Math.min(600, window.innerHeight - 200);
        setDimensions({ width, height });
        setDebugInfo(
          `Window: ${window.innerWidth}x${window.innerHeight}, Graph: ${width}x${height}`
        );
      };


      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    const nodePositions = skills.map((_, index) => {
      const angle = (index / skills.length) * 2 * Math.PI;
      const x =
        dimensions.width / 2 + dimensions.width * 0.35 * Math.cos(angle);
      const y =
        dimensions.height / 2 + dimensions.height * 0.35 * Math.sin(angle);
      return { x, y };
    });


    return (
      <div className="relative w-full h-full" style={{ minHeight: "600px" }}>
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {skills.map((skill, index) => {
            const { x, y } = nodePositions[index];


            return (
              <g key={index}>
                {skills.map((_, i) => {
                  if (i !== index) {
                    const { x: x2, y: y2 } = nodePositions[i];
                    return (
                      <motion.line
                        key={`${index}-${i}`}
                        x1={x}
                        y1={y}
                        x2={x2}
                        y2={y2}
                        stroke="#64ffda"
                        strokeWidth="1"
                        opacity="0.5"
                        animate={{
                          x1: [x, x + 5, x - 5, x],
                          y1: [y, y - 5, y + 5, y],
                          x2: [x2, x2 - 5, x2 + 5, x2],
                          y2: [y2, y2 + 5, y2 - 5, y2],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    );
                  }
                  return null;
                })}
                <circle
                  cx={x}
                  cy={y}
                  r={10 + skill.level / 10}
                  fill="#64ffda"
                />
                <text
                  x={x}
                  y={y + 25}
                  textAnchor="middle"
                  fill="#ccd6f6"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 text-xs text-[#64ffda]">
          {debugInfo}
        </div>
      </div>
    );
  };


  return (
    <div className="bg-[#0a192f] text-[#8892b0] min-h-screen font-sans">
      <header className="fixed w-full z-50 bg-[#1a1a1a] text-[#d3d3d3] backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-[#64ffda] font-bold text-xl flex items-center">
            <Image
              src="/images/coffeelaptop.jpg"
              alt="Coffee Laptop"
              width={128}
              height={50}
              className="rounded-full object-cover mr-2 transiton-transform duration-300 hover:scale-110"
              style={{ border: '2px solid #64ffda' }}
            />
            Software Engineer, Data Scientist
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm hover:text-[#64ffda] transition-colors ${activeSection === item.id ? "text-[#64ffda]" : ""
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-[#64ffda]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </div>
      </header>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 right-0 w-64 bg-[#112240] z-50 p-6"
          >
            <button
              className="absolute top-4 right-4 text-[#64ffda]"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
            <nav className="flex flex-col space-y-4 mt-12">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm hover:text-[#64ffda] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>


      <main>
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">
                Software Engineer, Data Scientist
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Software engineer and data scientist with a bootcamp background, specializing in efficient software solutions and data-driven insights.
              </p>
              <a
                href="#projects"
                className="inline-flex items-center bg-transparent hover:bg-[#64ffda]/10 text-[#64ffda] font-semibold py-2 px-4 border border-[#64ffda] rounded transition-colors mb-4"
              >
                View Projects <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* <div className="w-full my-4">
          <Image
            src="/images/lovecoding.jpg"
            alt="Descriptive Alt Text"
            layout="responsive"
            width={1920}
            height={500}
            className="object-cover"
          />
        </div> */}

        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                About Me
              </h2>
              <p className="text-lg text-[#8892b0] mb-4">
                Hi, I&apos;m Adonis Zepeda.
              </p>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-6 relative w-64 h-64 mx-auto md:mx-0">
                    <Image
                      src="/images/coding.jpg"
                      alt=""
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="mb-4">
                    I&apos;m a motivated software engineer with a background in
                    coding and a passion for problem-solving. Inspired by the power
                    of technology to create real-world impact, I pursued a coding
                    bootcamp to build the skills needed to develop meaningful solutions.
                  </p>
                  <p className="mb-4">
                    Proficient in HTML, CSS, JavaScript, React, Node.js, Express.js,
                    MongoDB, SQL, and Python. Experienced in backend development,
                    frontend frameworks, algorithms, data structures, and API interactions.
                  </p>
                  <p>
                    Skilled in data analysis, visualization, and machine learning using Python.
                    Focused on uncovering patterns in data and using insights to solve
                    problems and drive innovation.
                  </p>
                </div>
                <div className="bg-[#112240] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    Specialized Skills
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {[
                      "Frontend Development",
                      "Backend Development",
                      "Data Analysis",
                      "Data Visualization",
                      "Machine Learning",
                      "API Development",
                      "Database Management",
                      "Algorithm Design",
                    ].map((skill) => (
                      <li key={skill} className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="Future Focus" className="py-20 bg-[#1a1a1a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Future Focus
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#0a192f] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    Inspired by Innovation
                  </h3>
                  <p className="mb-4">
                    The rapid advancements in technology have always fascinated me, especially the way they continue to shape our world. Web development, in particular, stood out as a powerful force driving communication, business, and innovation. Witnessing its impact inspired me to explore this field and become a part of that transformation.
                  </p>
                  <p>
                    I’m drawn to the endless possibilities of creating dynamic, user-focused solutions that make a tangible difference in people’s lives. This passion for innovation motivated me to pursue a career in software engineering, where I can contribute to building a more connected and accessible digital future.
                  </p>
                </div>
                <div className="bg-[#0a192f] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    Capabilities Overview
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>
                        Career development in software engineering and AI
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>
                        Technical skill enhancement in various programming
                        languages
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>Project planning and execution strategies</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>Interview preparation for tech roles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        <section id="skills" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Technical Proficiencies
              </h2>
              <div className="flex justify-center items-center">
                <div
                  className="w-full max-w-6xl"
                  style={{ paddingBottom: "10%" }}
                >
                  <CircularNodeGraph />
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: ComputerIcon,
                    title: "Personal Portfolio Websites",
                    description:
                      "A simple, responsive website built with HTML, CSS, and JavaScript. It includes sections for projects, contact information, and an about page. JavaScript adds interactive elements like smooth scrolling and dynamic content, making it a great starter project for new developers.",
                  },
                  {
                    icon: TimerIcon,
                    title: "Employee Tracker Application",
                    description:
                      "A command-line application built with Node.js, Inquirer, and PostgreSQL to manage company employees. It allows users to add, view, update, and delete employee records in a structured database. This project showcases my backend development skills, database management, and ability to create efficient CLI applications.",
                  },
                  {
                    icon: MessageCircleIcon,
                    title: "Social Network API",
                    description:
                      "A RESTful API built from scratch for a social network web application. Users can share thoughts, react to friends’ posts, and manage friend lists. Built with Express.js for routing, a MongoDB database, and Mongoose ODM, this project highlights my ability to design and implement scalable backend systems.",
                  },
                  {
                    icon: FileCode2Icon,
                    title: "",
                    description:
                      "",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#112240] p-6 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <project.icon className="h-8 w-8 text-[#64ffda] mb-4" />
                    <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                      {project.title}
                    </h3>
                    <p className="mb-4">{project.description}</p>
                    <a href="#" className="text-[#64ffda] hover:underline">
                      Learn more
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>





        {/* <section id="pricing" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Specialized Services
              </h2>
              <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
                Elevate your tech career or business with tailored services
                designed to meet your specific needs and goals.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#112240] p-6 rounded-lg flex flex-col justify-between"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <plan.icon className="h-12 w-12 text-[#64ffda] mb-4" />
                      <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-2xl font-bold text-[#64ffda] mb-2">
                        {plan.price}
                      </p>
                      <p className="text-sm mb-4">{plan.duration}</p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center justify-center bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#64ffda]/90 transition-colors w-full"
                    >
                      {plan.cta}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section> */}


        {/* <section id="learning" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Continuous Learning
              </h2>
              <p className="mb-8 text-lg">
                I&apos;m a firm believer in lifelong learning. Currently,
                I&apos;m focusing on expanding my knowledge in:
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Code,
                    title: "Advanced Algorithms",
                    description:
                      "Deepening understanding of complex algorithms and their applications",
                  },
                  {
                    icon: Shield,
                    title: "Cutting-edge Cybersecurity",
                    description:
                      "Staying ahead of the latest threats and protection measures",
                  },
                  {
                    icon: Book,
                    title: "AI Research",
                    description:
                      "Exploring the newest developments in artificial intelligence and machine learning",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#0a192f] p-6 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <item.icon className="h-12 w-12 text-[#64ffda] mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-center text-lg">
                Beyond tech, I&apos;m passionate about fitness, reading, and
                always seeking new challenges to broaden my horizons.
              </p>
            </motion.div>
          </div>
        </section> */}


        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Get in Touch
              </h2>
              <p className="mb-8 max-w-2xl">
                I am always open to connecting with fellow developers, potential employers, and anyone passionate about technology. Whether you have a project idea, a job opportunity, or simply want to discuss tech trends, I would love to hear from you. Feel free to reach out to me via email or connect with me on LinkedIn. Let&apos;s collaborate and build something great together!
              </p>
              <a
                href="mailto:AdonisJZepeda@gmail.com"
                className="inline-flex items-center bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#64ffda]/90 transition-colors"
              >
                Reach Out <Mail className="ml-2 h-4 w-4" />
              </a>
              <div className="mt-12 flex space-x-6">
                <a
                  href="https://github.com/Adonis99Jordan"
                  className="text-[#8892b0] hover:text-[#64ffda]"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/adonis-zepeda-ba13a1343?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B1p0m5mgBREqL%2B60yPDXYxg%3D%3D"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>


      <footer className="bg-[#0a192f] py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Designed & Built by Adonis Zepeda - Software Engineer
          </p>
        </div>
      </footer>
    </div>
  );
}



