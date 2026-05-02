export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-slate-600">
          SmartCenter • SaaS multi-tenant
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Gérez votre centre de soutien et de langues en un seul endroit.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          SmartCenter digitalise la gestion des élèves, professeurs, groupes,
          paiements, présence et planning — avec un espace sécurisé pour chaque centre.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/app"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Accéder au dashboard
          </a>

          <a
            href="/features"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Voir les fonctionnalités
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Centralisation</h3>
            <p className="mt-2 text-sm text-slate-600">
              Élèves, profs, groupes, matières, paiements — tout au même endroit.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Multi-tenant</h3>
            <p className="mt-2 text-sm text-slate-600">
              Chaque centre dispose d’un espace isolé et sécurisé.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Automatisation</h3>
            <p className="mt-2 text-sm text-slate-600">
              Reçus, retard de paiement, rappels, planning… en automatique.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}