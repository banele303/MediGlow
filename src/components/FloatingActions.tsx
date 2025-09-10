"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";

// Update these to your preferred numbers
const PHONE_E164 = "+27727389214"; // South Africa +27
const WHATSAPP_E164 = "+27727389214";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      id: "wa",
      href: `https://wa.me/${WHATSAPP_E164.replace("+", "")}`,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
  Icon: MessageCircle,
      target: "_blank" as const,
    },
    {
      id: "call",
      href: `tel:${PHONE_E164}`,
      label: "Call Us",
      color: "bg-emerald-500 hover:bg-emerald-600",
      Icon: Phone,
      target: undefined,
    },
  ];

  return (
    <div className="fixed right-5 bottom-6 z-50 select-none">
      {/* Expanded actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 flex flex-col items-end gap-3"
          >
            {items.map(({ id, href, label, color, Icon, target }) => (
              <motion.a
                key={id}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className={`group shadow-lg hover:shadow-xl transition-all rounded-full px-3 py-2 flex items-center gap-2 text-white ${color}`}
                whileHover={{ y: -2 }}
                onClick={() => setOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">{label}</span>
                <span className="sm:hidden sr-only">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          key={open ? "x" : "dots"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            // Three pulsing dots look
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse [animation-delay:300ms]" />
            </div>
          )}
        </motion.div>
        {/* subtle ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-white/20" />
      </motion.button>
    </div>
  );
}
