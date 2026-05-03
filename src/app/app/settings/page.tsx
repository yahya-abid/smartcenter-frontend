"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";

type SettingsFormData = {
  centerName: string;
  centerType: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
  currency: string;
};

const initialSettings: SettingsFormData = {
  centerName: "SmartCenter Demo",
  centerType: "Tutoring & Languages Center",
  phone: "0522001122",
  email: "contact@smartcenter.com",
  address: "Khouribga, Morocco",
  logoUrl: "",
  primaryColor: "#0f172a",
  currency: "MAD",
};

export default function SettingsPage() {
  const [formData, setFormData] = useState<SettingsFormData>(initialSettings);
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const field = e.target.name as keyof SettingsFormData;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.centerName ||
      !formData.centerType ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.primaryColor ||
      !formData.currency
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Saved settings:", formData);
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage center identity, branding, and workspace preferences."
        action={
          <button
            type="submit"
            form="settings-form"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save Settings
          </button>
        }
      />

      {/* Premium hero preview */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          {/* Left side */}
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold text-slate-500">
              Workspace Identity
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {formData.centerName || "Center Name"}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Customize how your center appears across the SmartCenter dashboard,
              reports, and billing workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Center Type
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {formData.centerType || "Tutoring Center"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Currency
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {formData.currency}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Contact
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {formData.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Right side preview card */}
          <div className="border-t border-slate-200 bg-slate-50 p-6 md:border-l md:border-t-0 md:p-8">
            <p className="text-sm font-semibold text-slate-500">Live Preview</p>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Center logo"
                    className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    SC
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-slate-900">
                    {formData.centerName || "Center Name"}
                  </p>
                  <p className="truncate text-sm text-slate-600">
                    {formData.centerType || "Center Type"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-slate-900">
                    {formData.email || "contact@example.com"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Address
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {formData.address || "Center address"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-600">
                  Primary Color
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="h-6 w-6 rounded-full border border-slate-200"
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                  <span className="text-sm font-semibold text-slate-900">
                    {formData.primaryColor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Center Profile */}
        <SectionCard
          title="Center Profile"
          description="Basic information used across the workspace and public identity."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Center Name
              </label>
              <input
                type="text"
                name="centerName"
                value={formData.centerName}
                onChange={handleChange}
                className="sc-input"
                placeholder="Enter center name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Center Type
              </label>
              <input
                type="text"
                name="centerType"
                value={formData.centerType}
                onChange={handleChange}
                className="sc-input"
                placeholder="Ex: Tutoring Center"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="sc-input"
                placeholder="Enter phone"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="sc-input"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="sc-textarea"
              placeholder="Enter address"
            />
          </div>
        </SectionCard>

        {/* Branding */}
        <SectionCard
          title="Branding"
          description="Customize how your center appears visually in the platform."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Logo URL
              </label>
              <input
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                className="sc-input"
                placeholder="Paste logo image URL"
              />
              <p className="mt-2 text-xs text-slate-500">
                Optional. If empty, a branded placeholder will be shown.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-12 w-16 rounded-xl border border-slate-200 bg-white p-1"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="#0f172a"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Preferences */}
        <SectionCard
          title="Preferences"
          description="Local settings used across billing, reports, and workspace defaults."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="sc-select"
              >
                <option value="MAD">MAD</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Future Preferences
              </p>
              <p className="mt-2 text-sm text-slate-600">
                You can later add timezone, interface language, receipt format,
                invoice prefix, and date formatting here.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Save footer */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              {saved ? (
                <p className="text-sm font-semibold text-emerald-600">
                  Settings saved successfully.
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Changes are local for now until backend integration is connected.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save Settings
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}