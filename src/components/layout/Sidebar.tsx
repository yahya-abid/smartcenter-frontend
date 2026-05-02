"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  CreditCard,
  ClipboardCheck,
  BarChart3,
  Settings,
  BadgeDollarSign,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Students", href: "/app/students", icon: Users },
  { label: "Teachers", href: "/app/teachers", icon: GraduationCap },
  { label: "Groups", href: "/app/groups", icon: Layers },
  { label: "Payments", href: "/app/payments", icon: CreditCard },
  { label: "Attendance", href: "/app/attendance", icon: ClipboardCheck },
  { label: "Reports", href: "/app/reports", icon: BarChart3 },
  { label: "Billing", href: "/app/billing", icon: BadgeDollarSign },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="h-9 w-9 rounded-xl bg-slate-900" />
        <div>
          <p className="text-sm font-semibold text-slate-900">SmartCenter</p>
          <p className="text-xs text-slate-500">Center Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Menu
        </p>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">Plan</p>
          <p className="text-xs text-slate-600">Trial / Pro / Enterprise</p>
          <Link
            href="/app/billing"
            className="mt-2 inline-block text-xs font-semibold text-slate-900 underline"
          >
            Manage billing
          </Link>
        </div>
      </div>
    </aside>
  );
}