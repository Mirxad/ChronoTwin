import { cn } from "@/lib/utils";

export default function StatCard({ label, value, suffix = "%", tone = "cyan" }: { label: string; value: number; suffix?: string; tone?: "cyan" | "violet" | "mint" | "rose" }) {
  const color = { cyan: "from-cyan/30 to-cyan/5 text-cyan", violet: "from-aurora/30 to-aurora/5 text-violet-200", mint: "from-mint/30 to-mint/5 text-mint", rose: "from-rose-500/30 to-rose-500/5 text-rose-200" }[tone];
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-gradient-to-br p-5 shadow-glow backdrop-blur-xl", color)}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-black text-white">{value}<span className="text-xl text-slate-400">{suffix}</span></p>
    </div>
  );
}
