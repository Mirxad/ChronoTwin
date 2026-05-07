import type { DayForecast } from "@/lib/types";

export default function WeekTimeline({ days }: { days: DayForecast[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
      <h3 className="text-lg font-bold">Week timeline</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-7">
        {days.map((day) => (
          <div key={day.day} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
            <p className="font-black text-white">{day.day}</p>
            <p className="mt-2 text-2xl font-black text-cyan">{day.stress}</p>
            <p className="text-xs text-slate-400">{day.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
