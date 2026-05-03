import { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  rightAction?: ReactNode;
};

export function SectionCard({
  title,
  description,
  children,
  rightAction,
}: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {(title || description || rightAction) && (
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>

          {rightAction ? <div>{rightAction}</div> : null}
        </div>
      )}

      {children}
    </section>
  );
}