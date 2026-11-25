
import React from 'react';
import { subjectData } from '../data/subjectData';

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-[#06102b]">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

function SubjectBar({ subject, value, color, suffix = '%' }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{subject}</span>
        <span className="font-semibold text-slate-600">
          {value}{suffix}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function SubjectAnalytics() {
  const averageMarks = (
    subjectData.reduce((sum, item) => sum + item.averageMarks, 0) /
    subjectData.length
  ).toFixed(1);

  const averageAttendance = (
    subjectData.reduce((sum, item) => sum + item.attendance, 0) /
    subjectData.length
  ).toFixed(1);

  const strongestSubject = [...subjectData].sort(
    (a, b) => b.averageMarks - a.averageMarks
  )[0];

  const lowAttendance = subjectData.filter(
    item => item.attendance < 80
  );

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-blue-600">
          ACADEMIC ANALYTICS
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#06102b]">
          Subject & Attendance Analytics
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Compare subject performance and monitor attendance patterns.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Demo data: All figures are illustrative and do not represent
        verified institutional records.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Subjects Analysed"
          value={subjectData.length}
          subtitle="Across the selected cohort"
        />

        <MetricCard
          title="Average Subject Marks"
          value={`${averageMarks}%`}
          subtitle="Mean across all subjects"
        />

        <MetricCard
          title="Average Attendance"
          value={`${averageAttendance}%`}
          subtitle="Mean across all subjects"
        />

        <MetricCard
          title="Strongest Subject"
          value={strongestSubject.code}
          subtitle={strongestSubject.subject}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-[#06102b]">
            Subject-wise Average Marks
          </h3>
          <p className="mb-6 mt-1 text-xs text-slate-400">
            Average marks percentage by subject
          </p>

          <div className="space-y-5">
            {subjectData.map(item => (
              <SubjectBar
                key={item.code}
                subject={item.subject}
                value={item.averageMarks}
                color="#0058bd"
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-[#06102b]">
            Attendance by Subject
          </h3>
          <p className="mb-6 mt-1 text-xs text-slate-400">
            Attendance percentage by subject
          </p>

          <div className="space-y-5">
            {subjectData.map(item => (
              <SubjectBar
                key={item.code}
                subject={item.subject}
                value={item.attendance}
                color={item.attendance < 80 ? '#ef4444' : '#00a98f'}
              />
            ))}
          </div>
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold text-[#06102b]">
            Subject Performance Report
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Detailed academic comparison
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Code</th>
                <th className="px-5 py-4">Average Marks</th>
                <th className="px-5 py-4">Attendance</th>
                <th className="px-5 py-4">Pass Rate</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {subjectData.map(item => (
                <tr key={item.code}>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {item.subject}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {item.code}
                  </td>
                  <td className="px-5 py-4">{item.averageMarks}%</td>
                  <td className="px-5 py-4">{item.attendance}%</td>
                  <td className="px-5 py-4">{item.passRate}%</td>
                  <td className="px-5 py-4">
                    {item.attendance < 80 ? (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                        Low Attendance
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                        On Track
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">
          Attendance Attention Required
        </h3>

        {lowAttendance.length > 0 ? (
          <div className="mt-3 space-y-2">
            {lowAttendance.map(item => (
              <p key={item.code} className="text-sm text-amber-800">
                <strong>{item.subject}</strong> ({item.code}) has
                attendance of {item.attendance}%.
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-amber-800">
            No subjects are currently below the attendance threshold.
          </p>
        )}
      </div>

    </div>
  );
}
