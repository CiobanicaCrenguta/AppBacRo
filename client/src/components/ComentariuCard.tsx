import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Play, Edit, AlertCircle } from "lucide-react";
import type { Comentariu, Drills } from "@shared/schema";

interface ComentariuCardProps {
  comentariu: Comentariu;
  drills?: Drills;
  onStart?: () => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

export default function ComentariuCard({
  comentariu,
  drills,
  onStart,
  onEdit,
  showEdit = false,
}: ComentariuCardProps) {
  const Icon = comentariu.tip === "poezie" ? BookOpen : FileText;

  // Check if there are any drills
  const hasDrills = drills && (
    drills.nivel1.length > 0 ||
    drills.nivel2.length > 0 ||
    drills.nivel3.length > 0 ||
    drills.nivel4.length > 0 ||
    drills.nivel5.length > 0
  );

  const totalDrills = drills 
    ? drills.nivel1.length + drills.nivel2.length + drills.nivel3.length + 
      drills.nivel4.length + drills.nivel5.length
    : 0;

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary flex-shrink-0" />
            <h3 className="text-xl font-semibold leading-tight">{comentariu.titlu}</h3>
          </div>
          <Badge variant="secondary" data-testid={`badge-${comentariu.tip}`}>
            {comentariu.tip}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{comentariu.autor}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-3 text-muted-foreground">
          {comentariu.context}
        </p>
        {drills && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {!hasDrills && (
              <>
                <AlertCircle className="h-4 w-4 text-warning" />
                <span>Fără exerciții</span>
              </>
            )}
            {hasDrills && (
              <span>{totalDrills} exerciții în {[
                drills.nivel1.length > 0 ? 1 : 0,
                drills.nivel2.length > 0 ? 1 : 0,
                drills.nivel3.length > 0 ? 1 : 0,
                drills.nivel4.length > 0 ? 1 : 0,
                drills.nivel5.length > 0 ? 1 : 0,
              ].reduce((a, b) => a + b, 0)} niveluri</span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
        <Button
          className="flex-1"
          onClick={onStart}
          disabled={!hasDrills}
          data-testid="button-start-drill"
        >
          <Play className="h-4 w-4 mr-2" />
          {hasDrills ? "Începe exercițiile" : "Fără exerciții"}
        </Button>
        {showEdit && (
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            data-testid="button-edit"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
