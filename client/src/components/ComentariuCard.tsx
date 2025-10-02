import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Play, Edit } from "lucide-react";
import type { Comentariu } from "@shared/schema";

interface ComentariuCardProps {
  comentariu: Comentariu;
  onStart?: () => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

export default function ComentariuCard({
  comentariu,
  onStart,
  onEdit,
  showEdit = false,
}: ComentariuCardProps) {
  const Icon = comentariu.tip === "poezie" ? BookOpen : FileText;

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
      <CardContent>
        <p className="text-sm line-clamp-3 text-muted-foreground">
          {comentariu.context}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
        <Button
          className="flex-1"
          onClick={onStart}
          data-testid="button-start-drill"
        >
          <Play className="h-4 w-4 mr-2" />
          Începe exercițiile
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
