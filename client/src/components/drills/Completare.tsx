import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lightbulb } from "lucide-react";
import FeedbackMessage from "../FeedbackMessage";
import type { CompletareQuestion } from "@shared/schema";

interface CompletareProps {
  question: CompletareQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function Completare({ question, onAnswer }: CompletareProps) {
  const parts = question.text.split("_____");
  const [answers, setAnswers] = useState<string[]>(new Array(question.raspunsuri.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = answers.every(
      (answer, index) =>
        answer.trim().toLowerCase() === question.raspunsuri[index].toLowerCase()
    );
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const checkAnswer = (index: number) => {
    return answers[index].trim().toLowerCase() === question.raspunsuri[index].toLowerCase();
  };

  const allCorrect = answers.every((answer, index) => checkAnswer(index));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Completează spațiile libere:</h2>
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
      <div className="space-y-4">
        <div className="text-base leading-relaxed">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < question.raspunsuri.length && (
                <Input
                  type="text"
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={submitted}
                  className={`inline-block mx-1 w-40 ${
                    submitted && checkAnswer(index)
                      ? "border-success bg-success/10"
                      : ""
                  } ${
                    submitted && !checkAnswer(index)
                      ? "border-destructive bg-destructive/10"
                      : ""
                  }`}
                  data-testid={`input-blank-${index}`}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {submitted && (
        <div className="space-y-3">
          <FeedbackMessage
            type={allCorrect ? "success" : "error"}
            message={
              allCorrect
                ? "Perfect! Toate răspunsurile sunt corecte!"
                : "Unele răspunsuri sunt incorecte."
            }
          />
          {!allCorrect && (
            <div className="text-sm space-y-1">
              <p className="font-medium">Răspunsuri corecte:</p>
              {question.raspunsuri.map((raspuns, index) => (
                <p key={index} className="text-muted-foreground">
                  {index + 1}. {raspuns}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={answers.some((a) => !a.trim())}
          className="w-full"
          data-testid="button-submit"
        >
          Verifică răspunsurile
        </Button>
      )}
    </div>
  );
}
