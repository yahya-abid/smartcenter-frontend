"use client";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-slate-900">SmartCenter</p>
        <span className="text-xs text-slate-500">Center: Demo Center</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <input
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Profile
        </button>
      </div>
    </header>
  );
}