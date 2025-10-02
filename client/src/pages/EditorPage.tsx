import { useState, useEffect } from "react";
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
import { storageService } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import type { ComentariuComplet, MultipleChoiceQuestion, OrdonareQuestion, CompletareQuestion, WordBankQuestion, FreeWriteQuestion } from "@shared/schema";

export default function EditorPage() {
  const [match, params] = useRoute("/editor/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [comentariu, setComentariu] = useState<ComentariuComplet>(getEmptyComentariu());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadComentariu() {
      if (!isNew && params?.id) {
        const existing = await storageService.getComentariu(params.id);
        if (existing) {
          setComentariu(existing);
        }
      }
      setIsLoading(false);
    }
    loadComentariu();
  }, [isNew, params?.id]);

  function getEmptyComentariu(): ComentariuComplet {
    return {
      comentariu: {
        id: `comentariu-${Date.now()}`,
        titlu: "",
        autor: "",
        tip: "poezie",
        context: "",
        trasatura1: "",
        trasatura2: "",
        tehnici: "",
        prozodie: "",
        incheiere: "",
      },
      drills: {
        nivel1: [],
        nivel2: [],
        nivel3: [],
        nivel4: [],
        nivel5: [],
      },
    };
  }

  const handleSave = async () => {
    if (!comentariu.comentariu.titlu || !comentariu.comentariu.autor) {
      toast({
        title: "Eroare",
        description: "Titlul și autorul sunt obligatorii",
        variant: "destructive",
      });
      return;
    }

    // Warn if no drills are added (but allow saving)
    const totalDrills = 
      comentariu.drills.nivel1.length +
      comentariu.drills.nivel2.length +
      comentariu.drills.nivel3.length +
      comentariu.drills.nivel4.length +
      comentariu.drills.nivel5.length;

    if (totalDrills === 0) {
      toast({
        title: "Avertisment",
        description: "Nu ai adăugat niciun exercițiu. Adaugă exerciții pentru ca elevii să poată exersa.",
      });
    }

    try {
      if (isNew) {
        await storageService.addComentariu(comentariu);
      } else {
        await storageService.updateComentariu(comentariu.comentariu.id, comentariu);
      }

      window.dispatchEvent(new Event("storage-update"));
      toast({
        title: "Succes!",
        description: "Comentariul a fost salvat.",
      });
      setTimeout(() => setLocation("/"), 500);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva comentariul",
        variant: "destructive",
      });
    }
  };

  // Nivel 1 - Multiple Choice
  const addMultipleChoice = () => {
    const newQuestion: MultipleChoiceQuestion = {
      id: `mc-${Date.now()}`,
      intrebare: "",
      optiuni: ["", "", "", ""],
      raspunsCorect: 0,
    };
    setComentariu({
      ...comentariu,
      drills: {
        ...comentariu.drills,
        nivel1: [...comentariu.drills.nivel1, newQuestion],
      },
    });
  };

  const updateMultipleChoice = (index: number, field: string, value: any) => {
    const updated = [...comentariu.drills.nivel1];
    (updated[index] as any)[field] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel1: updated },
    });
  };

  const updateMultipleChoiceOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...comentariu.drills.nivel1];
    updated[qIndex].optiuni[oIndex] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel1: updated },
    });
  };

  const deleteMultipleChoice = (index: number) => {
    const updated = comentariu.drills.nivel1.filter((_, i) => i !== index);
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel1: updated },
    });
  };

  // Nivel 2 - Ordonare
  const addOrdonare = () => {
    const newQuestion: OrdonareQuestion = {
      id: `ord-${Date.now()}`,
      fragmente: ["", "", ""],
      ordineCorecta: [0, 1, 2],
    };
    setComentariu({
      ...comentariu,
      drills: {
        ...comentariu.drills,
        nivel2: [...comentariu.drills.nivel2, newQuestion],
      },
    });
  };

  const updateOrdonareFragment = (qIndex: number, fIndex: number, value: string) => {
    const updated = [...comentariu.drills.nivel2];
    updated[qIndex].fragmente[fIndex] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel2: updated },
    });
  };

  const deleteOrdonare = (index: number) => {
    const updated = comentariu.drills.nivel2.filter((_, i) => i !== index);
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel2: updated },
    });
  };

  // Nivel 3 - Completare
  const addCompletare = () => {
    const newQuestion: CompletareQuestion = {
      id: `comp-${Date.now()}`,
      text: "",
      raspunsuri: [""],
    };
    setComentariu({
      ...comentariu,
      drills: {
        ...comentariu.drills,
        nivel3: [...comentariu.drills.nivel3, newQuestion],
      },
    });
  };

  const updateCompletare = (index: number, field: string, value: any) => {
    const updated = [...comentariu.drills.nivel3];
    (updated[index] as any)[field] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel3: updated },
    });
  };

  const deleteCompletare = (index: number) => {
    const updated = comentariu.drills.nivel3.filter((_, i) => i !== index);
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel3: updated },
    });
  };

  // Nivel 4 - Word Bank
  const addWordBank = () => {
    const newQuestion: WordBankQuestion = {
      id: `wb-${Date.now()}`,
      instructiune: "",
      cuvinte: [""],
      fraza_corecta: "",
    };
    setComentariu({
      ...comentariu,
      drills: {
        ...comentariu.drills,
        nivel4: [...comentariu.drills.nivel4, newQuestion],
      },
    });
  };

  const updateWordBank = (index: number, field: string, value: any) => {
    const updated = [...comentariu.drills.nivel4];
    (updated[index] as any)[field] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel4: updated },
    });
  };

  const deleteWordBank = (index: number) => {
    const updated = comentariu.drills.nivel4.filter((_, i) => i !== index);
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel4: updated },
    });
  };

  // Nivel 5 - Free Write
  const addFreeWrite = () => {
    const newQuestion: FreeWriteQuestion = {
      id: `fw-${Date.now()}`,
      instructiune: "",
      raspuns_referinta: "",
    };
    setComentariu({
      ...comentariu,
      drills: {
        ...comentariu.drills,
        nivel5: [...comentariu.drills.nivel5, newQuestion],
      },
    });
  };

  const updateFreeWrite = (index: number, field: string, value: any) => {
    const updated = [...comentariu.drills.nivel5];
    (updated[index] as any)[field] = value;
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel5: updated },
    });
  };

  const deleteFreeWrite = (index: number) => {
    const updated = comentariu.drills.nivel5.filter((_, i) => i !== index);
    setComentariu({
      ...comentariu,
      drills: { ...comentariu.drills, nivel5: updated },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Se încarcă...</p>
      </div>
    );
  }

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
            <TabsTrigger value="nivel1">Nivel 1 ({comentariu.drills.nivel1.length})</TabsTrigger>
            <TabsTrigger value="nivel2">Nivel 2 ({comentariu.drills.nivel2.length})</TabsTrigger>
            <TabsTrigger value="nivel3">Nivel 3 ({comentariu.drills.nivel3.length})</TabsTrigger>
            <TabsTrigger value="nivel4">Nivel 4 ({comentariu.drills.nivel4.length})</TabsTrigger>
            <TabsTrigger value="nivel5">Nivel 5 ({comentariu.drills.nivel5.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="comentariu" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="titlu">Titlu operă *</Label>
                  <Input
                    id="titlu"
                    value={comentariu.comentariu.titlu}
                    onChange={(e) =>
                      setComentariu({
                        ...comentariu,
                        comentariu: { ...comentariu.comentariu, titlu: e.target.value },
                      })
                    }
                    placeholder="ex: Plumb"
                    data-testid="input-titlu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor *</Label>
                  <Input
                    id="autor"
                    value={comentariu.comentariu.autor}
                    onChange={(e) =>
                      setComentariu({
                        ...comentariu,
                        comentariu: { ...comentariu.comentariu, autor: e.target.value },
                      })
                    }
                    placeholder="ex: George Bacovia"
                    data-testid="input-autor"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tip">Tip operă</Label>
                <Select
                  value={comentariu.comentariu.tip}
                  onValueChange={(value: "poezie" | "proza") =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, tip: value },
                    })
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
                  value={comentariu.comentariu.context}
                  onChange={(e) =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, context: e.target.value },
                    })
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
                  value={comentariu.comentariu.trasatura1}
                  onChange={(e) =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, trasatura1: e.target.value },
                    })
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
                  value={comentariu.comentariu.trasatura2}
                  onChange={(e) =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, trasatura2: e.target.value },
                    })
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
                  value={comentariu.comentariu.tehnici}
                  onChange={(e) =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, tehnici: e.target.value },
                    })
                  }
                  placeholder="Elemente de compoziție, simboluri, tehnici..."
                  className="min-h-32"
                  data-testid="textarea-tehnici"
                />
              </div>

              {comentariu.comentariu.tip === "poezie" && (
                <div className="space-y-2">
                  <Label htmlFor="prozodie">Prozodie</Label>
                  <Textarea
                    id="prozodie"
                    value={comentariu.comentariu.prozodie || ""}
                    onChange={(e) =>
                      setComentariu({
                        ...comentariu,
                        comentariu: { ...comentariu.comentariu, prozodie: e.target.value },
                      })
                    }
                    placeholder="Detalii despre rimă, măsură, sonoritate..."
                    className="min-h-32"
                    data-testid="textarea-prozodie"
                  />
                </div>
              )}

              {comentariu.comentariu.tip === "proza" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="viziune">Viziune despre viață</Label>
                    <Textarea
                      id="viziune"
                      value={comentariu.comentariu.viziune_despre_viata || ""}
                      onChange={(e) =>
                        setComentariu({
                          ...comentariu,
                          comentariu: {
                            ...comentariu.comentariu,
                            viziune_despre_viata: e.target.value,
                          },
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
                      value={comentariu.comentariu.caracterizare_personaje || ""}
                      onChange={(e) =>
                        setComentariu({
                          ...comentariu,
                          comentariu: {
                            ...comentariu.comentariu,
                            caracterizare_personaje: e.target.value,
                          },
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
                  value={comentariu.comentariu.incheiere}
                  onChange={(e) =>
                    setComentariu({
                      ...comentariu,
                      comentariu: { ...comentariu.comentariu, incheiere: e.target.value },
                    })
                  }
                  placeholder="Concluzia, încadrări în curent, mesaj general..."
                  className="min-h-32"
                  data-testid="textarea-incheiere"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nivel1" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Întrebări Multiple Choice</h3>
                <p className="text-sm text-muted-foreground">
                  Întrebări de recunoaștere cu 4 variante de răspuns
                </p>
              </div>
              <Button onClick={addMultipleChoice} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă
              </Button>
            </div>

            {comentariu.drills.nivel1.map((q, index) => (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Întrebare {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMultipleChoice(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Întrebare</Label>
                  <Input
                    value={q.intrebare}
                    onChange={(e) =>
                      updateMultipleChoice(index, "intrebare", e.target.value)
                    }
                    placeholder="Scrie întrebarea..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Opțiuni de răspuns</Label>
                  {q.optiuni.map((opt, oIndex) => (
                    <div key={oIndex} className="flex gap-2 items-center">
                      <Input
                        value={opt}
                        onChange={(e) =>
                          updateMultipleChoiceOption(index, oIndex, e.target.value)
                        }
                        placeholder={`Opțiunea ${oIndex + 1}`}
                      />
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.raspunsCorect === oIndex}
                        onChange={() =>
                          updateMultipleChoice(index, "raspunsCorect", oIndex)
                        }
                        className="h-4 w-4"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="nivel2" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Exerciții de Ordonare</h3>
                <p className="text-sm text-muted-foreground">
                  Fragmente de text care trebuie ordonate corect
                </p>
              </div>
              <Button onClick={addOrdonare} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă
              </Button>
            </div>

            {comentariu.drills.nivel2.map((q, index) => (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Exercițiu {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteOrdonare(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Fragmente (în ordinea corectă)</Label>
                  {q.fragmente.map((frag, fIndex) => (
                    <Textarea
                      key={fIndex}
                      value={frag}
                      onChange={(e) =>
                        updateOrdonareFragment(index, fIndex, e.target.value)
                      }
                      placeholder={`Fragment ${fIndex + 1}`}
                      className="min-h-24"
                    />
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="nivel3" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Exerciții de Completare</h3>
                <p className="text-sm text-muted-foreground">
                  Text cu spații libere marcate cu _____
                </p>
              </div>
              <Button onClick={addCompletare} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă
              </Button>
            </div>

            {comentariu.drills.nivel3.map((q, index) => (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Exercițiu {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCompletare(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Text (folosește _____ pentru spații libere)</Label>
                  <Textarea
                    value={q.text}
                    onChange={(e) => updateCompletare(index, "text", e.target.value)}
                    placeholder="Scrie textul cu _____ pentru spații libere..."
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Răspunsuri corecte (separate prin virgulă)</Label>
                  <Input
                    value={q.raspunsuri.join(", ")}
                    onChange={(e) =>
                      updateCompletare(
                        index,
                        "raspunsuri",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    placeholder="raspuns1, raspuns2, raspuns3"
                  />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="nivel4" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Exerciții Word Bank</h3>
                <p className="text-sm text-muted-foreground">
                  Construirea de fraze din bancă de cuvinte
                </p>
              </div>
              <Button onClick={addWordBank} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă
              </Button>
            </div>

            {comentariu.drills.nivel4.map((q, index) => (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Exercițiu {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteWordBank(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Instrucțiune</Label>
                  <Input
                    value={q.instructiune}
                    onChange={(e) =>
                      updateWordBank(index, "instructiune", e.target.value)
                    }
                    placeholder="Construiește o frază despre..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cuvinte (separate prin virgulă)</Label>
                  <Input
                    value={q.cuvinte.join(", ")}
                    onChange={(e) =>
                      updateWordBank(
                        index,
                        "cuvinte",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    placeholder="cuvant1, cuvant2, cuvant3"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fraza corectă</Label>
                  <Input
                    value={q.fraza_corecta}
                    onChange={(e) =>
                      updateWordBank(index, "fraza_corecta", e.target.value)
                    }
                    placeholder="Fraza completă corectă..."
                  />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="nivel5" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Exerciții Free Write</h3>
                <p className="text-sm text-muted-foreground">
                  Scriere liberă cu răspuns de referință
                </p>
              </div>
              <Button onClick={addFreeWrite} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă
              </Button>
            </div>

            {comentariu.drills.nivel5.map((q, index) => (
              <Card key={q.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Exercițiu {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteFreeWrite(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Instrucțiune</Label>
                  <Input
                    value={q.instructiune}
                    onChange={(e) =>
                      updateFreeWrite(index, "instructiune", e.target.value)
                    }
                    placeholder="Scrie un paragraf despre..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Răspuns de referință</Label>
                  <Textarea
                    value={q.raspuns_referinta}
                    onChange={(e) =>
                      updateFreeWrite(index, "raspuns_referinta", e.target.value)
                    }
                    placeholder="Răspunsul complet de referință..."
                    className="min-h-48"
                  />
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
