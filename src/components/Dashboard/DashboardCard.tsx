import * as React from 'react';

export default function DashboardCard(props) {
  return (
    <div
      className="rounded-2xl border p-0 shadow-lg backdrop-blur-sm transition hover:shadow-2xl"
      style={{
        borderColor: 'rgba(240, 194, 255, 0.24)',
        background: 'rgba(244, 237, 234, 0.08)',
      }}
      {...props}
    />
  );
}
