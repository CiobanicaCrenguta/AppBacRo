import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StreakCounterProps {
  streak: number;
  scor: number;
}

export default function StreakCounter({ streak, scor }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-warning" />
        <span className="text-sm font-medium" data-testid="text-streak">
          Streak: {streak}
        </span>
      </div>
      <Badge variant="secondary" data-testid="badge-scor">
        Scor: {scor}
      </Badge>
    </div>
  );
}
