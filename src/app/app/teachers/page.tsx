"use client";

import { useMemo, useState } from "react";

type Teacher = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  assignedGroups: string;
};

const initialTeachers: Teacher[] = [
  {
    id: 1,
    fullName: "Ahmed El Idrissi",
    phone: "0611223344",
    email: "ahmed@smartcenter.com",
    subject: "Mathematics",
    assignedGroups: "Math Group A, Math Group B",
  },
  {
    id: 2,
    fullName: "Sara Benhima",
    phone: "0622445566",
    email: "sara@smartcenter.com",
    subject: "English",
    assignedGroups: "English Group A",
  },
  {
    id: 3,
    fullName: "Yassine Ouali",
    phone: "0633556677",
    email: "yassine@smartcenter.com",
    subject: "Physics",
    assignedGroups: "Physics Group A, Physics Group C",
  },
];

type TeacherFormData = {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  assignedGroups: string;
};

const emptyForm: TeacherFormData = {
  fullName: "",
  phone: "",
  email: "",
  subject: "",
  assignedGroups: "",
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null);
  const [formData, setFormData] = useState<TeacherFormData>(emptyForm);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const term = search.toLowerCase();
      return (
        teacher.fullName.toLowerCase().includes(term) ||
        teacher.phone.toLowerCase().includes(term) ||
        teacher.email.toLowerCase().includes(term) ||
        teacher.subject.toLowerCase().includes(term) ||
        teacher.assignedGroups.toLowerCase().includes(term)
      );
    });
  }, [teachers, search]);

  function openAddModal() {
    setEditingTeacherId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(teacher: Teacher) {
    setEditingTeacherId(teacher.id);
    setFormData({
      fullName: teacher.fullName,
      phone: teacher.phone,
      email: teacher.email,
      subject: teacher.subject,
      assignedGroups: teacher.assignedGroups,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTeacherId(null);
    setFormData(emptyForm);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.assignedGroups
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingTeacherId !== null) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editingTeacherId
            ? {
                ...teacher,
                ...formData,
              }
            : teacher
        )
      );
    } else {
      const newTeacher: Teacher = {
        id: Date.now(),
        ...formData,
      };

      setTeachers((prev) => [newTeacher, ...prev]);
    }

    closeModal();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmed) return;

    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teachers</h1>
          <p className="mt-1 text-slate-600">
            Manage teachers, subjects, and assigned groups.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search by name, phone, email, subject, or group..."
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
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Assigned Groups</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No teachers found.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-t border-slate-200 text-slate-700"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {teacher.fullName}
                    </td>
                    <td className="px-4 py-3">{teacher.phone}</td>
                    <td className="px-4 py-3">{teacher.email}</td>
                    <td className="px-4 py-3">{teacher.subject}</td>
                    <td className="px-4 py-3">{teacher.assignedGroups}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(teacher.id)}
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
                  {editingTeacherId !== null ? "Edit Teacher" : "Add Teacher"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Fill in the teacher information below.
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

              <div className="grid gap-4 md:grid-cols-2">
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

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="Ex: Mathematics"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Assigned Groups
                </label>
                <textarea
                  name="assignedGroups"
                  value={formData.assignedGroups}
                  onChange={handleChange}
                  rows={4}
                  className="sc-textarea"
                  placeholder="Ex: Math Group A, Math Group B"
                />
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
                  {editingTeacherId !== null ? "Save Changes" : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}