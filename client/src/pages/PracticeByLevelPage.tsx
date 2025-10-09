import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import StreakCounter from "@/components/StreakCounter";
import MultipleChoice from "@/components/drills/MultipleChoice";
import Ordonare from "@/components/drills/Ordonare";
import Completare from "@/components/drills/Completare";
import WordBank from "@/components/drills/WordBank";
import FreeWrite from "@/components/drills/FreeWrite";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { ComentariuComplet } from "@shared/schema";

export default function PracticeByLevelPage() {
  const [match, params] = useRoute("/practice/:nivel");
  const [, setLocation] = useLocation();
  const nivel = parseInt(params?.nivel || "1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scor, setScor] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedComentariuId, setSelectedComentariuId] = useState<string | null>(null);

  const { data: comentarii = [], isLoading } = useQuery<ComentariuComplet[]>({
    queryKey: ["/api/comentarii"],
  });

  // 🔥 Resetăm progresul de fiecare dată când se schimbă comentariul
  useEffect(() => {
    setQuestionIndex(0);
    setScor(0);
    setStreak(0);
    setCompleted(false);
  }, [selectedComentariuId]);

  // Validare nivel
  useEffect(() => {
    if (!match || nivel < 1 || nivel > 5) {
      setLocation("/");
    }
  }, [match, nivel, setLocation]);

  if (isLoading) return null;

  // 🔎 Selectăm doar exercițiile din comentariul ales
  const allQuestions = comentarii
    .filter(
      (comentariu) =>
        !selectedComentariuId || comentariu.comentariu.id === selectedComentariuId
    )
    .flatMap((comentariu) => {
      if (!comentariu?.drills) return [];
      const drills = comentariu.drills;
      const levelKey = `nivel${nivel}` as keyof typeof drills;
      const questions = drills[levelKey] || [];
      return questions.map((q: any) => ({
        ...q,
        comentariuTitlu: comentariu.comentariu.titlu,
        comentariuAutor: comentariu.comentariu.autor,
        comentariuId: comentariu.comentariu.id,
      }));
    });

  // Dacă nu s-a ales niciun comentariu, afișăm ecranul de selecție
  if (!selectedComentariuId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Alege un comentariu</h2>
          <Select onValueChange={setSelectedComentariuId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selectează un comentariu..." />
            </SelectTrigger>
            <SelectContent>
              {comentarii.map((c) => (
                <SelectItem key={c.comentariu.id} value={c.comentariu.id}>
                  {c.comentariu.titlu} — {c.comentariu.autor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={() => setLocation("/")}>
            Înapoi la pagina principală
          </Button>
        </Card>
      </div>
    );
  }

  // Dacă nu există exerciții pentru comentariul ales
  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Niciun exercițiu disponibil</h2>
          <p className="text-muted-foreground">
            Nu există exerciții de nivel {nivel} pentru comentariul selectat.
          </p>
          <Button onClick={() => setSelectedComentariuId(null)} className="w-full">
            Alege alt comentariu
          </Button>
        </Card>
      </div>
    );
  }

  // Funcția care gestionează răspunsurile
  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScor((prev) => prev + 5);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    if (questionIndex < allQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const currentQuestion = allQuestions[questionIndex] as any;

  // Pagina de finalizare
  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <Trophy className="h-16 w-16 text-primary mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Felicitări!</h2>
            <p className="text-muted-foreground">
              Ai completat toate exercițiile de nivel {nivel} pentru comentariul selectat!
            </p>
          </div>
          <div className="space-y-2">
            <p
              className="text-4xl font-bold text-primary"
              data-testid="text-final-score"
            >
              {scor} puncte
            </p>
            <p className="text-sm text-muted-foreground">
              Streak maxim: {streak}
            </p>
          </div>
          <Button onClick={() => setSelectedComentariuId(null)} className="w-full">
            Alege alt comentariu
          </Button>
        </Card>
      </div>
    );
  }

  const nivelTitles = [
    "Recunoaștere (Multiple Choice)",
    "Reconstituire (Ordonare)",
    "Completare în Context",
    "Construcție Asistată (Word Bank)",
    "Producție Completă (Free Write)",
  ];

  // Pagina principală de exercițiu
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>

          {/* 🔥 Selector pentru schimbarea comentariului */}
          <Select
            value={selectedComentariuId || ""}
            onValueChange={setSelectedComentariuId}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Schimbă comentariul..." />
            </SelectTrigger>
            <SelectContent>
              {comentarii.map((c) => (
                <SelectItem key={c.comentariu.id} value={c.comentariu.id}>
                  {c.comentariu.titlu} — {c.comentariu.autor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">
            Nivel {nivel}: {nivelTitles[nivel - 1]}
          </h1>
          <p className="text-muted-foreground">
            {currentQuestion.comentariuTitlu} - {currentQuestion.comentariuAutor}
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Exercițiu</h2>
            <StreakCounter streak={streak} scor={scor} />
          </div>
          <ProgressBar
            current={questionIndex + 1}
            total={allQuestions.length}
            nivel={nivel}
          />
        </Card>

        <Card className="p-6">
          {nivel === 1 && (
            <MultipleChoice
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {nivel === 2 && (
            <Ordonare
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {nivel === 3 && (
            <Completare
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {nivel === 4 && (
            <WordBank
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {nivel === 5 && (
            <FreeWrite
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
