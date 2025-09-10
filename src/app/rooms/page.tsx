"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wifi, 
  Zap, 
  Star, 
  Users, 
  Bed, 
  Monitor, 
  Sparkles,
  ArrowRight,
  Eye,
  Calendar,
  Check
} from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";

const roomTypes = [
  {
    id: 1,
    name: "Quantum Luxury Suite",
    price: 2089,
    originalPrice: 2500,
    image: "/api/placeholder/600/400",
    category: "Premium",
    size: "85 m²",
    guests: 2,
    beds: 1,
    description: "Experience the pinnacle of futuristic luxury with quantum-enhanced amenities and AI-powered personalization.",
    features: [
      "Holographic Entertainment System",
      "Neural Interface Climate Control",
      "Quantum Memory Foam Bed",
      "360° Virtual Reality Windows",
      "AI Personal Assistant",
      "Biometric Security Access"
    ],
    amenities: [
      { icon: Wifi, name: "Quantum WiFi 7.0" },
      { icon: Monitor, name: "Holographic Display" },
      { icon: Zap, name: "Wireless Charging Zone" },
      { icon: Star, name: "5-Star Service" }
    ],
    rating: 4.9,
    reviews: 847
  },
  {
    id: 2,
    name: "Cyberpunk Penthouse",
    price: 3500,
    originalPrice: 4200,
    image: "/api/placeholder/600/400",
    category: "Elite",
    size: "150 m²",
    guests: 4,
    beds: 2,
    description: "Ultimate cyberpunk experience with panoramic city views and cutting-edge technology integration.",
    features: [
      "360° City View Dome",
      "Quantum Gaming Station",
      "Smart Glass Walls",
      "Levitating Furniture",
      "Personal Teleportation Pod",
      "Advanced Biometric Spa"
    ],
    amenities: [
      { icon: Wifi, name: "Neural Network Access" },
      { icon: Monitor, name: "Holographic Concierge" },
      { icon: Zap, name: "Quantum Power Core" },
      { icon: Star, name: "Elite Status" }
    ],
    rating: 5.0,
    reviews: 423
  },
  {
    id: 3,
    name: "Neo-Tokyo Standard",
    price: 1200,
    originalPrice: 1500,
    image: "/api/placeholder/600/400",
    category: "Standard",
    size: "45 m²",
    guests: 2,
    beds: 1,
    description: "Sleek and modern with essential futuristic amenities for the tech-savvy traveler.",
    features: [
      "Smart Mirror Interface",
      "Voice-Controlled Environment",
      "Digital Art Gallery",
      "Automated Room Service",
      "Mood Lighting System",
      "Virtual Reality Entertainment"
    ],
    amenities: [
      { icon: Wifi, name: "High-Speed Quantum" },
      { icon: Monitor, name: "Smart Display" },
      { icon: Zap, name: "Wireless Everything" },
      { icon: Star, name: "Premium Service" }
    ],
    rating: 4.7,
    reviews: 1205
  },
  {
    id: 4,
    name: "Space Station Pod",
    price: 890,
    originalPrice: 1200,
    image: "/api/placeholder/600/400",
    category: "Compact",
    size: "25 m²",
    guests: 1,
    beds: 1,
    description: "Compact yet luxurious space-age pod with all essential amenities for solo travelers.",
    features: [
      "Capsule Sleep Technology",
      "Compact Hologram System",
      "Space-Efficient Design",
      "Zero-Gravity Relaxation",
      "Personal AI Companion",
      "Efficient Resource Management"
    ],
    amenities: [
      { icon: Wifi, name: "Satellite Connection" },
      { icon: Monitor, name: "Compact Display" },
      { icon: Zap, name: "Energy Efficient" },
      { icon: Star, name: "Quality Assured" }
    ],
    rating: 4.5,
    reviews: 892
  },
  {
    id: 5,
    name: "Executive Nexus",
    price: 2800,
    originalPrice: 3300,
    image: "/api/placeholder/600/400",
    category: "Business",
    size: "120 m²",
    guests: 3,
    beds: 2,
    description: "Perfect for business travelers with advanced meeting capabilities and productivity enhancement.",
    features: [
      "Holographic Meeting Room",
      "Quantum Computing Access",
      "Neural Productivity Interface",
      "Advanced Security Protocols",
      "Multi-Dimensional Workspace",
      "Executive Concierge Service"
    ],
    amenities: [
      { icon: Wifi, name: "Business Network" },
      { icon: Monitor, name: "Multi-Screen Setup" },
      { icon: Zap, name: "Power Management" },
      { icon: Star, name: "Executive Service" }
    ],
    rating: 4.8,
    reviews: 634
  },
  {
    id: 6,
    name: "Family Galaxy Suite",
    price: 3200,
    originalPrice: 3800,
    image: "/api/placeholder/600/400",
    category: "Family",
    size: "180 m²",
    guests: 6,
    beds: 3,
    description: "Spacious family-friendly suite with entertainment and safety features for all ages.",
    features: [
      "Kids Holographic Playground",
      "Family Entertainment Center",
      "Multi-Zone Climate Control",
      "Child Safety AI Monitoring",
      "Educational VR Systems",
      "Family Concierge Service"
    ],
    amenities: [
      { icon: Wifi, name: "Family-Safe Network" },
      { icon: Monitor, name: "Multiple Displays" },
      { icon: Zap, name: "High Capacity Power" },
      { icon: Star, name: "Family-First Service" }
    ],
    rating: 4.9,
    reviews: 721
  }
];

const filterOptions = [
  { value: "all", label: "All Rooms" },
  { value: "premium", label: "Premium" },
  { value: "elite", label: "Elite" },
  { value: "standard", label: "Standard" },
  { value: "compact", label: "Compact" },
  { value: "business", label: "Business" },
  { value: "family", label: "Family" }
];

export default function RoomsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredRooms = roomTypes.filter(room => 
    selectedFilter === "all" || room.category.toLowerCase() === selectedFilter
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
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
              QUANTUM SUITES
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Choose from our collection of technologically advanced accommodations, 
              each designed to provide an unparalleled glimpse into the future of hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedFilter === option.value ? "default" : "outline"}
                onClick={() => setSelectedFilter(option.value)}
                className={`cyber-button ${
                  selectedFilter === option.value 
                    ? "bg-blue-500/20 border-blue-400" 
                    : ""
                }`}
              >
                {option.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredRoom(room.id)}
                onHoverEnd={() => setHoveredRoom(null)}
                className="group"
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500 overflow-hidden">
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center space-y-4">
                        <Sparkles className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
                        <p className="text-white/60 text-sm">
                          {room.size} • {room.guests} Guests • {room.beds} Bed{room.beds > 1 ? 's' : ''}
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500/20 border border-blue-400/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        {room.category}
                      </span>
                    </div>

                    {/* View Button */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredRoom === room.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button size="sm" variant="outline" className="cyber-button">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white font-['Orbitron'] mb-2">
                          {room.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-white/60">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{room.rating}</span>
                          <span>({room.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient">
                          R{room.price}
                        </div>
                        <div className="text-sm text-white/50 line-through">
                          R{room.originalPrice}
                        </div>
                        <div className="text-xs text-white/60">per night</div>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-white/70 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-white/70">
                          <amenity.icon className="w-4 h-4 text-blue-400" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features Preview */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white/80">Key Features:</h4>
                      <div className="space-y-1">
                        {room.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm text-white/60">
                            <Check className="w-3 h-3 text-green-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {room.features.length > 3 && (
                          <div className="text-xs text-blue-400">
                            +{room.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Link href={`/booking?room=${room.id}`} className="flex-1">
                        <Button className="w-full cyber-button group">
                          <Calendar className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                          Book Now
                        </Button>
                      </Link>
                      <Button variant="outline" className="cyber-button group">
                        Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              QUANTUM SERVICES
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Enhance your stay with our revolutionary add-on services designed 
              to push the boundaries of luxury and technology.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
                {
                  title: "Holographic Butler",
                  description: "Personal AI assistant available 24/7",
          price: "+R200/night"
                },
                {
                  title: "Quantum Spa Access",
                  description: "Advanced healing and relaxation chambers",
          price: "+R350/stay"
                },
                {
                  title: "Neural Gastronomy",
                  description: "AI-curated molecular cuisine experience",
          price: "+R150/meal"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-morphism neon-border hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-4">
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                      <p className="text-white/70">{service.description}</p>
                      <div className="text-blue-400 font-semibold">{service.price}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Link href="/booking">
              <Button size="lg" className="cyber-button text-lg px-12 py-6 group">
                <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
