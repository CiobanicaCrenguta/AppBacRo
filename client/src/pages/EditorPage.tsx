import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockComentarii } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function EditorPage() {
  const [match, params] = useRoute("/editor/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [comentariu, setComentariu] = useState({
    titlu: "",
    autor: "",
    tip: "poezie" as "poezie" | "proza",
    context: "",
    trasatura1: "",
    trasatura2: "",
    tehnici: "",
    prozodie: "",
    viziune_despre_viata: "",
    caracterizare_personaje: "",
    incheiere: "",
  });

  const handleSave = () => {
    // todo: remove mock functionality - Save to localStorage
    toast({
      title: "Succes!",
      description: "Comentariul a fost salvat.",
    });
    setTimeout(() => setLocation("/"), 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>
          <Button onClick={handleSave} data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Salvează
          </Button>
        </div>

        <h1 className="text-3xl font-semibold mb-8">
          {isNew ? "Adaugă comentariu nou" : "Editează comentariu"}
        </h1>

        <Tabs defaultValue="comentariu" className="space-y-6">
          <TabsList>
            <TabsTrigger value="comentariu">Comentariu</TabsTrigger>
            <TabsTrigger value="nivel1">Nivel 1 - Recunoaștere</TabsTrigger>
            <TabsTrigger value="nivel2">Nivel 2 - Ordonare</TabsTrigger>
            <TabsTrigger value="nivel3">Nivel 3 - Completare</TabsTrigger>
            <TabsTrigger value="nivel4">Nivel 4 - Word Bank</TabsTrigger>
            <TabsTrigger value="nivel5">Nivel 5 - Free Write</TabsTrigger>
          </TabsList>

          <TabsContent value="comentariu" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="titlu">Titlu operă</Label>
                  <Input
                    id="titlu"
                    value={comentariu.titlu}
                    onChange={(e) =>
                      setComentariu({ ...comentariu, titlu: e.target.value })
                    }
                    placeholder="ex: Plumb"
                    data-testid="input-titlu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input
                    id="autor"
                    value={comentariu.autor}
                    onChange={(e) =>
                      setComentariu({ ...comentariu, autor: e.target.value })
                    }
                    placeholder="ex: George Bacovia"
                    data-testid="input-autor"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tip">Tip operă</Label>
                <Select
                  value={comentariu.tip}
                  onValueChange={(value: "poezie" | "proza") =>
                    setComentariu({ ...comentariu, tip: value })
                  }
                >
                  <SelectTrigger id="tip" data-testid="select-tip">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poezie">Poezie</SelectItem>
                    <SelectItem value="proza">Proză</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Context</Label>
                <Textarea
                  id="context"
                  value={comentariu.context}
                  onChange={(e) =>
                    setComentariu({ ...comentariu, context: e.target.value })
                  }
                  placeholder="Introducere, perioada, curent literar..."
                  className="min-h-32"
                  data-testid="textarea-context"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trasatura1">Trăsătură 1</Label>
                <Textarea
                  id="trasatura1"
                  value={comentariu.trasatura1}
                  onChange={(e) =>
                    setComentariu({ ...comentariu, trasatura1: e.target.value })
                  }
                  placeholder="Prima trăsătură literară importantă..."
                  className="min-h-32"
                  data-testid="textarea-trasatura1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trasatura2">Trăsătură 2</Label>
                <Textarea
                  id="trasatura2"
                  value={comentariu.trasatura2}
                  onChange={(e) =>
                    setComentariu({ ...comentariu, trasatura2: e.target.value })
                  }
                  placeholder="A doua trăsătură literară importantă..."
                  className="min-h-32"
                  data-testid="textarea-trasatura2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tehnici">Tehnici literare</Label>
                <Textarea
                  id="tehnici"
                  value={comentariu.tehnici}
                  onChange={(e) =>
                    setComentariu({ ...comentariu, tehnici: e.target.value })
                  }
                  placeholder="Elemente de compoziție, simboluri, tehnici..."
                  className="min-h-32"
                  data-testid="textarea-tehnici"
                />
              </div>

              {comentariu.tip === "poezie" && (
                <div className="space-y-2">
                  <Label htmlFor="prozodie">Prozodie</Label>
                  <Textarea
                    id="prozodie"
                    value={comentariu.prozodie}
                    onChange={(e) =>
                      setComentariu({ ...comentariu, prozodie: e.target.value })
                    }
                    placeholder="Detalii despre rimă, măsură, sonoritate..."
                    className="min-h-32"
                    data-testid="textarea-prozodie"
                  />
                </div>
              )}

              {comentariu.tip === "proza" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="viziune">Viziune despre viață</Label>
                    <Textarea
                      id="viziune"
                      value={comentariu.viziune_despre_viata}
                      onChange={(e) =>
                        setComentariu({
                          ...comentariu,
                          viziune_despre_viata: e.target.value,
                        })
                      }
                      placeholder="Viziunea despre viață..."
                      className="min-h-32"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caracterizare">Caracterizare personaje</Label>
                    <Textarea
                      id="caracterizare"
                      value={comentariu.caracterizare_personaje}
                      onChange={(e) =>
                        setComentariu({
                          ...comentariu,
                          caracterizare_personaje: e.target.value,
                        })
                      }
                      placeholder="Caracterizarea personajelor..."
                      className="min-h-32"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="incheiere">Încheiere</Label>
                <Textarea
                  id="incheiere"
                  value={comentariu.incheiere}
                  onChange={(e) =>
                    setComentariu({ ...comentariu, incheiere: e.target.value })
                  }
                  placeholder="Concluzia, încadrări în curent, mesaj general..."
                  className="min-h-32"
                  data-testid="textarea-incheiere"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel1" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Întrebări Multiple Choice</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă întrebare
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adaugă întrebări simple de recunoaștere cu 4 variante de răspuns.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel2" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Exerciții de Ordonare</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă exercițiu
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creează exerciții în care elevii trebuie să ordoneze fragmente de text.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel3" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Exerciții de Completare</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă exercițiu
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creează texte cu spații libere pe care elevii trebuie să le completeze.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel4" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Exerciții Word Bank</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă exercițiu
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creează exerciții în care elevii construiesc fraze dintr-o bancă de cuvinte.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel5" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Exerciții Free Write</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adaugă exercițiu
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creează exerciții în care elevii scriu paragrafe complete din memorie.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
