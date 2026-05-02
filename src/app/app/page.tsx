export default function DashboardHome() {
  const cards = [
    { label: "Students", value: "120" },
    { label: "Teachers", value: "8" },
    { label: "Groups", value: "15" },
    { label: "Late Payments", value: "6" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">
          Bienvenue dans SmartCenter. (Dashboard layout next.)
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{c.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}