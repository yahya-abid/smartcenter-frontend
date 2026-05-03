"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

type AttendanceStatus = "PRESENT" | "ABSENT";

type AttendanceStudent = {
  id: number;
  fullName: string;
  group: string;
  status: AttendanceStatus;
};

const initialAttendanceStudents: AttendanceStudent[] = [
  { id: 1, fullName: "Youssef El Amrani", group: "Math Group A", status: "PRESENT" },
  { id: 2, fullName: "Salma Benali", group: "Math Group A", status: "ABSENT" },
  { id: 3, fullName: "Omar Ait Lahcen", group: "Math Group A", status: "PRESENT" },
  { id: 4, fullName: "Imane Chraibi", group: "English Group B", status: "PRESENT" },
  { id: 5, fullName: "Zakaria Moutaoukil", group: "English Group B", status: "ABSENT" },
  { id: 6, fullName: "Rania El Fassi", group: "Physics Group A", status: "PRESENT" },
  { id: 7, fullName: "Anas Berrada", group: "Physics Group A", status: "ABSENT" },
];

const mockHistory = [
  {
    id: 1,
    date: "2026-04-29",
    group: "Math Group A",
    presentCount: 2,
    absentCount: 1,
  },
  {
    id: 2,
    date: "2026-04-28",
    group: "English Group B",
    presentCount: 1,
    absentCount: 1,
  },
  {
    id: 3,
    date: "2026-04-27",
    group: "Physics Group A",
    presentCount: 1,
    absentCount: 1,
  },
];

function getAttendanceVariant(status: AttendanceStatus) {
  return status === "PRESENT" ? "success" : "danger";
}

export default function AttendancePage() {
  const [students, setStudents] = useState<AttendanceStudent[]>(
    initialAttendanceStudents
  );
  const [selectedGroup, setSelectedGroup] = useState("Math Group A");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");

  const groups = useMemo(() => {
    return Array.from(new Set(initialAttendanceStudents.map((s) => s.group)));
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.toLowerCase();

    return students.filter((student) => {
      return (
        student.group === selectedGroup &&
        student.fullName.toLowerCase().includes(term)
      );
    });
  }, [students, selectedGroup, search]);

  const presentCount = filteredStudents.filter(
    (student) => student.status === "PRESENT"
  ).length;

  const absentCount = filteredStudents.filter(
    (student) => student.status === "ABSENT"
  ).length;

  function setStudentStatus(id: number, status: AttendanceStatus) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  }

  function handleSaveAttendance() {
    alert(
      `Attendance saved for ${selectedGroup} on ${selectedDate}.\nPresent: ${presentCount}\nAbsent: ${absentCount}`
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Mark student attendance by group and track daily participation."
        action={
          <button
            onClick={handleSaveAttendance}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save Attendance
          </button>
        }
      />

      <SectionCard
        title="Filters"
        description="Choose the group, date, and search for a student."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Select Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="sc-select"
            >
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="sc-input"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Search Student
            </label>
            <input
              type="text"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sc-input"
            />
          </div>
        </div>
      </SectionCard>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Selected Group</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {selectedGroup}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Present</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {presentCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Absent</p>
          <p className="mt-2 text-2xl font-bold text-rose-600">
            {absentCount}
          </p>
        </div>
      </div>

      <SectionCard
        title="Attendance List"
        description={`${filteredStudents.length} student(s) found`}
      >
        {filteredStudents.length === 0 ? (
          <EmptyState
            title="No students found"
            description="Try another group or search term."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Group</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Mark Attendance</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-slate-200 text-slate-700 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {student.fullName}
                    </td>
                    <td className="px-4 py-3">{student.group}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        label={student.status}
                        variant={getAttendanceVariant(student.status)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStudentStatus(student.id, "PRESENT")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            student.status === "PRESENT"
                              ? "bg-emerald-600 text-white"
                              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Present
                        </button>

                        <button
                          onClick={() => setStudentStatus(student.id, "ABSENT")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            student.status === "ABSENT"
                              ? "bg-rose-600 text-white"
                              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Attendance History"
        description="Previously saved attendance sessions (mock data for now)."
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Group</th>
                <th className="px-4 py-3 font-semibold">Present</th>
                <th className="px-4 py-3 font-semibold">Absent</th>
              </tr>
            </thead>

            <tbody>
              {mockHistory.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-200 text-slate-700 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.group}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">
                    {item.presentCount}
                  </td>
                  <td className="px-4 py-3 font-semibold text-rose-600">
                    {item.absentCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}