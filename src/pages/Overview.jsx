
import React, { useState } from 'react';
import { overviewData } from '../data/overviewData';

function KpiCard({ title, value, suffix, subtitle, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-sm font-semibold text-on-surface-variant">{title}</p>
        <span className="material-symbols-outlined text-secondary text-xl">
          {icon}
        </span>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-extrabold text-primary tabular-nums">
          {value}
        </span>
        <span className="text-lg font-semibold text-primary">{suffix}</span>
      </div>
      <p className="text-xs text-on-surface-variant mt-2">{subtitle}</p>
    </div>
  );
}

function PerformanceChart({ data }) {
  const maxValue = 100;

  return (
    <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-primary">Semester Performance</h3>
        <p className="text-sm text-on-surface-variant">
          Average marks across semesters
        </p>
      </div>

      <div className="flex items-end gap-3 h-52">
        {data.filter(item => item.id !== 'all').map((item) => (
          <div key={item.id} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-primary">
              {item.averageMarks}%
            </span>
            <div className="w-full flex items-end h-40">
              <div
                className="w-full rounded-t-lg bg-secondary hover:bg-tertiary-fixed-dim transition-all"
                style={{ height: `${(item.averageMarks / maxValue) * 100}%` }}
                title={`${item.label}: ${item.averageMarks}%`}
              />
            </div>
            <span className="text-xs text-on-surface-variant">
              {item.id.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CgpaDistribution({ data }) {
  const total = data.reduce((sum, item) => sum + item.students, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <h3 className="text-lg font-bold text-primary">CGPA Distribution</h3>
      <p className="text-sm text-on-surface-variant mb-6">
        Students grouped by CGPA range
      </p>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = (item.students / total) * 100;

          return (
            <div key={item.band}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-on-surface">{item.band}</span>
                <span className="text-on-surface-variant tabular-nums">
                  {item.students.toLocaleString()} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-full rounded-full bg-secondary"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Overview() {
  const [selectedSemester, setSelectedSemester] = useState('all');

  const currentData = overviewData.semesters.find(
    (semester) => semester.id === selectedSemester
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">
            Executive Summary
          </p>
          <h2 className="text-2xl font-extrabold text-primary mt-1">
            Institutional Overview
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Academic performance and institutional health indicators.
          </p>
        </div>

        <select
          value={selectedSemester}
          onChange={(event) => setSelectedSemester(event.target.value)}
          className="bg-white border border-outline-variant rounded-xl px-4 py-3 text-sm font-semibold text-primary outline-none focus:ring-2 focus:ring-secondary"
        >
          {overviewData.semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <span className="material-symbols-outlined text-secondary">info</span>
        <p className="text-xs text-secondary font-medium">
          Demonstration dashboard — all displayed figures use synthetic sample data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Active Students"
          value={currentData.students.toLocaleString()}
          suffix=""
          subtitle="Students in selected semester"
          icon="groups"
        />
        <KpiCard
          title="Average Marks"
          value={currentData.averageMarks}
          suffix="%"
          subtitle="Academic performance"
          icon="analytics"
        />
        <KpiCard
          title="Attendance"
          value={currentData.attendance}
          suffix="%"
          subtitle="Average student attendance"
          icon="event_available"
        />
        <KpiCard
          title="Pass Rate"
          value={currentData.passRate}
          suffix="%"
          subtitle="Successful academic outcomes"
          icon="school"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PerformanceChart data={overviewData.semesters} />
        <CgpaDistribution data={overviewData.cgpaDistribution} />
      </div>

      <div className="bg-primary rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-primary-fixed-dim font-semibold">
            Institutional Retention
          </p>
          <p className="text-3xl font-extrabold mt-1">
            {overviewData.retentionRate}%
          </p>
          <p className="text-xs text-primary-fixed-dim mt-2">
            Overall illustrative retention indicator
          </p>
        </div>
        <span className="material-symbols-outlined text-tertiary-fixed text-5xl">
          trending_up
        </span>
      </div>
    </div>
  );
}
