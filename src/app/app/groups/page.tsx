"use client";

import { useMemo, useState } from "react";

type Group = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  schedule: string;
  room: string;
};

const initialGroups: Group[] = [
  {
    id: 1,
    name: "Math Group A",
    subject: "Mathematics",
    teacher: "Ahmed El Idrissi",
    schedule: "Mon & Wed - 18:00",
    room: "Room 1",
  },
  {
    id: 2,
    name: "English Group B",
    subject: "English",
    teacher: "Sara Benhima",
    schedule: "Tue & Thu - 17:00",
    room: "Room 2",
  },
  {
    id: 3,
    name: "Physics Group A",
    subject: "Physics",
    teacher: "Yassine Ouali",
    schedule: "Sat - 10:00",
    room: "Room 3",
  },
];

type GroupFormData = {
  name: string;
  subject: string;
  teacher: string;
  schedule: string;
  room: string;
};

const emptyForm: GroupFormData = {
  name: "",
  subject: "",
  teacher: "",
  schedule: "",
  room: "",
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [formData, setFormData] = useState<GroupFormData>(emptyForm);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const term = search.toLowerCase();
      return (
        group.name.toLowerCase().includes(term) ||
        group.subject.toLowerCase().includes(term) ||
        group.teacher.toLowerCase().includes(term) ||
        group.schedule.toLowerCase().includes(term) ||
        group.room.toLowerCase().includes(term)
      );
    });
  }, [groups, search]);

  function openAddModal() {
    setEditingGroupId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(group: Group) {
    setEditingGroupId(group.id);
    setFormData({
      name: group.name,
      subject: group.subject,
      teacher: group.teacher,
      schedule: group.schedule,
      room: group.room,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingGroupId(null);
    setFormData(emptyForm);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.subject ||
      !formData.teacher ||
      !formData.schedule ||
      !formData.room
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingGroupId !== null) {
      setGroups((prev) =>
        prev.map((group) =>
          group.id === editingGroupId
            ? {
                ...group,
                ...formData,
              }
            : group
        )
      );
    } else {
      const newGroup: Group = {
        id: Date.now(),
        ...formData,
      };

      setGroups((prev) => [newGroup, ...prev]);
    }

    closeModal();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this group?");
    if (!confirmed) return;

    setGroups((prev) => prev.filter((group) => group.id !== id));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Groups</h1>
          <p className="mt-1 text-slate-600">
            Manage classes/groups, teachers, schedules, and rooms.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Add Group
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search by group, subject, teacher, schedule, or room..."
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
                <th className="px-4 py-3 font-semibold">Group Name</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Teacher</th>
                <th className="px-4 py-3 font-semibold">Schedule</th>
                <th className="px-4 py-3 font-semibold">Room</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredGroups.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No groups found.
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <tr
                    key={group.id}
                    className="border-t border-slate-200 text-slate-700"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {group.name}
                    </td>
                    <td className="px-4 py-3">{group.subject}</td>
                    <td className="px-4 py-3">{group.teacher}</td>
                    <td className="px-4 py-3">{group.schedule}</td>
                    <td className="px-4 py-3">{group.room}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(group)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(group.id)}
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
                  {editingGroupId !== null ? "Edit Group" : "Add Group"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Fill in the group information below.
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
                  Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="sc-input"
                  placeholder="Ex: Math Group A"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                    Teacher
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    className="sc-input"
                    placeholder="Ex: Ahmed El Idrissi"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Schedule
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="sc-input"
                    placeholder="Ex: Mon & Wed - 18:00"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Room
                  </label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="sc-input"
                    placeholder="Ex: Room 1"
                  />
                </div>
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
                  {editingGroupId !== null ? "Save Changes" : "Add Group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}