import type { Scenario } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FutureScenarioCard({ scenario, recommended = false }: { scenario: Scenario; recommended?: boolean }) {
  return (
    <article className={cn("rounded-2xl border bg-white/[0.055] p-5 shadow-glow backdrop-blur-xl", recommended ? "border-cyan/50" : "border-white/10")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{scenario.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{scenario.description}</p>
        </div>
        {recommended && <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-bold text-cyan ring-1 ring-cyan/30">Recommended</span>}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {[['Stress', scenario.stress], ['Prepared', scenario.preparedness], ['Sleep', scenario.sleepStability], ['Burnout', scenario.burnoutRisk]].map(([label, value]) => (
          <div key={label as string} className="rounded-xl bg-white/5 p-3">
            <p className="text-slate-400">{label}</p><p className="text-2xl font-black text-white">{value}%</p>
          </div>
        ))}
      </div>
    </article>
  );
}
