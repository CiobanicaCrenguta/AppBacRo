import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, Play, Edit, Trash2, AlertCircle, Eye } from "lucide-react";
import type { Comentariu, Drills } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { storageService } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface ComentariuCardProps {
  comentariu: Comentariu;
  drills?: Drills;
  onStart?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showEdit?: boolean;
  onView?: () => void;
}

export default function ComentariuCard({
  comentariu,
  drills,
  onStart,
  onEdit,
  onDelete,
  showEdit = false,
  onView,
}: ComentariuCardProps) {
  const Icon = comentariu.tip === "poezie" ? BookOpen : FileText;
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setLocation] = useLocation();

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

  const handleDelete = async () => {
    if (!password.trim()) {
      toast({
        title: "Eroare",
        description: "Trebuie să introduci parola",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      await storageService.deleteComentariu(comentariu.id, password);
      toast({
        title: "Succes!",
        description: "Comentariul a fost șters",
      });
      setIsDialogOpen(false);
      setPassword("");
      if (onDelete) onDelete();
      window.dispatchEvent(new Event("storage-update"));
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Parolă incorectă",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              data-testid="button-edit"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" data-testid="button-delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Șterge comentariul</AlertDialogTitle>
                  <AlertDialogDescription>
                    Această acțiune nu poate fi anulată. Pentru a șterge comentariul, 
                    introdu parola de administrator.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2 py-4">
                  <Label htmlFor="delete-password">Parolă</Label>
                  <Input
                    id="delete-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introdu parola"
                    data-testid="input-delete-password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleDelete();
                    }}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setPassword("")}
                    data-testid="button-cancel-delete"
                  >
                    Anulează
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    data-testid="button-confirm-delete"
                  >
                    {isDeleting ? "Se șterge..." : "Șterge"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        {/* Buton vizualizare completă */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (onView) onView();
            else setLocation(`/view/${comentariu.id}`);
          }}
          data-testid="button-view"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
