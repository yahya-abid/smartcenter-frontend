"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import * as XLSX from "xlsx";

type RevenueItem = {
  month: string;
  amount: number;
};

type AttendanceHistoryItem = {
  id: number;
  date: string;
  group: string;
  presentCount: number;
  absentCount: number;
};

type StudentsByGroupItem = {
  group: string;
  total: number;
};

const revenueData: RevenueItem[] = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 5100 },
  { month: "Mar", amount: 4800 },
  { month: "Apr", amount: 6200 },
  { month: "May", amount: 5700 },
  { month: "Jun", amount: 6900 },
];

const attendanceHistory: AttendanceHistoryItem[] = [
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

const studentsByGroup: StudentsByGroupItem[] = [
  { group: "Math Group A", total: 3 },
  { group: "English Group B", total: 2 },
  { group: "Physics Group A", total: 2 },
];

const recentActivities = [
  {
    id: 1,
    title: "Monthly revenue report generated",
    date: "2026-04-29",
  },
  {
    id: 2,
    title: "Attendance report prepared",
    date: "2026-04-28",
  },
  {
    id: 3,
    title: "Student distribution summary updated",
    date: "2026-04-27",
  },
];

type PeriodOption = "Last 3 Months" | "Last 6 Months" | "All Data";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodOption>("Last 6 Months");

  const visibleRevenueData = useMemo(() => {
    if (selectedPeriod === "Last 3 Months") {
      return revenueData.slice(-3);
    }

    if (selectedPeriod === "Last 6 Months") {
      return revenueData.slice(-6);
    }

    return revenueData;
  }, [selectedPeriod]);

  const totalRevenue = useMemo(() => {
    return visibleRevenueData.reduce((sum, item) => sum + item.amount, 0);
  }, [visibleRevenueData]);

  const attendanceByGroup = useMemo(() => {
    return attendanceHistory.map((item) => {
      const total = item.presentCount + item.absentCount;
      const percentage =
        total === 0 ? 0 : Math.round((item.presentCount / total) * 100);

      return {
        group: item.group,
        percentage,
        presentCount: item.presentCount,
        absentCount: item.absentCount,
      };
    });
  }, []);

  const averageAttendance = useMemo(() => {
    if (attendanceByGroup.length === 0) return 0;

    const total = attendanceByGroup.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    return Math.round(total / attendanceByGroup.length);
  }, [attendanceByGroup]);

  const totalStudents = useMemo(() => {
    return studentsByGroup.reduce((sum, item) => sum + item.total, 0);
  }, []);

  const latePayments = 6;

  const maxRevenue =
    visibleRevenueData.length > 0
      ? Math.max(...visibleRevenueData.map((item) => item.amount))
      : 1;

  function exportToPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SmartCenter Reports", 14, 18);

    doc.setFontSize(11);
    doc.text(`Period: ${selectedPeriod}`, 14, 26);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Total Revenue", `${totalRevenue} MAD`],
        ["Average Attendance", `${averageAttendance}%`],
        ["Total Students", `${totalStudents}`],
        ["Late Payments", `${latePayments}`],
      ],
    });

    autoTable(doc, {
      startY: 85,
      head: [["Month", "Revenue (MAD)"]],
      body: visibleRevenueData.map((item) => [
        item.month,
        item.amount.toString(),
      ]),
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 120;

    autoTable(doc, {
      startY: finalY + 10,
      head: [["Group", "Attendance %", "Present", "Absent"]],
      body: attendanceByGroup.map((item) => [
        item.group,
        `${item.percentage}%`,
        item.presentCount.toString(),
        item.absentCount.toString(),
      ]),
    });

    doc.save("smartcenter-reports.pdf");
  }

  function exportToExcel() {
    const summarySheet = XLSX.utils.json_to_sheet([
      {
        Period: selectedPeriod,
        TotalRevenueMAD: totalRevenue,
        AverageAttendancePercent: averageAttendance,
        TotalStudents: totalStudents,
        LatePayments: latePayments,
      },
    ]);

    const revenueSheet = XLSX.utils.json_to_sheet(visibleRevenueData);
    const attendanceSheet = XLSX.utils.json_to_sheet(attendanceByGroup);
    const groupsSheet = XLSX.utils.json_to_sheet(studentsByGroup);
    const activitySheet = XLSX.utils.json_to_sheet(recentActivities);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
    XLSX.utils.book_append_sheet(workbook, revenueSheet, "Revenue");
    XLSX.utils.book_append_sheet(workbook, attendanceSheet, "Attendance");
    XLSX.utils.book_append_sheet(workbook, groupsSheet, "StudentsByGroup");
    XLSX.utils.book_append_sheet(workbook, activitySheet, "RecentActivity");

    XLSX.writeFile(workbook, "smartcenter-reports.xlsx");
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="mt-1 text-slate-600">
            Revenue, attendance, student distribution, and exports.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as PeriodOption)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
          >
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="All Data">All Data</option>
          </select>

          <button
            onClick={exportToPDF}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Export PDF
          </button>

          <button
            onClick={exportToExcel}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalRevenue.toLocaleString()} MAD
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Average Attendance</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {averageAttendance}%
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Total Students</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Late Payments</p>
          <p className="mt-2 text-2xl font-bold text-rose-600">
            {latePayments}
          </p>
        </div>
      </div>

      {/* Revenue chart + Attendance overview */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Revenue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Revenue Overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Revenue summary based on the selected period.
          </p>

          <div className="mt-6 flex items-end gap-3">
            {visibleRevenueData.map((item) => {
              const height = (item.amount / maxRevenue) * 180;

              return (
                <div key={item.month} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t-xl bg-slate-900"
                    style={{ height: `${height}px` }}
                    title={`${item.amount} MAD`}
                  />
                  <p className="mt-2 text-xs font-medium text-slate-600">
                    {item.month}
                  </p>
                  <p className="text-xs text-slate-500">{item.amount}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Attendance Overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Attendance percentage by group from attendance history.
          </p>

          <div className="mt-6 space-y-4">
            {attendanceByGroup.map((item) => (
              <div key={item.group}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">{item.group}</span>
                  <span className="font-semibold text-slate-600">
                    {item.percentage}%
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students by group + Recent activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Students by group */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Students by Group</h2>
          <p className="mt-1 text-sm text-slate-600">
            Current student distribution by active group.
          </p>

          <div className="mt-6 space-y-4">
            {studentsByGroup.map((item) => {
              const percentage = Math.round((item.total / totalStudents) * 100);

              return (
                <div key={item.group}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-800">{item.group}</span>
                    <span className="font-semibold text-slate-600">
                      {item.total} students
                    </span>
                  </div>

                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recent Report Activity</h2>
          <p className="mt-1 text-sm text-slate-600">
            Recent reporting actions and generated summaries.
          </p>

          <div className="mt-6 space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-medium text-slate-900">{activity.title}</p>
                <p className="mt-1 text-sm text-slate-500">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}