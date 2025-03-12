
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "../hooks/use-toast";
import {
  CheckCircle2,
  Rocket,
  Clock,
  Users,
  Brain,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  Clock3,
  Download,
  Sparkles,
  Zap,
  Bot,
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isSticky, setIsSticky] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [seconds, setSeconds] = useState(172800); // 48 hours in seconds
  const [emailInput, setEmailInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // FAQ data
  const faqItems = [
    {
      question: "What format is the book available in?",
      answer: "The book is available in both Kindle (digital) and paperback formats. The Kindle version offers instant access, while the paperback provides a physical copy you can highlight and reference.",
    },
    {
      question: "How will this book help me as a Project Manager?",
      answer: "This book provides carefully crafted prompts that will help you streamline workflows, generate project documentation, solve complex problems, and leverage AI to enhance your productivity as a PM.",
    },
    {
      question: "Is this only for experienced Project Managers?",
      answer: "Not at all! While experienced PMs will benefit from efficiency gains, new project managers will find these prompts invaluable for learning best practices and handling challenging situations.",
    },
    {
      question: "Can I get a sample before purchasing?",
      answer: "Yes! You can download a free sample chapter by providing your email in the form above. This will give you a taste of the valuable content inside.",
    },
    {
      question: "How often is the content updated?",
      answer: "The book is regularly updated with new prompts and techniques as LLM technology evolves. Purchasers receive free updates to ensure the content remains current and effective.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Project Manager, Tech Innovations",
      text: "These prompts have transformed how I handle project documentation. What used to take hours now takes minutes, and the quality is consistently excellent.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Agile Coach & PM",
      text: "As someone who manages multiple teams, these prompts have become my secret weapon. I've reduced meeting time by 40% by using the right prompts for preparation and follow-up.",
      stars: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Digital Transformation Lead",
      text: "I was skeptical about AI for project management, but these carefully crafted prompts have convinced me. They're like having an expert assistant available 24/7.",
      stars: 4,
    },
  ];

  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > headerRef.current.offsetHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Countdown timer
  useEffect(() => {
    // Check localStorage for saved timer
    const savedSeconds = localStorage.getItem("countdownSeconds");
    if (savedSeconds) {
      setSeconds(parseInt(savedSeconds, 10));
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds > 0 ? prevSeconds - 1 : 0;
        localStorage.setItem("countdownSeconds", newSeconds.toString());
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time for display
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const time = formatTime(seconds);

  // Handle email submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && emailInput.includes("@")) {
      // In a real implementation, this would send the email to a server
      toast({
        title: "Success!",
        description: "Your free chapter is on its way to your inbox.",
      });
      setEmailInput("");
      setIsModalOpen(false);
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  // Add UTM parameters to purchase link
  const getPurchaseLink = () => {
    const baseUrl = "https://selar.com/l53187";
    const utmParams = new URLSearchParams({
      utm_source: "landing_page",
      utm_medium: "web",
      utm_campaign: "book_launch",
    });
    return `${baseUrl}?${utmParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky CTA */}
      {isSticky && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 py-3 px-4 md:px-6 flex items-center justify-between"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="hidden md:flex items-center space-x-2">
            <div className="timer-digits font-bold text-lg">
              {time.hours}:{time.minutes}:{time.seconds}
            </div>
            <p className="text-sm font-medium">left at current price</p>
          </div>
          <div className="flex-1 md:flex-none flex justify-end md:justify-start">
            <a 
              href={getPurchaseLink()}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition hover:scale-105 cta-button"
            >
              <span className="flex items-center">
                Get the Book <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </a>
          </div>
          <div className="hidden md:block text-sm font-medium text-gray-600">
            <span className="count-animation font-bold text-blue-600">500</span> PMs Downloaded
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="sticky-nav bg-white border-b shadow-sm" ref={headerRef}>
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-900">LLM Prompts for PMs</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#faq" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
          </nav>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hidden md:block"
          >
            Get Free Chapter
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="space-y-6 max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full">Project Management + AI</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
              Transform Your Project Management with AI Prompts
            </h1>
            <p className="text-lg text-gray-700">
              A curated collection of 100+ powerful prompts designed to help Project Managers automate documentation, solve complex problems, and deliver projects more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href={getPurchaseLink()}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 cta-button text-center"
              >
                Get the Book
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border border-blue-200 shadow-sm hover:shadow transition text-center"
              >
                <div className="flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  Free Chapter
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>
                <span className="count-animation font-bold text-blue-600">500</span>+ Project Managers Downloaded
              </span>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative floating">
              <img
                src="https://postimg.cc/SJKp62qS"
                alt="LLM Prompts for Project Managers Book Cover"
                className="max-w-xs md:max-w-md rounded-2xl mx-auto shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -top-6 -right-6 bg-white text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg border border-gray-200 transform rotate-12">
                <div className="flex items-center">
                  <Clock3 className="mr-1 h-4 w-4 text-blue-600" />
                  <div>
                    <span className="block text-sm">Price increases in</span>
                    <span className="timer-digits text-lg">
                      {time.hours}:{time.minutes}:{time.seconds}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white bg-mesh">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full mb-4">Your AI Advantage</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Streamline Your Project Management Workflow
            </h2>
            <p className="text-lg text-gray-700">
              Stop wasting time on manual documentation and repetitive tasks. Our scientifically designed prompts help you leverage AI to do the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Boost Efficiency</h3>
              <p className="text-gray-700">
                Generate project documentation, reports, and emails in seconds instead of hours. Focus on strategy, not typing.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Problem-Solving</h3>
              <p className="text-gray-700">
                Leverage AI to analyze complex project challenges, identify risks, and generate creative solutions on demand.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-700">
                Reclaim hours every week by automating routine tasks. Our prompts are optimized for maximum time savings.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-700">
                Facilitate better communication and collaboration with AI-generated agendas, summaries, and action items.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Mastery</h3>
              <p className="text-gray-700">
                Quickly become an AI expert with our carefully crafted prompts that deliver consistent, high-quality results.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consistent Quality</h3>
              <p className="text-gray-700">
                Produce professional-grade deliverables every time with prompts tested and refined by experienced PMs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full">Who Is This For?</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
                Perfect for Project Managers at Every Level
              </h2>
              <p className="text-lg text-gray-700">
                Whether you're managing Agile sprints, traditional waterfall projects, or hybrid methodologies, these prompts will transform how you work.
              </p>
              
              <ul className="space-y-4 checkmark-list">
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mr-2" />
                  <span>
                    <strong className="text-gray-900">Scrum Masters & Agile PMs</strong>
                    <p className="text-gray-700">Create sprint backlogs, retrospective summaries, and impediment analysis in seconds.</p>
                  </span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mr-2" />
                  <span>
                    <strong className="text-gray-900">Technical Project Managers</strong>
                    <p className="text-gray-700">Generate technical documentation, risk assessments, and dependency maps with ease.</p>
                  </span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mr-2" />
                  <span>
                    <strong className="text-gray-900">PMO Leaders</strong>
                    <p className="text-gray-700">Create project governance templates, status reports, and executive summaries that impress leadership.</p>
                  </span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mr-2" />
                  <span>
                    <strong className="text-gray-900">New Project Managers</strong>
                    <p className="text-gray-700">Accelerate your learning curve with prompts that instantly provide best-practice documents and approaches.</p>
                  </span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="relative p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl glass-card">
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                  Inside the Book
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Prompts You'll Get</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium">Risk Analysis Generator</p>
                      <p className="text-sm text-gray-600">Instantly identify potential project risks, their impact, and mitigation strategies.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium">Stakeholder Communication Wizard</p>
                      <p className="text-sm text-gray-600">Create perfectly tailored communications for different stakeholder groups.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium">Project Charter Creator</p>
                      <p className="text-sm text-gray-600">Generate comprehensive project charters with just a few key inputs.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium">Meeting Productivity Amplifier</p>
                      <p className="text-sm text-gray-600">Create agendas, talking points, and follow-up summaries in seconds.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium">Gantt Chart Logic Builder</p>
                      <p className="text-sm text-gray-600">Determine the optimal sequence of tasks and dependencies for your project.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-center">
                      <Download className="mr-2 h-4 w-4" />
                      Get Free Sample Chapter
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://postimg.cc/ftv6XZrS" 
                alt="Author" 
                className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-6 order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full">About the Author</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
                From Overwhelming Tasks to PM Efficiency
              </h2>
              <p className="text-gray-700 text-lg">
                As a seasoned Project Manager with over 10 years of experience across Fortune 500 companies, I've felt the pressure of impossible deadlines and overwhelming workloads.
              </p>
              <p className="text-gray-700 text-lg">
                When I discovered how to effectively use LLMs for project management, my productivity doubled. I've compiled all my best prompts, refined through hundreds of projects, into this comprehensive guide.
              </p>
              <p className="text-gray-700 text-lg">
                My mission is to help fellow PMs reclaim their time, reduce stress, and deliver exceptional results with less effort.
              </p>
              <div className="pt-4">
                <a 
                  href={getPurchaseLink()}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 cta-button"
                >
                  Get the Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gray-50" ref={testimonialRef}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full mb-4">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Project Managers Are Saying
            </h2>
            <p className="text-lg text-gray-700">
              Don't just take our word for it. Here's how these prompts have transformed project management for professionals around the world.
            </p>
          </div>

          <div className="relative h-[320px] md:h-[260px]">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className={`testimonial-card absolute w-full bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100 ${
                  index === activeTestimonial ? "active" : "inactive"
                }`}
                initial={false}
                animate={index === activeTestimonial ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 font-medium text-sm py-1 px-3 rounded-full mb-4">Questions Answered</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Everything you need to know about the book and how it will help you transform your project management approach.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="faq-item mb-4 border rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-700 bg-gray-50">
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Transform Your Project Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join over 500 Project Managers who are already leveraging AI to work smarter, deliver faster, and impress stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <a 
                href={getPurchaseLink()}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 text-lg"
              >
                Get the Book Now
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 text-lg"
              >
                Download Free Chapter
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-2 text-blue-100">
              <Clock3 className="h-5 w-5" />
              <p>
                Limited-time price: <span className="timer-digits text-white font-bold">
                  {time.hours}:{time.minutes}:{time.seconds}
                </span> remaining
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">LLM Prompts for Project Managers</h3>
              <p className="mb-4">Transforming project management with the power of AI.</p>
              <p className="text-sm">© 2023 All Rights Reserved</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="mb-2">Have questions? Reach out to us.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Get Free Chapter
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Email Capture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Get Your Free Chapter</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Enter your email to receive a sample chapter with 10 powerful prompts you can start using right away.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 cta-button"
              >
                <div className="flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  Send Me the Free Chapter
                </div>
              </button>
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy and will never share your email.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
