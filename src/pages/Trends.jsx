
import React from 'react';
import { overviewData } from '../data/overviewData';

function TrendCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-[#06102b]">{value}</h3>
      <p className="mt-2 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

function LineChart({ data, dataKey, title, color, suffix = '' }) {
  const values = data.map(item => item[dataKey]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => ({
    x: 35 + index * (330 / (values.length - 1)),
    y: 145 - ((value - min) / range) * 105,
    value
  }));

  const line = points.map(point => `${point.x},${point.y}`).join(' ');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-[#06102b]">{title}</h3>

      <div className="mt-5">
        <svg viewBox="0 0 390 190" className="w-full">
          {[40, 75, 110, 145].map(y => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="370"
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
          ))}

          <polyline
            points={line}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={color}
              />
              <text
                x={point.x}
                y="170"
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                S{index + 1}
              </text>
              <text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fontSize="9"
                fill="#475569"
              >
                {point.value}{suffix}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function Trends() {
  const semesters = overviewData.semesters.filter(
    semester => semester.id !== 'all'
  );

  const first = semesters[0];
  const latest = semesters[semesters.length - 1];

  const cgpaGrowth = (
    latest.averageCgpa - first.averageCgpa
  ).toFixed(2);

  const marksGrowth = (
    latest.averageMarks - first.averageMarks
  ).toFixed(1);

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-blue-600">
          ACADEMIC ANALYTICS
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#06102b]">
          CGPA & Performance Trends
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track academic progress and performance patterns across semesters.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Demo data: All figures displayed on this page are illustrative and
        do not represent verified institutional records.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TrendCard
          title="Latest Average CGPA"
          value={latest.averageCgpa.toFixed(2)}
          subtitle="Semester 7"
        />
        <TrendCard
          title="CGPA Growth"
          value={`+${cgpaGrowth}`}
          subtitle="Semester 1 to Semester 7"
        />
        <TrendCard
          title="Latest Average Marks"
          value={`${latest.averageMarks}%`}
          subtitle="Semester 7"
        />
        <TrendCard
          title="Marks Improvement"
          value={`+${marksGrowth}%`}
          subtitle="Semester 1 to Semester 7"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <LineChart
          data={semesters}
          dataKey="averageCgpa"
          title="Average CGPA Trend"
          color="#0058bd"
        />

        <LineChart
          data={semesters}
          dataKey="averageMarks"
          title="Average Marks Trend"
          color="#00a98f"
          suffix="%"
        />

        <LineChart
          data={semesters}
          dataKey="attendance"
          title="Attendance Trend"
          color="#7c3aed"
          suffix="%"
        />

        <LineChart
          data={semesters}
          dataKey="passRate"
          title="Pass Rate Trend"
          color="#ea8a19"
          suffix="%"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-[#06102b]">
          Academic Performance Summary
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The illustrative dataset shows a gradual improvement in academic
          performance from Semester 1 to Semester 7. Average CGPA,
          marks, attendance and pass rate all demonstrate an upward trend.
          These patterns can help academic administrators identify
          progress and areas requiring attention.
        </p>
      </div>

    </div>
  );
}
