'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, X } from 'lucide-react';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const notifications = [
  { id: 1, text: 'New project added', time: '2 min ago', type: 'success' },
  { id: 2, text: 'Portfolio updated', time: '1 hour ago', type: 'info' },
  { id: 3, text: 'New visitor record', time: '3 hours ago', type: 'warning' },
];

export default function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-10 mx-4 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-white/5 shadow-lg"
    >
      <div className="flex items-center justify-between h-16 px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Bell size={20} />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-red-500/30"
              >
                3
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute right-0 mt-3 w-72 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden"
                >
                  <div className="p-3 border-b border-white/5">
                    <p className="text-sm font-semibold text-white">Notifications</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {notifications.map((n) => (
                      <motion.div
                        key={n.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: n.id * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                          n.type === 'success' ? 'bg-green-500' :
                          n.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{n.text}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/5">
            <div className="text-right">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-white"
              >
                Admin User
              </motion.p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-70" />
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
