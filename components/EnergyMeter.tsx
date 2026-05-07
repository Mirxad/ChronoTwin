export default function EnergyMeter({ value }: { value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between"><h3 className="font-bold">Energy alignment</h3><span className="text-cyan">{value}%</span></div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-aurora to-cyan" style={{ width: `${value}%` }} /></div>
      <p className="mt-3 text-sm text-slate-400">Study blocks are tuned to your preferred energy pattern.</p>
    </div>
  );
}
