import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  nivel: number;
}

export default function ProgressBar({ current, total, nivel }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Nivel {nivel} - Întrebare {current} din {total}
        </span>
        <span className="text-muted-foreground">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" data-testid="progress-bar" />
    </div>
  );
}
