"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, PlusSquare, MessageCircle, User } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/tasks", label: "Work", icon: Briefcase },
  { href: "/tasks/new", label: "Post", icon: PlusSquare, primary: true },
  { href: "/messages", label: "Chats", icon: MessageCircle },
  { href: "/profile", label: "Account", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDeep = pathname.includes('/tasks/') && pathname !== '/tasks/new' || pathname.includes('/messages/');
  
  return (
    <div className="app">
      <div className="body">
        <div className="main">
          {children}
          {!isDeep && (
            <nav className="tabbar">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={active ? 'on' : ''}>
                    <span style={item.primary ? { width: 46, height: 46, borderRadius: 15, background: 'var(--navy)', color: '#fff', display: 'grid', placeItems: 'center', marginTop: -18 } : {}}>
                      <item.icon size={item.primary ? 24 : 23} />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
