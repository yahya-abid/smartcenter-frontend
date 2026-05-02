"use client";

import { useState } from "react";

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

    // Placeholder for backend save later
    console.log("Saved settings:", formData);
    setSaved(true);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600">
          Manage center identity, branding, and preferences.
        </p>
      </div>

      {/* Main form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Center profile */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Center Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            Basic information about the center.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
        </div>

        {/* Branding */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Branding</h2>
          <p className="mt-1 text-sm text-slate-600">
            Customize logo and main theme color.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                  className="sc-input"
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

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Live Preview
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Center logo"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    SC
                  </div>
                )}

                <div>
                  <p className="font-semibold text-slate-900">
                    {formData.centerName || "Center Name"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {formData.centerType || "Center Type"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
          <p className="mt-1 text-sm text-slate-600">
            Configure local preferences used across the dashboard.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
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
          </div>
        </div>

        {/* Save area */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {saved ? (
            <p className="text-sm font-medium text-emerald-600">
              Settings saved successfully.
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Changes are local for now until backend integration.
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}