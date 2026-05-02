import Link from "next/link";export default function DashboardHome() {
  const stats = [
    {
      label: "Total Students",
      value: "142",
      subtext: "+12 this month",
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Teachers",
      value: "12",
      subtext: "Active this week",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Groups",
      value: "14",
      subtext: "Across all subjects",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Late Payments",
      value: "6",
      subtext: "Need follow-up",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  const quickActions = [
    {
      title: "Add Student",
      desc: "Create a new student profile",
      href: "/app/students",
    },
    {
      title: "Add Payment",
      desc: "Record a new payment",
      href: "/app/payments",
    },
    {
      title: "Mark Attendance",
      desc: "Track today’s attendance",
      href: "/app/attendance",
    },
    {
      title: "Generate Report",
      desc: "Export PDF or Excel report",
      href: "/app/reports",
    },
  ];

  const revenue = [
    { month: "Jan", amount: 4200 },
    { month: "Feb", amount: 5100 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 6200 },
    { month: "May", amount: 5700 },
    { month: "Jun", amount: 6900 },
  ];

  const recentPayments = [
    { student: "Youssef El Amrani", amount: "600 MAD", status: "PAID" },
    { student: "Salma Benali", amount: "500 MAD", status: "LATE" },
    { student: "Omar Ait Lahcen", amount: "700 MAD", status: "PENDING" },
  ];

  const recentActivity = [
    "New student added to Math Group A",
    "Attendance saved for English Group B",
    "Monthly revenue report exported",
    "Billing plan reviewed",
  ];

  const maxRevenue = Math.max(...revenue.map((item) => item.amount));

  return (
    <div className="space-y-6">
      {/* Welcome hero */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Welcome back 👋
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              SmartCenter Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Here is a quick overview of your center activity, payments,
              attendance, and operational performance.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/app/students"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add Student
            </Link>

            <Link
              href="/app/reports"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Generate Report
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`mb-4 inline-flex rounded-2xl px-3 py-2 text-sm font-semibold ${stat.bg} ${stat.color}`}
            >
              {stat.label}
            </div>

            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.subtext}</p>
          </div>
        ))}
      </section>

      {/* Main content */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Revenue */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Revenue Overview
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Monthly performance in MAD
                </p>
              </div>

              <Link
                href="/app/reports"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View Reports
              </Link>
            </div>

            <div className="mt-8 flex items-end gap-3">
              {revenue.map((item) => {
                const height = (item.amount / maxRevenue) * 180;

                return (
                  <div
                    key={item.month}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t-2xl bg-slate-900"
                      style={{ height: `${height}px` }}
                      title={`${item.amount} MAD`}
                    />
                    <p className="mt-3 text-xs font-medium text-slate-600">
                      {item.month}
                    </p>
                    <p className="text-xs text-slate-500">{item.amount}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent payments */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Payments
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Latest recorded student payments
                </p>
              </div>

              <Link
                href="/app/payments"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View All
              </Link>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr
                      key={payment.student}
                      className="border-t border-slate-200 text-slate-700"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {payment.student}
                      </td>
                      <td className="px-4 py-3">{payment.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            payment.status === "PAID"
                              ? "bg-emerald-100 text-emerald-700"
                              : payment.status === "LATE"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Attendance summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Attendance Snapshot
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Today’s current overview
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">Present</span>
                  <span className="font-semibold text-emerald-600">86%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[86%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">Absent</span>
                  <span className="font-semibold text-rose-600">14%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[14%] rounded-full bg-rose-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-600">
              Jump into common tasks quickly
            </p>

            <div className="mt-6 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:bg-slate-100"
                >
                  <p className="font-semibold text-slate-900">{action.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{action.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Latest updates in your center
            </p>

            <div className="mt-6 space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

