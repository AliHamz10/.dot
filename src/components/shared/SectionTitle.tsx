import { SectionIndicator } from "@/components/layout/SectionIndicator";

interface SectionTitleProps {
  number: string;
  label: string;
  title: string;
}

export function SectionTitle({ number, label, title }: SectionTitleProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <SectionIndicator number={number} />
        <span className="text-xs uppercase tracking-[0.28em] text-accent">{label}</span>
      </div>
      <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight">{title}</h2>
    </div>
  );
}
