import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
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
import { storageService } from "@/lib/storage";
import type { ComentariuComplet } from "@shared/schema";

export default function DrillPage() {
  const [match, params] = useRoute("/drill/:id");
  const [, setLocation] = useLocation();
  const [nivel, setNivel] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scor, setScor] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const comentariu = storageService.getComentariu(params?.id || "") as ComentariuComplet | undefined;

  useEffect(() => {
    if (!match || !comentariu) {
      setLocation("/");
      return;
    }

    // Initialize to the first level with questions
    if (!initialized && comentariu) {
      let firstNivel = 1;
      let found = false;
      
      while (firstNivel <= 5) {
        const questions = comentariu.drills[`nivel${firstNivel}` as keyof typeof comentariu.drills] as any[];
        if (questions && questions.length > 0) {
          setNivel(firstNivel);
          setQuestionIndex(0);
          found = true;
          break;
        }
        firstNivel++;
      }

      if (!found) {
        // No drills at all, mark as completed immediately
        setCompleted(true);
      }
      
      setInitialized(true);
    }
  }, [match, comentariu, setLocation, initialized]);

  useEffect(() => {
    if (comentariu && completed) {
      storageService.updateProgress(
        comentariu.comentariu.id,
        nivel,
        scor,
        streak,
        true
      );
    }
  }, [completed, comentariu, nivel, scor, streak]);

  if (!comentariu) return null;

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScor((prev) => prev + 5);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    // Save progress after each question
    if (comentariu) {
      storageService.updateProgress(
        comentariu.comentariu.id,
        nivel,
        scor + (correct ? 5 : 0),
        correct ? streak + 1 : 0,
        false
      );
    }

    const questions = getCurrentQuestions();
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else if (nivel < 5) {
      // Try to advance to next level, but skip empty levels
      let nextNivel = nivel + 1;
      while (nextNivel <= 5) {
        const nextQuestions = comentariu.drills[`nivel${nextNivel}` as keyof typeof comentariu.drills] as any[];
        if (nextQuestions && nextQuestions.length > 0) {
          setNivel(nextNivel);
          setQuestionIndex(0);
          return;
        }
        nextNivel++;
      }
      // All remaining levels are empty, mark as completed
      setCompleted(true);
    } else {
      setCompleted(true);
    }
  };

  const getCurrentQuestions = () => {
    const drills = comentariu.drills;
    switch (nivel) {
      case 1:
        return drills.nivel1;
      case 2:
        return drills.nivel2;
      case 3:
        return drills.nivel3;
      case 4:
        return drills.nivel4;
      case 5:
        return drills.nivel5;
      default:
        return [];
    }
  };

  const questions = getCurrentQuestions();
  const currentQuestion = questions[questionIndex] as any;

  // Don't render until initialized
  if (!initialized) {
    return null;
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <Trophy className="h-16 w-16 text-primary mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Felicitări!</h2>
            <p className="text-muted-foreground">
              Ai completat toate nivelurile pentru acest comentariu!
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary" data-testid="text-final-score">
              {scor} puncte
            </p>
            <p className="text-sm text-muted-foreground">
              Streak maxim: {streak}
            </p>
          </div>
          <Button onClick={() => setLocation("/")} className="w-full">
            Înapoi la lista de comentarii
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              {comentariu.comentariu.titlu}
            </h1>
            <p className="text-muted-foreground">{comentariu.comentariu.autor}</p>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">
                Nivel {nivel}: {nivelTitles[nivel - 1]}
              </h2>
              <StreakCounter streak={streak} scor={scor} />
            </div>
            <ProgressBar
              current={questionIndex + 1}
              total={questions.length}
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
    </div>
  );
}
