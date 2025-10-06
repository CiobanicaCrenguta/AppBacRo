import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { storageService } from "@/lib/storage";

export default function ViewComentariuPage() {
  const [, params] = useRoute("/view/:id");
  const [, setLocation] = useLocation();

  const [comentariuComplet, setComentariuComplet] = useState<any>(null);

  useEffect(() => {
    const fetchComentariu = async () => {
      if (params?.id) {
        const data = await storageService.getComentariu(params.id);
        setComentariuComplet(data);
      }
    };
    fetchComentariu();
  }, [params?.id]);

  if (!comentariuComplet) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl px-4 py-8">
          <p className="text-center text-muted-foreground">Comentariul nu a fost găsit</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setLocation("/")} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { comentariu } = comentariuComplet;
  const Icon = comentariu.tip === "poezie" ? BookOpen : FileText;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-4 md:py-8">
        <Button 
          onClick={() => setLocation("/")} 
          variant="ghost" 
          className="mb-4 md:mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la listă
        </Button>

        <Card>
          <CardHeader className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-2 md:gap-3">
                <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                <h1 className="text-2xl md:text-3xl font-semibold leading-tight">{comentariu.titlu}</h1>
              </div>
              <Badge variant="secondary" className="self-start" data-testid={`badge-${comentariu.tip}`}>
                {comentariu.tip}
              </Badge>
            </div>
            <p className="text-base md:text-lg text-muted-foreground">{comentariu.autor}</p>
          </CardHeader>

          <CardContent className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Context</h2>
              <p className="text-sm md:text-base leading-relaxed" data-testid="text-context">
                {comentariu.context}
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Prima trăsătură</h2>
              <p className="text-sm md:text-base leading-relaxed" data-testid="text-trasatura1">
                {comentariu.trasatura1}
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">A doua trăsătură</h2>
              <p className="text-sm md:text-base leading-relaxed" data-testid="text-trasatura2">
                {comentariu.trasatura2}
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Tehnici literare</h2>
              <p className="text-sm md:text-base leading-relaxed" data-testid="text-tehnici">
                {comentariu.tehnici}
              </p>
            </div>

            {comentariu.tip === "poezie" && comentariu.prozodie && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Prozodie</h2>
                <p className="text-sm md:text-base leading-relaxed" data-testid="text-prozodie">
                  {comentariu.prozodie}
                </p>
              </div>
            )}

            {comentariu.tip === "proza" && comentariu.viziune_despre_viata && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Viziune despre viață</h2>
                <p className="text-sm md:text-base leading-relaxed" data-testid="text-viziune">
                  {comentariu.viziune_despre_viata}
                </p>
              </div>
            )}

            {comentariu.tip === "proza" && comentariu.caracterizare_personaje && (
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Caracterizare personaje</h2>
                <p className="text-sm md:text-base leading-relaxed" data-testid="text-caracterizare">
                  {comentariu.caracterizare_personaje}
                </p>
              </div>
            )}

            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Încheiere</h2>
              <p className="text-sm md:text-base leading-relaxed" data-testid="text-incheiere">
                {comentariu.incheiere}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
