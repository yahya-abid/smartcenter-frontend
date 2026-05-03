type StatusVariant = "success" | "danger" | "warning" | "neutral" | "info";

type StatusBadgeProps = {
  label: string;
  variant?: StatusVariant;
};

export function StatusBadge({
  label,
  variant = "neutral",
}: StatusBadgeProps) {
  const styles: Record<StatusVariant, string> = {
    success: "bg-emerald-100 text-emerald-700",
    danger: "bg-rose-100 text-rose-700",
    warning: "bg-amber-100 text-amber-700",
    neutral: "bg-slate-100 text-slate-700",
    info: "bg-sky-100 text-sky-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {label}
    </span>
  );
}