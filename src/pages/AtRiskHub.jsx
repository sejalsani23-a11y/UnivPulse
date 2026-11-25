
import React, { useState } from 'react';
import { riskData } from '../data/riskData';

function RiskCard({ title, value, subtitle, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    High: 'bg-red-50 text-red-600',
    Medium: 'bg-amber-50 text-amber-700',
    Low: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[risk]}`}>
      {risk} Risk
    </span>
  );
}

export default function AtRiskHub() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const highRisk = riskData.filter(student => student.risk === 'High');
  const mediumRisk = riskData.filter(student => student.risk === 'Medium');
  const lowRisk = riskData.filter(student => student.risk === 'Low');

  const filteredStudents = riskData.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase()) ||
      student.department.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = filter === 'All' || student.risk === filter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-blue-600">
          STUDENT SUCCESS & INTERVENTION
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#06102b]">
          At-Risk Student Hub
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Identify students who may need academic support and track intervention priorities.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Demo data: All student records are fictional. Risk categories and
        thresholds are illustrative, not official institutional decisions.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RiskCard
          title="Students Analysed"
          value={riskData.length}
          subtitle="Illustrative student records"
          color="text-[#06102b]"
        />

        <RiskCard
          title="High Risk"
          value={highRisk.length}
          subtitle="Priority intervention"
          color="text-red-600"
        />

        <RiskCard
          title="Medium Risk"
          value={mediumRisk.length}
          subtitle="Needs monitoring"
          color="text-amber-600"
        />

        <RiskCard
          title="Low Risk"
          value={lowRisk.length}
          subtitle="Routine monitoring"
          color="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="font-semibold text-[#06102b]">
            Risk Distribution
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Distribution across the sample student records
          </p>

          <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-red-500"
              style={{ width: `${(highRisk.length / riskData.length) * 100}%` }}
            />
            <div
              className="bg-amber-400"
              style={{ width: `${(mediumRisk.length / riskData.length) * 100}%` }}
            />
            <div
              className="bg-emerald-500"
              style={{ width: `${(lowRisk.length / riskData.length) * 100}%` }}
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div>
              <p className="text-sm font-semibold text-red-600">High</p>
              <p className="mt-1 text-xl font-bold text-[#06102b]">
                {Math.round((highRisk.length / riskData.length) * 100)}%
              </p>
              <p className="text-xs text-slate-400">{highRisk.length} students</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-600">Medium</p>
              <p className="mt-1 text-xl font-bold text-[#06102b]">
                {Math.round((mediumRisk.length / riskData.length) * 100)}%
              </p>
              <p className="text-xs text-slate-400">{mediumRisk.length} students</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600">Low</p>
              <p className="mt-1 text-xl font-bold text-[#06102b]">
                {Math.round((lowRisk.length / riskData.length) * 100)}%
              </p>
              <p className="text-xs text-slate-400">{lowRisk.length} students</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <h3 className="font-semibold text-red-800">
            Priority Attention
          </h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {highRisk.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-red-700">
            Students are classified as high risk in this sample. Prioritise
            academic counselling and faculty mentoring.
          </p>
        </div>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold text-[#06102b]">
              Student Risk Register
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Search and filter student records
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search name, ID or department..."
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={event => setFilter(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-4">Student</th>
                <th className="px-4 py-4">Department</th>
                <th className="px-4 py-4">CGPA</th>
                <th className="px-4 py-4">Attendance</th>
                <th className="px-4 py-4">Failed Subjects</th>
                <th className="px-4 py-4">Risk</th>
                <th className="px-4 py-4">Intervention</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-700">{student.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{student.id}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {student.department}
                  </td>
                  <td className="px-4 py-4 font-medium">{student.cgpa.toFixed(2)}</td>
                  <td className="px-4 py-4">{student.attendance}%</td>
                  <td className="px-4 py-4">{student.failedSubjects}</td>
                  <td className="px-4 py-4">
                    <RiskBadge risk={student.risk} />
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {student.intervention}
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-400">
                    No matching student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Showing {filteredStudents.length} of {riskData.length} sample records
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-[#06102b]">
          Intervention Recommendations
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-red-50 p-4">
            <p className="font-semibold text-red-700">High Risk</p>
            <p className="mt-2 text-sm text-red-600">
              Schedule academic counselling, review failed subjects and
              arrange faculty mentoring.
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 p-4">
            <p className="font-semibold text-amber-700">Medium Risk</p>
            <p className="mt-2 text-sm text-amber-700">
              Monitor attendance, identify learning gaps and provide
              subject-specific support.
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-700">Low Risk</p>
            <p className="mt-2 text-sm text-emerald-700">
              Continue routine progress tracking and encourage consistent
              academic performance.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
