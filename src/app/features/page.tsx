export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Fonctionnalités</h1>
        <p className="mt-3 text-slate-600">
          Tout ce dont un centre a besoin : gestion, suivi, paiements et présence.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            "Gestion des élèves",
            "Gestion des professeurs",
            "Groupes / classes",
            "Matières",
            "Paiements & reçus",
            "Présence",
            "Planning",
            "Rapports",
          ].map((f) => (
            <div
              key={f}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{f}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Module prêt à l’emploi, optimisé pour un usage quotidien.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a className="text-sm font-semibold text-slate-900 underline" href="/">
            ← Retour à l’accueil
          </a>
        </div>
      </div>
    </main>
  );
}
