"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Globe,
  Zap,
  Users,
  Shield,
  Sparkles,
  Calendar,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Phone,
    title: "Quantum Communication",
    description: "Instant neural-link communication with our AI concierge",
    contact: "+1 (555) QUANTUM",
    availability: "24/7 Neural Network"
  },
  {
    icon: Mail,
    title: "Holographic Mail",
    description: "Send us a message through our holographic communication system",
    contact: "info@glowsuite.future",
    availability: "Response within 1 quantum cycle"
  },
  {
    icon: Globe,
    title: "Virtual Reality Meet",
    description: "Schedule a VR meeting with our hospitality specialists",
    contact: "VR Portal: glowsuite.vr",
    availability: "Available 24/7"
  },
  {
    icon: MessageSquare,
    title: "AI Chat Support",
    description: "Chat with our advanced AI assistant for instant help",
    contact: "Live Chat Available",
    availability: "Always Online"
  }
];

const locations = [
  {
    city: "Neo Tokyo",
    address: "2089 Quantum Boulevard, Sky District",
    coordinates: "35.6762°N, 139.6503°E",
    specialties: ["Main Hub", "Quantum Computing Center", "Holographic Labs"]
  },
  {
    city: "New Angeles",
    address: "777 Future Avenue, Cloud City Level 50",
    coordinates: "34.0522°N, 118.2437°W",
    specialties: ["AI Research Center", "Neural Interface Hub", "Guest Experience Lab"]
  },
  {
    city: "Neo Singapore",
    address: "888 Digital Marina, Cyber Bay",
    coordinates: "1.3521°N, 103.8198°E",
    specialties: ["Sustainability Center", "Eco-Tech Innovation", "Green Energy Hub"]
  }
];

const departments = [
  {
    name: "Guest Relations",
    description: "General inquiries and guest support",
    icon: Users,
    contact: "guests@glowsuite.future"
  },
  {
    name: "Reservations",
    description: "Booking and room reservations",
    icon: Calendar,
    contact: "reservations@glowsuite.future"
  },
  {
    name: "Technical Support",
    description: "AI and quantum system assistance",
    icon: Zap,
    contact: "tech@glowsuite.future"
  },
  {
    name: "Security",
    description: "Privacy and security inquiries",
    icon: Shield,
    contact: "security@glowsuite.future"
  }
];

const faqs = [
  {
    question: "How does the quantum room personalization work?",
    answer: "Our quantum systems analyze your preferences, biometric data, and behavioral patterns to create a completely personalized environment that adapts in real-time to your needs."
  },
  {
    question: "Is the holographic concierge available 24/7?",
    answer: "Yes! Our AI-powered holographic concierge never sleeps and can assist you with any request, from room service to complex travel arrangements, at any time."
  },
  {
    question: "What security measures protect my neural data?",
    answer: "We use quantum encryption and advanced biometric security to protect all guest data. Your neural patterns and personal information are stored in isolated quantum vaults with military-grade protection."
  },
  {
    question: "Can I customize my room's AI personality?",
    answer: "Absolutely! You can choose from dozens of AI personalities or even create a custom one that matches your preferences and communication style."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-6">
              CONNECT WITH US
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Reach out through our quantum communication channels. Our AI-powered 
              support team is ready to assist you with any questions about your 
              futuristic luxury experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              COMMUNICATION CHANNELS
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose your preferred method of communication from our advanced digital channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <method.icon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white font-['Orbitron']">
                      {method.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      <div className="text-blue-400 font-semibold">{method.contact}</div>
                      <div className="text-white/60 text-xs">{method.availability}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism neon-border">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gradient font-['Orbitron'] text-center">
                    Send Quantum Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Name
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full h-9 rounded-md border border-white/20 bg-transparent px-3 py-1 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          <option value="general" className="bg-gray-900">General Inquiry</option>
                          <option value="reservations" className="bg-gray-900">Reservations</option>
                          <option value="technical" className="bg-gray-900">Technical Support</option>
                          <option value="security" className="bg-gray-900">Security</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject line"
                          className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your message here..."
                          rows={6}
                          className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white text-sm transition-colors placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cyber-button text-lg py-6 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Zap className="mr-2 h-5 w-5 animate-pulse" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                            Send Quantum Message
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
                      <p className="text-white/70">
                        Your quantum message has been successfully transmitted. 
                        Our AI team will respond within one quantum cycle.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="cyber-button"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Departments */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Departments */}
              <Card className="glass-morphism neon-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient font-['Orbitron']">
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <dept.icon className="w-6 h-6 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">{dept.name}</h4>
                        <p className="text-white/60 text-sm mb-2">{dept.description}</p>
                        <a 
                          href={`mailto:${dept.contact}`}
                          className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                        >
                          {dept.contact}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card className="glass-morphism neon-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient font-['Orbitron'] flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Quantum Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">AI Concierge</span>
                      <span className="text-green-400 font-semibold">24/7 Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Human Support</span>
                      <span className="text-blue-400">6:00 AM - 11:00 PM PST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">VR Meetings</span>
                      <span className="text-purple-400">24/7 Available</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Emergency Support</span>
                      <span className="text-red-400">Always Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              GLOBAL LOCATIONS
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Visit our quantum facilities around the world for in-person consultations and experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white font-['Orbitron'] mb-2">
                        {location.city}
                      </h3>
                      <p className="text-white/70 mb-2">{location.address}</p>
                      <p className="text-blue-400 text-sm font-mono">{location.coordinates}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white/80 font-semibold">Specialties:</h4>
                      {location.specialties.map((specialty, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-white/60">
                          <Sparkles className="w-3 h-3 text-yellow-400" />
                          <span>{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              QUANTUM FAQ
            </h2>
            <p className="text-xl text-white/70">
              Frequently asked questions about our futuristic technology and services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-morphism neon-border hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-white mb-4 font-['Orbitron']">
                      {faq.question}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-8">
              READY TO CONNECT?
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Don&apos;t wait for the future - experience it today. Book your quantum suite 
              and step into tomorrow.
            </p>

            <Link href="/booking">
              <Button size="lg" className="cyber-button text-lg px-12 py-6 group">
                <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Book Your Experience
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
