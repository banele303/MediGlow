"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, PlayCircle, X } from "lucide-react";

// Reuse assets from /public; add more later as needed
const mediaData: Array<
  | { id: string; type: "image"; src: string; alt: string; tags: string[] }
  | { id: string; type: "video"; src: string; poster?: string; alt: string; tags: string[] }
> = [
  { id: "m1", type: "image", src: "/aesthetic.jpg", alt: "Glowing skin aesthetic", tags: ["facials", "results"] },
  { id: "m2", type: "image", src: "/algae-peel.jpg", alt: "Algae peel", tags: ["peels", "treatments"] },
  { id: "m3", type: "image", src: "/algae.jpg", alt: "Treatment results", tags: ["results"] },
  { id: "m4", type: "image", src: "/algae2.jpg", alt: "Hydration glow", tags: ["facials"] },
  { id: "m5", type: "image", src: "/algae3.jpg", alt: "Clearer skin", tags: ["results"] },
  { id: "m6", type: "image", src: "/neww.jpg", alt: "Clinic vibe", tags: ["studio"] },
  { id: "v1", type: "video", src: "/video.mp4", poster: "/algae.jpg", alt: "Hydrafacial clip", tags: ["videos"] },
  { id: "v2", type: "video", src: "/video2.mp4", poster: "/algae2.jpg", alt: "Treatment time-lapse", tags: ["videos"] },
  { id: "v3", type: "video", src: "/video3.mp4", poster: "/neww.jpg", alt: "Client journey", tags: ["videos"] },
  { id: "v4", type: "video", src: "/video4.mp4", poster: "/aesthetic.jpg", alt: "Glow moments", tags: ["videos"] },
  { id: "v5", type: "video", src: "/video5.mp4", poster: "/aesthetic.jpg", alt: "Behind the scenes", tags: ["videos"] },
];

const allTags = ["all", "facials", "peels", "treatments", "results", "videos", "studio"] as const;

type Tag = typeof allTags[number];

export default function GalleryPage() {
  const [tag, setTag] = useState<Tag>("all");
  const [lightbox, setLightbox] = useState<null | { id: string }>(null);

  const filtered = useMemo(() => {
    if (tag === "all") return mediaData;
    return mediaData.filter((m) => m.tags.includes(tag));
  }, [tag]);

  const openLightbox = useCallback((id: string) => setLightbox({ id }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Disable page scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [lightbox]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <section className="section-padding pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 mb-4"
            >
              <Filter className="w-4 h-4 mr-2" /> Our Work
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight"
            >
              Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-gray-600 max-w-2xl mx-auto"
            >
              Explore real results and moments from our treatments, captured in stunning detail.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map((t) => (
              <motion.button
                key={t}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTag(t)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  tag === t
                    ? "bg-emerald-500 text-white border-emerald-500 shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {t === "all" ? "All" : t[0].toUpperCase() + t.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-ish responsive grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            transition={{ layout: { duration: 0.3 } }}
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card className="overflow-hidden bg-white border border-gray-100 shadow hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/3]">
                        {item.type === "image" ? (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                            priority={false}
                          />
                        ) : (
                          <>
                            {/* Use native video for preview with poster */}
                            <video
                              className="w-full h-full object-cover"
                              poster={item.poster}
                              muted
                              preload="metadata"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <PlayCircle className="w-14 h-14 text-white drop-shadow" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge className="bg-emerald-500/90 text-white shadow">
                          {item.type === "image" ? "Photo" : "Video"}
                        </Badge>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); openLightbox(item.id); }}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={closeLightbox} />
            <motion.button
              className="absolute top-6 right-6 text-white/90 hover:text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative max-w-5xl w-full"
            >
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                {(() => {
                  const active = mediaData.find((m) => m.id === lightbox.id)!;
                  if (active.type === "image") {
                    return (
                      <Image
                        src={active.src}
                        alt={active.alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    );
                  }
                  return (
                    <video
                      controls
                      className="w-full h-full object-contain"
                      poster={active.poster}
                      autoPlay
                    >
                      <source src={active.src} />
                    </video>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
