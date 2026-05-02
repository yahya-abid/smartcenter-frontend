"use client";

import { useMemo, useState } from "react";

type PaymentStatus = "PAID" | "LATE" | "PENDING";

type Payment = {
  id: number;
  studentName: string;
  month: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  receiptNumber: string;
};

type PaymentFormData = {
  studentName: string;
  month: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  receiptNumber: string;
};

const initialPayments: Payment[] = [
  {
    id: 1,
    studentName: "Youssef El Amrani",
    month: "April 2026",
    amount: "600 MAD",
    method: "Cash",
    status: "PAID",
    receiptNumber: "RC-001",
  },
  {
    id: 2,
    studentName: "Salma Benali",
    month: "April 2026",
    amount: "500 MAD",
    method: "Bank Transfer",
    status: "LATE",
    receiptNumber: "RC-002",
  },
  {
    id: 3,
    studentName: "Omar Ait Lahcen",
    month: "April 2026",
    amount: "700 MAD",
    method: "Cash",
    status: "PENDING",
    receiptNumber: "RC-003",
  },
];

const emptyForm: PaymentFormData = {
  studentName: "",
  month: "",
  amount: "",
  method: "",
  status: "PENDING",
  receiptNumber: "",
};

function getStatusClasses(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-700";
    case "LATE":
      return "bg-rose-100 text-rose-700";
    case "PENDING":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PaymentFormData>(emptyForm);

  const filteredPayments = useMemo(() => {
    const term = search.toLowerCase();

    return payments.filter((payment) => {
      return (
        payment.studentName.toLowerCase().includes(term) ||
        payment.month.toLowerCase().includes(term) ||
        payment.amount.toLowerCase().includes(term) ||
        payment.method.toLowerCase().includes(term) ||
        payment.status.toLowerCase().includes(term) ||
        payment.receiptNumber.toLowerCase().includes(term)
      );
    });
  }, [payments, search]);

  function openAddModal() {
    setEditingPaymentId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(payment: Payment) {
    setEditingPaymentId(payment.id);
    setFormData({
      studentName: payment.studentName,
      month: payment.month,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      receiptNumber: payment.receiptNumber,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingPaymentId(null);
    setFormData(emptyForm);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const field = e.target.name as keyof PaymentFormData;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.month ||
      !formData.amount ||
      !formData.method ||
      !formData.receiptNumber
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingPaymentId !== null) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === editingPaymentId
            ? {
                ...payment,
                ...formData,
              }
            : payment
        )
      );
    } else {
      const newPayment: Payment = {
        id: Date.now(),
        studentName: formData.studentName,
        month: formData.month,
        amount: formData.amount,
        method: formData.method,
        status: formData.status,
        receiptNumber: formData.receiptNumber,
      };

      setPayments((prev) => [newPayment, ...prev]);
    }

    closeModal();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) return;

    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  }

  function handleReceipt(receiptNumber: string) {
    alert(`Receipt preview for ${receiptNumber} (placeholder for now).`);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="mt-1 text-slate-600">
            Track payments, status, methods, and receipts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Add Payment
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search by student, month, amount, method, status, or receipt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
        />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Month</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Receipt</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-slate-200 text-slate-700"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {payment.studentName}
                    </td>
                    <td className="px-4 py-3">{payment.month}</td>
                    <td className="px-4 py-3">{payment.amount}</td>
                    <td className="px-4 py-3">{payment.method}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleReceipt(payment.receiptNumber)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {payment.receiptNumber}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(payment)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(payment.id)}
                          className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingPaymentId !== null ? "Edit Payment" : "Add Payment"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Fill in the payment information below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Enter student name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Month
                  </label>
                  <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="Ex: April 2026"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="Ex: 600 MAD"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="Ex: Cash / Transfer"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Receipt Number
                  </label>
                  <input
                    type="text"
                    name="receiptNumber"
                    value={formData.receiptNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="Ex: RC-004"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="PAID">PAID</option>
                  <option value="LATE">LATE</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  {editingPaymentId !== null ? "Save Changes" : "Add Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}