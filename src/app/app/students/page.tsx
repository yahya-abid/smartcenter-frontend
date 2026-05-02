"use client";

import { useMemo, useState } from "react";

type PaymentStatus = "PAID" | "LATE" | "NONE";

type Student = {
  id: number;
  fullName: string;
  phone: string;
  level: string;
  group: string;
  paymentStatus: PaymentStatus;
};

const initialStudents: Student[] = [
  {
    id: 1,
    fullName: "Youssef El Amrani",
    phone: "0612345678",
    level: "1ère Bac",
    group: "Math Group A",
    paymentStatus: "PAID",
  },
  {
    id: 2,
    fullName: "Salma Benali",
    phone: "0622334455",
    level: "Tronc Commun",
    group: "English Group B",
    paymentStatus: "LATE",
  },
  {
    id: 3,
    fullName: "Omar Ait Lahcen",
    phone: "0633445566",
    level: "2ème Bac",
    group: "Physics Group A",
    paymentStatus: "NONE",
  },
];

type StudentFormData = {
  fullName: string;
  phone: string;
  level: string;
  group: string;
  paymentStatus: PaymentStatus;
};

const emptyForm: StudentFormData = {
  fullName: "",
  phone: "",
  level: "",
  group: "",
  paymentStatus: "NONE",
};

function getStatusClasses(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-700";
    case "LATE":
      return "bg-amber-100 text-amber-700";
    case "NONE":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<StudentFormData>(emptyForm);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const term = search.toLowerCase();
      return (
        student.fullName.toLowerCase().includes(term) ||
        student.phone.toLowerCase().includes(term) ||
        student.level.toLowerCase().includes(term) ||
        student.group.toLowerCase().includes(term)
      );
    });
  }, [students, search]);

  function openAddModal() {
    setEditingStudentId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(student: Student) {
    setEditingStudentId(student.id);
    setFormData({
      fullName: student.fullName,
      phone: student.phone,
      level: student.level,
      group: student.group,
      paymentStatus: student.paymentStatus,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingStudentId(null);
    setFormData(emptyForm);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.level || !formData.group) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingStudentId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudentId
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );
    } else {
      const newStudent: Student = {
        id: Date.now(),
        ...formData,
      };

      setStudents((prev) => [newStudent, ...prev]);
    }

    closeModal();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="mt-1 text-slate-600">
            Manage students, groups, and payment status.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search by name, phone, level, or group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sc-input"
        />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Full Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Group</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-slate-200 text-slate-700"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {student.fullName}
                    </td>
                    <td className="px-4 py-3">{student.phone}</td>
                    <td className="px-4 py-3">{student.level}</td>
                    <td className="px-4 py-3">{student.group}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          student.paymentStatus
                        )}`}
                      >
                        {student.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(student)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(student.id)}
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
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingStudentId !== null ? "Edit Student" : "Add Student"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Fill in the student information below.
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="Enter full name"
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
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Level
                </label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="Ex: 1ère Bac"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Group
                </label>
                <input
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="Ex: Math Group A"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="sc-select"
                >
                  <option value="PAID">PAID</option>
                  <option value="LATE">LATE</option>
                  <option value="NONE">NONE</option>
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
                  {editingStudentId !== null ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}