"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  Heart,
  Award
} from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const homeServices = [
  {
    id: "facial-treatments",
    title: "Signature Facials",
    subtitle: "Deep cleansing & rejuvenation",
    duration: "60-90 mins",
  price: "From R120",
    popular: false,
    image: "/aesthetic.jpg",
    description: "Customized facials combining cleansing, exfoliation and hydration for a lasting glow."
  },
  {
    id: "anti-aging",
    title: "Anti-Aging Treatments",
    subtitle: "Turn back time",
    duration: "75-120 mins",
  price: "From R180",
    popular: true,
    image: "/neww.jpg",
    description: "Advanced techniques to smooth fine lines, lift and firm, and boost collagen."
  },
  {
    id: "hydrafacial",
    title: "HydraFacial MD",
    subtitle: "3-in-1 skin resurfacing",
    duration: "45 mins",
  price: "From R150",
    popular: true,
    image: "/algae2.jpg",
    description: "Cleanse, extract and hydrate simultaneously for instant results with no downtime."
  },
  {
    id: "chemical-peels",
    title: "Chemical Peels",
    subtitle: "Reveal new skin",
    duration: "30-60 mins",
  price: "From R80",
    popular: false,
    image: "/algae-peel.jpg",
    description: "Target sun damage, discoloration and texture for refined, brighter skin."
  }
];

// (removed unused testimonials array)

// Media used in the "Amazing Results" section — mix of real images and videos from /public
const resultsMedia: Array<
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string }
> = [
  { type: "image", src: "/aesthetic.jpg", alt: "Glowing skin facial results" },
  { type: "video", src: "/video.mp4", poster: "/algae.jpg", alt: "Hydrafacial results video" },
  { type: "image", src: "/algae-peel.jpg", alt: "Chemical peel before and after" },
  { type: "video", src: "/video2.mp4", poster: "/algae2.jpg", alt: "Treatment time-lapse" },
  { type: "image", src: "/algae3.jpg", alt: "Clearer skin after treatment" },
  { type: "video", src: "/video3.mp4", poster: "/neww.jpg", alt: "Client skincare journey" },
];

// Lightweight lazy video that only loads when near viewport
function LazyVideo({ 
  src, 
  poster, 
  className, 
  muted, 
  loop, 
  playsInline, 
  autoPlay,
  ...props 
}: { 
  src: string; 
  poster?: string; 
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (active && ref.current) {
      // Set src and load to ensure the browser fetches the video once visible
      if (ref.current.src !== window.location.origin + src) {
        ref.current.src = src;
      }
      try {
        ref.current.load();
        // Auto play the video if autoPlay is enabled
        if (autoPlay && muted) {
          ref.current.play().catch(() => {
            // Auto-play failed, which is normal in some browsers
          });
        }
      } catch {
        // no-op
      }
    }
  }, [active, src, autoPlay, muted]);

  return (
    <video
      ref={ref}
      className={className}
      controls={!autoPlay}
      playsInline={playsInline}
      preload={active ? "metadata" : "none"}
      poster={poster}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
  {...props}
    />
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Motion variants for cleaner, modern staggered animations
  const containerStagger: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  // Subtle interactive tilt for hero media
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXspring = useSpring(tiltX, { stiffness: 120, damping: 12 });
  const tiltspringY = useSpring(tiltY, { stiffness: 120, damping: 12 });

  const onHeroMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10; // -10deg to 10deg
    const ry = ((x - rect.width / 2) / rect.width) * 10;
    tiltX.set(rx);
    tiltY.set(ry);
  };

  const onHeroMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section — light background, right-side image */}
      <section ref={heroRef} className="relative min-h-[92vh] pt-24 flex items-center skincare-gradient">
        <motion.div style={{ y, opacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="grid lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left: Copy */}
              <div className="lg:col-span-7">
                <motion.div
                  variants={containerStagger}
                  initial="hidden"
                  animate="show"
                  className="p-0"
                >
                  
                  <motion.h1
                    variants={itemFadeUp}
                    className="text-4xl sm:text-4xl font-bold leading-tight tracking-tight"
                  >
                    Elevate Your Skin Glow
                    <span className="block animated-text-gradient">With Confidence</span>
                  </motion.h1>
                  <motion.p
                    variants={itemFadeUp}
                    className="mt-6 text-gray-600 text-lg sm:text-xl max-w-2xl"
                  >
                    Bespoke treatments and expert care designed for deep results. Experience a modern approach to healthy, radiant skin.
                  </motion.p>
                  <motion.div
                    variants={itemFadeUp}
                    className="mt-8 flex flex-col-2   gap-4"
                  >
                    <Link href="/services">
                      <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white text-base px-7 py-6 rounded-full">
                   Explore Services
                      </Button>
                    </Link>
                    <Link href="#contact">
                      <Button variant="outline" size="lg" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-base px-7 py-6 rounded-full">
                        Book a Consultation
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                    className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-emerald-400/70 to-transparent"
                  />
                </motion.div>
              </div>
              {/* Right: Image with subtle interactive tilt */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="relative"
                >
                  <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-emerald-300/30 blur-3xl floating-animation" />
                  <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-teal-300/30 blur-3xl floating-animation" />
                  <motion.div
                    onMouseMove={onHeroMouseMove}
                    onMouseLeave={onHeroMouseLeave}
                    style={{ rotateX: tiltspringY, rotateY: tiltXspring }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    animate={{ y: [0, -6, 0] }}
                    className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 will-change-transform w-full"
                  >
                    <div className="aspect-[4/5] max-h-[70vh] relative w-full">
                      <LazyVideo
                        src="/home-hero.mp4"
                        poster="/neww.jpg"
                        className="w-full h-full object-cover mask-bottom-soft"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      {/* Video overlay for better text contrast if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Minimal scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-8 rounded-full bg-emerald-600/70" />
        </motion.div>
      </section>

      {/* Services Preview (styled like Services page, with images) */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
            >
              ✨ Professional Skincare Solutions
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              whileInView={{ 
                background: [
                  "linear-gradient(90deg, #065f46, #10b981)",
                  "linear-gradient(90deg, #10b981, #34d399)",
                  "linear-gradient(90deg, #34d399, #10b981)",
                  "linear-gradient(90deg, #10b981, #065f46)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Premium Services
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              whileInView={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Transform your skin with our professional treatments designed to address
              your unique needs and reveal your natural beauty.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {homeServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                variants={itemFadeUp} 
                className="group"
                whileHover={{ 
                  y: -12,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4 
                }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <CardContent className="p-0 relative z-10">
                    {/* Service Image with Enhanced Effects */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ 
                          scale: 1.15,
                          filter: "brightness(1.1) contrast(1.1)"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />

                      {/* Animated overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {service.popular && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        >
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                            ⭐ Most Popular
                          </Badge>
                        </motion.div>
                      )}

                      <motion.div 
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center text-white drop-shadow-lg">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="flex items-center bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center bg-emerald-500/80 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <span className="text-sm font-bold">{service.price}</span>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Service Content with Enhanced Animations */}
                    <div className="p-6 space-y-4">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-emerald-600 text-sm font-medium">
                          {service.subtitle}
                        </p>
                      </motion.div>

                      <motion.p 
                        className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                        whileHover={{ color: "#374151" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.description}
                      </motion.p>

                      <motion.div 
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/contact">
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 group shadow-lg hover:shadow-xl transition-all duration-300">
                            <motion.span
                              className="flex items-center justify-center"
                              whileHover={{ x: -5 }}
                              transition={{ duration: 0.2 }}
                            >
                              Book This Treatment
                            </motion.span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.div>
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Amazing Results
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600">
              See the transformation our treatments can achieve
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {resultsMedia.map((item, index) => (
              <motion.div key={item.src} variants={itemFadeUp} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="relative aspect-[4/3]">
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        priority={index < 1}
                      />
                    ) : (
                      <LazyVideo
                        src={item.src}
                        poster={item.poster}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose GlowSkin?
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our proven approach to skincare excellence
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Expert Team",
                description: "Licensed aestheticians with 10+ years experience",
                stat: "500+",
                statLabel: "Happy clients"
              },
              {
                icon: Award,
                title: "Premium Products",
                description: "Medical-grade skincare from leading brands",
                stat: "98%",
                statLabel: "Satisfaction rate"
              },
              {
                icon: Heart,
                title: "Personalized Care",
                description: "Customized treatments for your unique skin type",
                stat: "15+",
                statLabel: "Treatment options"
              },
              {
                icon: Sparkles,
                title: "Visible Results",
                description: "See improvement in just 2-4 sessions",
                stat: "95%",
                statLabel: "See results"
              }
            ].map((feature, index) => (
              <motion.div key={feature.title} variants={itemFadeUp}>
                <Card className="h-full text-center p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="space-y-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 relative"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="w-full h-full text-emerald-500" />
                      <div className="absolute inset-0 rounded-full bg-emerald-100 -z-10 group-hover:bg-emerald-200 transition-colors"></div>
                    </motion.div>
                    
                    <motion.div
                      className="text-3xl font-bold animated-text-gradient mb-2"
                      whileInView={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {feature.stat}
                    </motion.div>
                    <div className="text-sm text-emerald-600 font-medium mb-4">{feature.statLabel}</div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Journey to Radiant Skin
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures you get the best possible results
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Free Consultation",
                description: "Comprehensive skin analysis and personalized treatment plan",
                icon: "🔍",
                duration: "30 mins"
              },
              {
                step: "02", 
                title: "Skin Preparation",
                description: "Gentle cleansing and prep for optimal treatment results",
                icon: "✨",
                duration: "15 mins"
              },
              {
                step: "03",
                title: "Professional Treatment",
                description: "Expert application using medical-grade equipment",
                icon: "💎",
                duration: "45-90 mins"
              },
              {
                step: "04",
                title: "Aftercare & Follow-up",
                description: "Home care routine and progress monitoring",
                icon: "📱",
                duration: "Ongoing"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemFadeUp}
                className="text-center relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated Connecting Line */}
                {index < 3 && (
                  <motion.div 
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-200 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Enhanced Step Circle */}
                  <motion.div 
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group cursor-pointer"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                      transitionDelay: `${index * 150}ms` 
                    }}
                  >
                    {/* Pulsing background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-200 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Icon with bounce */}
                    <motion.span 
                      className="text-2xl mb-1 relative z-10"
                      animate={{ 
                        y: [0, -2, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {step.icon}
                    </motion.span>
                    
                    {/* Step number badge */}
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-emerald-300 rounded-full opacity-0"
                      animate={{ 
                        scale: [1, 2], 
                        opacity: [0.5, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    />
                  </motion.div>
                  
                  {/* Step content with enhanced animations */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-3"
                      whileInView={{ 
                        color: ["#111827", "#059669", "#111827"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-3 leading-relaxed"
                      whileHover={{ color: "#374151" }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.div 
                      className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full inline-block"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#ecfdf5"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ⏱️ {step.duration}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600">
              Everything you need to know about our treatments
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {[
              {
                q: "How often should I get facial treatments?",
                a: "For optimal results, we recommend treatments every 4-6 weeks. This aligns with your skin's natural renewal cycle and maintains consistent improvement."
              },
              {
                q: "Are your treatments suitable for sensitive skin?",
                a: "Absolutely! We customize every treatment based on your skin type and sensitivity level. Our gentle, medical-grade products are suitable for all skin types."
              },
              {
                q: "How soon will I see results?",
                a: "Many clients notice immediate improvements in skin texture and hydration. For lasting results like reduced fine lines and improved tone, expect to see changes after 2-3 sessions."
              },
              {
                q: "Do you offer package deals?",
                a: "Yes! We offer various treatment packages that provide better value and ensure consistent results. Ask about our monthly membership options during your consultation."
              },
              {
                q: "What should I do before my appointment?",
                a: "Arrive with clean skin (no makeup if possible). Avoid sun exposure and harsh skincare products 24 hours before your treatment for best results."
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={itemFadeUp}>
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold mr-3">
                        Q
                      </span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 ml-11 leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Reviews Style Testimonials */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            {/* Google Reviews Header */}
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xl font-medium text-gray-700">Google</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-700">4.9</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">Based on 127 reviews</span>
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              GlowSkin Reviews
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg text-gray-600"
            >
              See what our clients are saying about their experiences
            </motion.p>
          </motion.div>
          {/* Google-style Reviews Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {[
              {
                name: "Sarah Johnson",
                avatar: "SJ",
                rating: 5,
                date: "2 weeks ago",
                review: "Amazing experience at GlowSkin! The algae peel treatment completely transformed my skin texture. The staff was professional and knowledgeable. I can see visible improvements after just one session. Highly recommend this place for anyone looking for quality skincare treatments.",
                helpful: 12
              },
              {
                name: "Michael Chen",
                avatar: "MC", 
                rating: 5,
                date: "1 month ago",
                review: "Outstanding service and results! I've been coming here for 6 months now for regular facials and dermaplaning. My skin has never looked better. The facility is clean, modern, and the technicians really know what they're doing. Worth every rand!",
                helpful: 8
              },
              {
                name: "Lisa Williams",
                avatar: "LW",
                rating: 5,
                date: "3 weeks ago", 
                review: "Professional team and incredible results! I was hesitant about trying new treatments, but the consultation was thorough and they explained everything. The before and after difference is remarkable. Already booked my next appointment!",
                helpful: 15
              }
            ].map((review, index) => (
              <motion.div
                key={review.name}
                variants={itemFadeUp}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 group max-w-4xl mx-auto"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* User Avatar */}
                    <motion.div 
                      className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {review.avatar}
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                        whileHover={{ x: 2 }}
                      >
                        {review.name}
                      </motion.h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{review.date}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>Cape Town</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* More options button */}
                  <motion.button 
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                    </svg>
                  </motion.button>
                </div>

                {/* Star Rating */}
                <motion.div 
                  className="flex items-center space-x-1 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.1 + i * 0.05 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Review Text */}
                <motion.p 
                  className="text-gray-700 leading-relaxed mb-4 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  {review.review}
                </motion.p>

                {/* Review Actions */}
                <motion.div 
                  className="flex items-center justify-between pt-3 border-t border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Helpful button */}
                    <motion.button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 6v11.5m0 0L7 20"/>
                      </svg>
                      <span>Helpful ({review.helpful})</span>
                    </motion.button>

                    {/* Share button */}
                    <motion.button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                      <span>Share</span>
                    </motion.button>
                  </div>

                  {/* Google verified checkmark */}
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Verified</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              animate={{ textShadow: ["0 0 20px rgba(255,255,255,0.5)", "0 0 40px rgba(255,255,255,0.8)", "0 0 20px rgba(255,255,255,0.5)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Transform Your Skin?
            </motion.h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have discovered their best skin. 
              Book your free consultation today and start your glow journey.
            </p>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Happy Clients</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm opacity-80">Satisfaction</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5★</div>
                  <div className="text-sm opacity-80">Average Rating</div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-12 py-6 rounded-full group shadow-2xl">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Free Consultation
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="inline-block w-5">→</span>
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 rounded-full">
                    Explore All Services
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div 
              className="text-white/80 text-sm mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p>✓ No commitment required • ✓ Expert consultation • ✓ Personalized treatment plan</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
