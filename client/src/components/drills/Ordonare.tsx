import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, MoveUp, MoveDown, Lightbulb } from "lucide-react";
import FeedbackMessage from "../FeedbackMessage";
import type { OrdonareQuestion } from "@shared/schema";

interface OrdonareProps {
  question: OrdonareQuestion;
  onAnswer: (correct: boolean) => void;
}

// 🔥 Funcție mică de shuffle (amestecare aleatorie)
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Ordonare({ question, onAnswer }: OrdonareProps) {
  const [fragments, setFragments] = useState(() => {
    // 🔄 Shuffle fragments for initial display
    const shuffled = shuffleArray([...question.fragmente]);
    return shuffled.map((text) => ({
      text,
      originalIndex: question.fragmente.indexOf(text),
    }));
  });
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const moveUp = (index: number) => {
    if (index === 0 || submitted) return;
    const newFragments = [...fragments];
    [newFragments[index - 1], newFragments[index]] = [
      newFragments[index],
      newFragments[index - 1],
    ];
    setFragments(newFragments);
  };

  const moveDown = (index: number) => {
    if (index === fragments.length - 1 || submitted) return;
    const newFragments = [...fragments];
    [newFragments[index], newFragments[index + 1]] = [
      newFragments[index + 1],
      newFragments[index],
    ];
    setFragments(newFragments);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const currentOrder = fragments.map((f) => f.originalIndex);
    const isCorrect =
      JSON.stringify(currentOrder) === JSON.stringify(question.ordineCorecta);
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const currentOrder = fragments.map((f) => f.originalIndex);
  const isCorrect =
    JSON.stringify(currentOrder) === JSON.stringify(question.ordineCorecta);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-medium">
          Ordonează fragmentele în ordine corectă:
        </h2>
        {question.indiciu && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              data-testid="button-hint"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHint ? "Ascunde indiciu" : "Arată indiciu"}
            </Button>
          </div>
        )}
        {showHint && question.indiciu && (
          <Card className="p-4 bg-accent/50">
            <p className="text-sm">{question.indiciu}</p>
          </Card>
        )}
      </div>

      <div className="space-y-3">
        {fragments.map((fragment, index) => {
          const correctPosition =
            question.ordineCorecta.indexOf(fragment.originalIndex);
          const isInCorrectPosition = submitted && index === correctPosition;
          const isInWrongPosition = submitted && index !== correctPosition;

          return (
            <Card
              key={index}
              className={`p-4 ${
                isInCorrectPosition ? "border-success bg-success/10" : ""
              } ${
                isInWrongPosition ? "border-destructive bg-destructive/10" : ""
              }`}
              data-testid={`fragment-${index}`}
            >
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-sm">{fragment.text}</p>
                <div className="flex flex-col gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => moveUp(index)}
                    disabled={index === 0 || submitted}
                    data-testid={`button-move-up-${index}`}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => moveDown(index)}
                    disabled={index === fragments.length - 1 || submitted}
                    data-testid={`button-move-down-${index}`}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {submitted && (
        <FeedbackMessage
          type={isCorrect ? "success" : "error"}
          message={
            isCorrect
              ? "Excelent! Ai ordonat corect fragmentele!"
              : "Ordinea nu este corectă. Fragmentele corecte sunt evidențiate."
          }
        />
      )}

      {!submitted && (
        <Button onClick={handleSubmit} className="w-full" data-testid="button-submit">
          Verifică ordinea
        </Button>
      )}
    </div>
  );
}
