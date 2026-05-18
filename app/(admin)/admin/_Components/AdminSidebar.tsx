'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderGit2, Settings, LogOut, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0, opacity: 1,
    transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 100 },
  }),
};

export default function AdminSidebar({ open }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <motion.aside
      animate={{ width: open ? 256 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-4 top-4 mt-16 bottom-4 z-20 rounded-2xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-xl border border-white/5 shadow-2xl shadow-purple-500/5 overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-60 animate-pulse" />
            <Sparkles className="relative h-6 w-6 text-white" />
          </div>
          <AnimatePresence>
            {open && (
              <motion.h1
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-lg bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
              >
                Admin Panel
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="relative flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/10 border border-purple-500/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25'
                    : 'group-hover:bg-white/5'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!open && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-xs font-medium rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-30">
                    {item.label}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="relative p-3 border-t border-white/5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group relative"
        >
          <div className="p-2 rounded-lg group-hover:bg-red-500/20 transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {!open && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-xs font-medium rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              Logout
            </div>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
