import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ComentariuCard from "@/components/ComentariuCard";
import { mockComentarii } from "@/lib/mockData";
import { storageService } from "@/lib/storage";
import type { ComentariuComplet } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [comentarii, setComentarii] = useState<ComentariuComplet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComentarii = async () => {
    setIsLoading(true);
    await storageService.initializeWithMockData(mockComentarii);
    const data = await storageService.getComentarii();
    setComentarii(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadComentarii();
  }, []);

  useEffect(() => {
    const handleStorage = async () => {
      const data = await storageService.getComentarii();
      setComentarii(data);
    };
    
    window.addEventListener("storage-update", handleStorage);
    return () => window.removeEventListener("storage-update", handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Comentarii Literare</h1>
            <p className="text-muted-foreground">
              Alege un comentariu pentru a începe exercițiile
            </p>
          </div>
          <Button
            onClick={() => setLocation("/editor/new")}
            data-testid="button-add-new"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adaugă comentariu
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Se încarcă...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comentarii.map((item) => (
                <ComentariuCard
                  key={item.comentariu.id}
                  comentariu={item.comentariu}
                  drills={item.drills}
                  onStart={() => setLocation(`/drill/${item.comentariu.id}`)}
                  onEdit={() => setLocation(`/editor/${item.comentariu.id}`)}
                  onDelete={async () => {
                    await loadComentarii();
                  }}
                  showEdit={true}
                />
              ))}
            </div>

                {comentarii.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Nu există comentarii adăugate încă
                </p>
                <Button onClick={() => setLocation("/editor/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adaugă primul comentariu
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
