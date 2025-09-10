"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Shield, 
  Heart, 
  Zap, 
  ArrowRight,
  Clock,
  DollarSign,
  Star,
  Check,
  Award,
  Droplets,
  Sun,
  Moon,
  Flame,
  Play,
  Users,
  Calendar,
  TrendingUp,
  Wand2,
  Gem,
  Crown
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  {
    id: "facial-treatments",
    icon: Sparkles,
    title: "Signature Facials",
    subtitle: "Deep cleansing & rejuvenation",
    duration: "60-90 mins",
  price: "From R120",
  image: "/aesthetic.jpg",
    popular: false,
    description: "Our signature facial treatments combine deep cleansing, exfoliation, and hydration to reveal your skin's natural glow. Each treatment is customized to your specific skin type and concerns.",
    benefits: [
      "Deep pore cleansing",
      "Removes dead skin cells",
      "Improves skin texture",
      "Reduces fine lines",
      "Enhances natural glow"
    ],
    includes: [
      "Skin analysis",
      "Double cleansing",
      "Exfoliation",
      "Steam treatment",
      "Extraction (if needed)",
      "Custom mask",
      "Moisturizing",
      "SPF protection"
    ]
  },
  {
    id: "anti-aging",
    icon: Shield,
    title: "Anti-Aging Treatments",
    subtitle: "Turn back time",
    duration: "75-120 mins",
  price: "From R180",
  image: "/neww.jpg",
    popular: true,
    description: "Advanced anti-aging treatments using cutting-edge technology and premium ingredients to reduce fine lines, improve elasticity, and restore youthful radiance.",
    benefits: [
      "Reduces fine lines & wrinkles",
      "Improves skin elasticity",
      "Firms and lifts",
      "Evens skin tone",
      "Stimulates collagen production"
    ],
    includes: [
      "Advanced skin analysis",
      "Microcurrent therapy",
      "LED light therapy",
      "Anti-aging serums",
      "Collagen mask",
      "Lifting massage",
      "Hydrating treatment"
    ]
  },
  {
    id: "acne-treatment",
    icon: Heart,
    title: "Acne Solutions",
    subtitle: "Clear, healthy skin",
    duration: "60 mins",
  price: "From R100",
  image: "/algae.jpg",
    popular: false,
    description: "Comprehensive acne treatment program designed to clear existing breakouts, prevent future blemishes, and restore skin health with gentle yet effective techniques.",
    benefits: [
      "Clears active breakouts",
      "Prevents future acne",
      "Reduces scarring",
      "Controls oil production",
      "Improves skin texture"
    ],
    includes: [
      "Acne assessment",
      "Deep cleansing",
      "Gentle extractions",
      "Antibacterial treatment",
      "Healing mask",
      "Oil-control serum",
      "Home care guidance"
    ]
  },
  {
    id: "hydrafacial",
    icon: Droplets,
    title: "HydraFacial MD",
    subtitle: "3-in-1 skin resurfacing",
    duration: "45 mins",
  price: "From R150",
  image: "/algae2.jpg",
    popular: true,
    description: "The revolutionary HydraFacial treatment that cleanses, extracts, and hydrates your skin simultaneously, delivering instant results with no downtime.",
    benefits: [
      "Instant results",
      "No downtime",
      "Suitable for all skin types",
      "Painless procedure",
      "Long-lasting hydration"
    ],
    includes: [
      "Cleanse & peel",
      "Extract & hydrate",
      "Fuse & protect",
      "LED light therapy",
      "Custom boosters",
      "Immediate results"
    ]
  },
  {
    id: "chemical-peels",
    icon: Sun,
    title: "Chemical Peels",
    subtitle: "Reveal new skin",
    duration: "30-60 mins",
  price: "From R80",
  image: "/algae-peel.jpg",
    popular: false,
    description: "Professional chemical peels to address various skin concerns including sun damage, hyperpigmentation, fine lines, and uneven texture.",
    benefits: [
      "Removes damaged skin layers",
      "Reduces hyperpigmentation",
      "Smooths fine lines",
      "Improves skin texture",
      "Evens skin tone"
    ],
    includes: [
      "Skin consultation",
      "Pre-peel preparation",
      "Chemical peel application",
      "Neutralization",
      "Soothing treatment",
      "Post-care instructions"
    ]
  },
  {
    id: "express-treatments",
    icon: Zap,
    title: "Express Treatments",
    subtitle: "Quick skin refresh",
    duration: "30 mins",
  price: "From R60",
  image: "/demaplanning.jpg",
    popular: false,
    description: "Perfect for busy schedules, our express treatments deliver targeted results in minimal time, ideal for maintaining healthy skin between full treatments.",
    benefits: [
      "Time-efficient",
      "Instant refresh",
      "No downtime",
      "Targeted results",
      "Perfect for maintenance"
    ],
    includes: [
      "Quick skin analysis",
      "Targeted cleansing",
      "Express mask",
      "Hydrating serum",
      "SPF protection"
    ]
  }
];

const additionalServices = [
  {
    icon: Moon,
    title: "Dermaplaning",
    description: "Gentle exfoliation removing dead skin and peach fuzz",
  price: "From R90"
  },
  {
    icon: Flame,
    title: "Microneedling",
    description: "Collagen induction therapy for smoother skin",
  price: "From R200"
  },
  {
    icon: Award,
    title: "Oxygen Infusion",
    description: "Pressurized oxygen with vitamins and minerals",
  price: "From R130"
  }
];

// Advanced hero animations and variants
const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const floatingVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 1
    }
  }
};

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 10 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Auto-rotate featured services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredServices = [
    { title: "HydraFacial MD", color: "from-blue-500 to-cyan-500", icon: Droplets },
    { title: "Anti-Aging", color: "from-purple-500 to-pink-500", icon: Crown },
    { title: "Signature Facials", color: "from-emerald-500 to-teal-500", icon: Sparkles }
  ];

  return (
    <div className="overflow-hidden pt-20">
      {/* Revolutionary Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12"
        onMouseMove={handleMouseMove}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 25%),
            radial-gradient(circle at 80% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 25%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 250, 0.95) 100%)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Geometric Shapes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-40"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0.5, 1, 0.8, 1],
                rotate: [0, 180, 360],
                x: [0, 100, -50, 0],
                y: [0, -80, 40, 0]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${15 + (i * 12) % 70}%`,
                width: `${20 + (i * 5) % 40}px`,
                height: `${20 + (i * 5) % 40}px`,
                background: `linear-gradient(45deg, 
                  hsl(${120 + i * 30}, 80%, 65%), 
                  hsl(${180 + i * 40}, 75%, 70%))`,
                boxShadow: `0 0 20px hsla(${120 + i * 30}, 80%, 65%, 0.3)`
              }}
            />
          ))}

          {/* Animated Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-15"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Dynamic Gradient Orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              top: '10%',
              left: '10%'
            }}
          />

          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl"
            animate={{
              x: [0, -150, 150, 0],
              y: [0, 120, -120, 0],
              scale: [0.8, 1.3, 0.9, 0.8]
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)',
              bottom: '15%',
              right: '15%'
            }}
          />
        </div>

        {/* Main Hero Content */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4"
        >
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Content - Enhanced Typography & Animations */}
            <div className="lg:col-span-7 space-y-8">
              {/* Floating Badge */}
              <motion.div
                variants={floatingVariants}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-200/50 mt-4"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)"
                }}
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  y: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY }
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </motion.div>
                <span className="text-sm font-medium text-emerald-800">
                  World-Class Skincare Excellence
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Crown className="w-4 h-4 text-yellow-500" />
                </motion.div>
              </motion.div>

              {/* Main Heading with Advanced Typography */}
              <motion.div variants={slideInVariants} className="space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.8] tracking-tight"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block text-emerald-600"
                  >
                    Premium
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="relative block text-emerald-500"
                  >
                    Skincare
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-teal-300/20 to-cyan-400/20 rounded-lg"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.5, duration: 1 }}
                      style={{ zIndex: -1 }}
                    />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="block text-gray-900"
                  >
                    Services
                  </motion.span>
                </motion.h1>

                {/* Animated Subtitle */}
                <motion.p 
                  className="text-2xl sm:text-3xl text-gray-600 font-light max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  Transform your skin with our{" "}
                  <motion.span
                    className="font-semibold text-emerald-600 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    scientifically-proven treatments
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 2, duration: 1 }}
                    />
                  </motion.span>
                  {" "}designed by expert aestheticians
                </motion.p>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                variants={slideInVariants}
                className="flex flex-wrap gap-8 py-4"
              >
                {[
                  { number: "500+", label: "Happy Clients", icon: Users },
                  { number: "98%", label: "Satisfaction", icon: TrendingUp },
                  { number: "15+", label: "Treatments", icon: Wand2 }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      y: -5
                    }}
                  >
                    <motion.div
                      className="p-2 bg-emerald-100 rounded-lg"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index }}
                    >
                      <stat.icon className="w-5 h-5 text-emerald-600" />
                    </motion.div>
                    <div>
                      <motion.div 
                        className="text-2xl font-bold text-gray-900"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                variants={slideInVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Button 
                      size="lg" 
                      className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-6 rounded-2xl shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                          repeat: Number.POSITIVE_INFINITY, 
                          duration: 3, 
                          ease: "easeInOut",
                          repeatDelay: 2 
                        }}
                      />
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Free Consultation
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 rounded-2xl backdrop-blur-sm bg-white/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      animate={{ scale: isVideoPlaying ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Play className="mr-2 h-5 w-5" />
                    </motion.div>
                    Watch Our Story
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Interactive 3D Service Showcase */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <motion.div
                variants={slideInVariants}
                className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              >
                {/* Main Interactive Card */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    rotateY: 5
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Service Carousel */}
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 md:p-6 border-b border-white/20">
                      <div className="flex items-center justify-between">
                        <motion.h3 
                          className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900"
                          key={currentServiceIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          Featured Services
                        </motion.h3>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Gem className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Animated Service Display */}
                    <div className="flex-1 p-4 md:p-6 relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentServiceIndex}
                          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="text-center space-y-6"
                        >
                          {/* Service Icon with Dynamic Background */}
                          <motion.div
                            className="relative mx-auto w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${featuredServices[currentServiceIndex].color})`
                            }}
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut"
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              animate={{
                                boxShadow: [
                                  "0 0 20px rgba(16, 185, 129, 0.3)",
                                  "0 0 40px rgba(16, 185, 129, 0.6)",
                                  "0 0 20px rgba(16, 185, 129, 0.3)"
                                ]
                              }}
                              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            />
                            {React.createElement(featuredServices[currentServiceIndex].icon, { 
                              className: "w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white drop-shadow-lg" 
                            })}
                            
                            {/* Orbiting Elements */}
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-white/80 rounded-full"
                                animate={{
                                  rotate: 360,
                                  scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }
                                }}
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transformOrigin: `${45 + i * 15}px 0px`
                                }}
                              />
                            ))}
                          </motion.div>

                          {/* Service Title with Typewriter Effect */}
                          <motion.h4 
                            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {featuredServices[currentServiceIndex].title}
                          </motion.h4>

                          {/* Animated Features */}
                          <div className="space-y-2 md:space-y-3">
                            {["Professional Grade", "Instant Results", "No Downtime"].map((feature, i) => (
                              <motion.div
                                key={feature}
                                className="flex items-center justify-center space-x-2 text-gray-700"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                                >
                                  <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                                </motion.div>
                                <span className="text-sm md:text-base font-medium">{feature}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Price with Animation */}
                          <motion.div
                            className="text-lg md:text-xl lg:text-2xl font-bold text-emerald-600"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            From R{120 + currentServiceIndex * 30}
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Service Navigation Dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {featuredServices.map((_, index) => (
                          <motion.button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentServiceIndex ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentServiceIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements Around Card */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-60"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3
                      }}
                      style={{
                        top: `${20 + i * 15}%`,
                        right: i % 2 === 0 ? '-10px' : 'auto',
                        left: i % 2 === 1 ? '-10px' : 'auto'
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center space-y-2 text-gray-500"
          >
            <span className="text-sm font-medium">Discover More</span>
            <motion.div
              className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
              whileHover={{ borderColor: "#10b981" }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Services - Enhanced with Advanced Animations */}
      <section className="section-padding relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Enhanced Header with Floating Elements */}
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              
              <motion.h2 
                className="text-5xl md:text-7xl font-black text-gray-900 mb-8 relative"
                style={{
                  background: 'linear-gradient(135deg, #1f2937 0%, #059669 50%, #1f2937 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              >
                Our Signature
                <br />
                <motion.span
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  Treatments
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                  />
                </motion.span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Each treatment is performed by our{" "}
              <motion.span
                className="font-semibold text-emerald-600 relative"
                whileHover={{ scale: 1.05 }}
              >
                licensed aestheticians
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.span>
              {" "}using premium products and advanced techniques.
            </motion.p>

            {/* Treatment Categories */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {["Anti-Aging", "Hydration", "Acne Solutions", "Brightening", "Rejuvenation"].map((category, index) => (
                <motion.div
                  key={category}
                  className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100 text-gray-700 font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    borderColor: "rgba(16, 185, 129, 0.3)"
                  }}
                >
                  {category}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, rotateX: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group perspective-1000"
                whileHover={{ 
                  y: -8,
                  rotateY: 3,
                  scale: 1.02
                }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group-hover:bg-white">
                  {/* Animated Card Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  {/* Floating Sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-60"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        scale: [1, 1.5, 0.5, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5
                      }}
                      style={{
                        top: `${20 + i * 25}%`,
                        right: `${5 + i * 3}px`
                      }}
                    />
                  ))}

                  <CardContent className="p-0 relative z-10">
                    {/* Enhanced Service Image with 3D Effects */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50/30 group-hover:from-emerald-50/50 transition-all duration-500">
                      <div className="aspect-[5/3] relative">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ 
                            scale: 1.1,
                            filter: "brightness(1.1) contrast(1.05)"
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        
                        {/* Dynamic Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={false}
                        />

                        {/* Animated Popular Badge */}
                        {service.popular && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: index * 0.1 + 0.5, 
                              type: "spring", 
                              stiffness: 200 
                            }}
                            className="absolute top-4 right-4"
                          >
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg relative overflow-hidden">
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ 
                                  repeat: Number.POSITIVE_INFINITY, 
                                  duration: 2, 
                                  repeatDelay: 3 
                                }}
                              />
                              <motion.span
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                ⭐ Most Popular
                              </motion.span>
                            </Badge>
                          </motion.div>
                        )}
                        
                        {/* Enhanced Info Overlay */}
                        <motion.div 
                          className="absolute bottom-4 left-4 right-4"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full text-white"
                                whileHover={{ 
                                  scale: 1.1,
                                  backgroundColor: "rgba(0,0,0,0.5)"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">{service.duration}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center bg-emerald-500/80 backdrop-blur-sm px-3 py-2 rounded-full text-white"
                                whileHover={{ 
                                  scale: 1.1,
                                  backgroundColor: "rgba(16, 185, 129, 0.9)"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <DollarSign className="w-4 h-4 mr-2" />
                                <span className="text-sm font-bold">{service.price}</span>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Service Icon Overlay */}
                        <motion.div
                          className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {React.createElement(service.icon, { 
                            className: "w-6 h-6 text-emerald-600" 
                          })}
                        </motion.div>
                      </div>
                    </div>

                    {/* Enhanced Service Content with Staggered Animations */}
                    <div className="p-5 space-y-4">
                      {/* Title Section with Hover Effects */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        whileHover={{ x: 5 }}
                        className="relative"
                      >
                        <motion.h3 
                          className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {service.title}
                          <motion.div
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-500"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                          />
                        </motion.h3>
                        <motion.p 
                          className="text-emerald-600 font-medium text-sm"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {service.subtitle}
                        </motion.p>
                      </motion.div>

                      {/* Description with Typewriter Effect */}
                      <motion.p 
                        className="text-gray-600 leading-relaxed text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ color: "#374151" }}
                      >
                        {service.description}
                      </motion.p>

                      {/* Enhanced Benefits with Animated Icons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <motion.h4 
                          className="font-semibold text-gray-900 mb-2 text-sm flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="mr-2"
                          >
                            ✨
                          </motion.div>
                          Key Benefits:
                        </motion.h4>
                        <div className="grid grid-cols-1 gap-1">
                          {service.benefits.slice(0, 2).map((benefit, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-center text-gray-700 group/benefit cursor-pointer p-1 rounded-lg hover:bg-emerald-50/50 transition-all duration-300"
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 + i * 0.1 }}
                              whileHover={{ x: 5, scale: 1.01 }}
                            >
                              <motion.div
                                animate={{ 
                                  rotate: [0, 360],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                  rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 },
                                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }
                                }}
                              >
                                <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 group-hover/benefit:text-emerald-600" />
                              </motion.div>
                              <span className="text-sm group-hover/benefit:text-gray-900 transition-colors">
                                {benefit}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Enhanced What's Included with Interactive Elements */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        <motion.h4 
                          className="font-semibold text-gray-900 mb-2 text-sm flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 20, -20, 0],
                              scale: [1, 1.05, 1] 
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="mr-1 text-xs"
                          >
                            💎
                          </motion.div>
                          Treatment Includes:
                        </motion.h4>
                        <div className="grid grid-cols-1 gap-1">
                          {service.includes.slice(0, 3).map((item, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-center text-xs text-gray-600 group/item cursor-pointer p-1 rounded-lg hover:bg-teal-50/50 transition-all duration-300"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + 0.7 + i * 0.1,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.02, x: 3 }}
                            >
                              <motion.div
                                animate={{ 
                                  rotate: [0, 360],
                                  scale: [1, 1.15, 1]
                                }}
                                transition={{ 
                                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.7 },
                                  scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.4 }
                                }}
                              >
                                <Star className="w-3 h-3 text-teal-500 mr-2 flex-shrink-0 group-hover/item:text-teal-600" />
                              </motion.div>
                              <span className="group-hover/item:text-gray-900 transition-all">
                                {item}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Enhanced CTA Button with Advanced Animations */}
                      <motion.div 
                        className="pt-3 border-t border-gray-100/50"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                      >
                        <Link href="/contact">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="relative overflow-hidden rounded-lg group"
                          >
                            <Button className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white py-2 px-4 text-sm shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                              {/* Animated Background Shine */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ 
                                  repeat: Number.POSITIVE_INFINITY, 
                                  duration: 3,
                                  repeatDelay: 2,
                                  ease: "easeInOut"
                                }}
                              />
                              
                              <motion.span
                                className="flex items-center justify-center relative z-10 font-medium"
                                whileHover={{ x: -3 }}
                                transition={{ duration: 0.2 }}
                              >
                                Book Treatment
                              </motion.span>
                              
                              <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="relative z-10"
                              >
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Additional Treatments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your skincare routine with our specialized add-on treatments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <service.icon className="w-full h-full text-emerald-500" />
                      <div className="absolute inset-0 rounded-full bg-emerald-100 -z-10"></div>
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <p className="text-emerald-600 font-semibold text-lg">
                      {service.price}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Treatment Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From consultation to aftercare, we ensure you receive the best possible experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Detailed skin analysis and treatment planning"
              },
              {
                step: "02", 
                title: "Preparation",
                description: "Skin preparation and pre-treatment care"
              },
              {
                step: "03",
                title: "Treatment",
                description: "Professional treatment by licensed aestheticians"
              },
              {
                step: "04",
                title: "Aftercare",
                description: "Post-treatment care and home routine guidance"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-emerald-600">{step.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-emerald-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Ready to Transform Your Skin?
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Book your personalized consultation today and discover which treatments 
              are perfect for your skin goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-12 py-6 rounded-full group">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-12 py-6 rounded-full">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
