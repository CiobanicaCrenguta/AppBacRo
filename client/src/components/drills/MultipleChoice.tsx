import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FeedbackMessage from "../FeedbackMessage";
import type { MultipleChoiceQuestion } from "@shared/schema";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function MultipleChoice({ question, onAnswer }: MultipleChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (!submitted) {
      setSelectedIndex(index);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    const isCorrect = selectedIndex === question.raspunsCorect;
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const isCorrect = selectedIndex === question.raspunsCorect;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">{question.intrebare}</h2>
      <div className="grid gap-3">
        {question.optiuni.map((optiune, index) => (
          <Card
            key={index}
            className={`p-4 cursor-pointer transition-all hover-elevate ${
              selectedIndex === index ? "border-primary bg-accent" : ""
            } ${
              submitted && index === question.raspunsCorect
                ? "border-success bg-success/10"
                : ""
            } ${
              submitted && selectedIndex === index && !isCorrect
                ? "border-destructive bg-destructive/10"
                : ""
            }`}
            onClick={() => handleSelect(index)}
            data-testid={`option-${index}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`min-h-5 min-w-5 rounded-full border-2 flex items-center justify-center ${
                  selectedIndex === index ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {selectedIndex === index && (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <span className="text-base">{optiune}</span>
            </div>
          </Card>
        ))}
      </div>

      {submitted && (
        <FeedbackMessage
          type={isCorrect ? "success" : "error"}
          message={
            isCorrect
              ? "Corect! Excelent!"
              : "Incorect. Răspunsul corect este evidențiat."
          }
        />
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={selectedIndex === null}
          className="w-full"
          data-testid="button-submit"
        >
          Verifică răspunsul
        </Button>
      )}
    </div>
  );
}
