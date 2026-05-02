"use client";

import { useMemo, useState } from "react";

type BillingStatus = "TRIAL" | "ACTIVE" | "EXPIRED";

type Plan = {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxStudents: number;
  maxTeachers: number;
  maxGroups: number;
  features: string[];
};

type Invoice = {
  id: number;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: "PAID" | "PENDING";
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 99,
    yearlyPrice: 990,
    maxStudents: 100,
    maxTeachers: 10,
    maxGroups: 10,
    features: [
      "Student management",
      "Teacher management",
      "Groups & classes",
      "Basic reports",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    maxStudents: 300,
    maxTeachers: 30,
    maxGroups: 30,
    features: [
      "Everything in Basic",
      "Advanced reports",
      "Payments & receipts",
      "Attendance tracking",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 399,
    yearlyPrice: 3990,
    maxStudents: 1000,
    maxTeachers: 100,
    maxGroups: 100,
    features: [
      "Everything in Pro",
      "Multi-branch support",
      "Custom branding",
      "Advanced analytics",
      "Dedicated onboarding",
    ],
  },
];

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    date: "2026-04-01",
    amount: "199 MAD",
    status: "PAID",
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-002",
    date: "2026-03-01",
    amount: "199 MAD",
    status: "PAID",
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-003",
    date: "2026-05-01",
    amount: "199 MAD",
    status: "PENDING",
  },
];

function getStatusClasses(status: BillingStatus) {
  switch (status) {
    case "TRIAL":
      return "bg-amber-100 text-amber-700";
    case "ACTIVE":
      return "bg-emerald-100 text-emerald-700";
    case "EXPIRED":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getInvoiceStatusClasses(status: Invoice["status"]) {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-700";
    case "PENDING":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currentPlanId, setCurrentPlanId] = useState("pro");
  const [billingStatus, setBillingStatus] = useState<BillingStatus>("ACTIVE");

  const currentPlan = useMemo(() => {
    return plans.find((plan) => plan.id === currentPlanId) || plans[1];
  }, [currentPlanId]);

  const usage = {
    students: 142,
    teachers: 12,
    groups: 14,
  };

  const studentUsagePercent = Math.min(
    Math.round((usage.students / currentPlan.maxStudents) * 100),
    100
  );
  const teacherUsagePercent = Math.min(
    Math.round((usage.teachers / currentPlan.maxTeachers) * 100),
    100
  );
  const groupUsagePercent = Math.min(
    Math.round((usage.groups / currentPlan.maxGroups) * 100),
    100
  );

  function handleChangePlan(planId: string) {
    setCurrentPlanId(planId);
    setBillingStatus("ACTIVE");
    alert(`Plan changed to ${planId.toUpperCase()} (frontend simulation).`);
  }

  function handleManageSubscription() {
    alert("Subscription management is a placeholder for backend/Stripe integration.");
  }

  function handleInvoiceDownload(invoiceNumber: string) {
    alert(`Download invoice ${invoiceNumber} (placeholder).`);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
          <p className="mt-1 text-slate-600">
            Manage your subscription plan, usage, and invoice history.
          </p>
        </div>

        <button
          onClick={handleManageSubscription}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Manage Subscription
        </button>
      </div>

      {/* Current plan */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600">Current Plan</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {currentPlan.name}
              </h2>
            </div>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                billingStatus
              )}`}
            >
              {billingStatus}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Billing Cycle</p>
              <p className="mt-1 font-semibold text-slate-900 capitalize">
                {billingCycle}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Next Renewal</p>
              <p className="mt-1 font-semibold text-slate-900">2026-06-01</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                billingCycle === "monthly"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                billingCycle === "yearly"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Yearly
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Current Price</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {billingCycle === "monthly"
                ? `${currentPlan.monthlyPrice} MAD / month`
                : `${currentPlan.yearlyPrice} MAD / year`}
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Usage Overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Monitor your current usage against your plan limits.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">Students</span>
                <span className="font-semibold text-slate-600">
                  {usage.students} / {currentPlan.maxStudents}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${studentUsagePercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">Teachers</span>
                <span className="font-semibold text-slate-600">
                  {usage.teachers} / {currentPlan.maxTeachers}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${teacherUsagePercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">Groups</span>
                <span className="font-semibold text-slate-600">
                  {usage.groups} / {currentPlan.maxGroups}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${groupUsagePercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available plans */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Available Plans</h2>
        <p className="mt-1 text-sm text-slate-600">
          Upgrade or switch plans depending on your center needs.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-5 shadow-sm ${
                  isCurrent
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  {isCurrent && (
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-4 text-3xl font-bold">
                  {price} MAD
                  <span className={`ml-1 text-sm font-medium ${isCurrent ? "text-slate-200" : "text-slate-500"}`}>
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </p>

                <div className={`mt-4 space-y-2 text-sm ${isCurrent ? "text-slate-200" : "text-slate-600"}`}>
                  <p>Up to {plan.maxStudents} students</p>
                  <p>Up to {plan.maxTeachers} teachers</p>
                  <p>Up to {plan.maxGroups} groups</p>
                </div>

                <ul className={`mt-4 space-y-2 text-sm ${isCurrent ? "text-slate-200" : "text-slate-700"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChangePlan(plan.id)}
                  disabled={isCurrent}
                  className={`mt-6 w-full rounded-xl px-4 py-2 text-sm font-semibold ${
                    isCurrent
                      ? "cursor-not-allowed bg-white/10 text-white/70"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {isCurrent ? "Current Plan" : "Choose Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice history */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Invoice History</h2>
        <p className="mt-1 text-sm text-slate-600">
          Review your previous invoices and payment status.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Invoice #</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-slate-200 text-slate-700"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-3">{invoice.date}</td>
                    <td className="px-4 py-3">{invoice.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getInvoiceStatusClasses(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleInvoiceDownload(invoice.invoiceNumber)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}