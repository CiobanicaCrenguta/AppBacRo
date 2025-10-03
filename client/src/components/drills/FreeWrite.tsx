import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import FeedbackMessage from "../FeedbackMessage";
import type { FreeWriteQuestion } from "@shared/schema";

interface FreeWriteProps {
  question: FreeWriteQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function FreeWrite({ question, onAnswer }: FreeWriteProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Simple similarity check - can be enhanced
    const similarity = calculateSimilarity(answer, question.raspuns_referinta);
    const isCorrect = similarity > 0.5; // 50% similarity threshold
    setTimeout(() => onAnswer(isCorrect), 2000);
  };

  const similarity = calculateSimilarity(answer, question.raspuns_referinta);
  const isCorrect = similarity > 0.5;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-medium">{question.instructiune}</h2>
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

      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder="Scrie răspunsul tău aici..."
        className="min-h-48 text-base"
        data-testid="textarea-answer"
      />

      <div className="text-sm text-muted-foreground">
        Cuvinte: {answer.split(/\s+/).filter((w) => w.length > 0).length}
      </div>

      {submitted && (
        <div className="space-y-4">
          <FeedbackMessage
            type={isCorrect ? "success" : "hint"}
            message={
              isCorrect
                ? "Foarte bine! Răspunsul tău acoperă elementele importante!"
                : "Răspunsul poate fi îmbunătățit. Consultă varianta de referință mai jos."
            }
          />
          <div className="p-4 bg-muted/30 rounded-md space-y-2">
            <p className="text-sm font-medium">Răspuns de referință:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.raspuns_referinta}
            </p>
          </div>
        </div>
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={answer.trim().length < 50}
          className="w-full"
          data-testid="button-submit"
        >
          Trimite răspunsul
        </Button>
      )}
    </div>
  );
}

// Simple similarity calculation based on common words
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);
  const words2 = text2
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const commonWords = words1.filter((w) => words2.includes(w));
  const totalWords = Math.max(words1.length, words2.length);

  return totalWords > 0 ? commonWords.length / totalWords : 0;
}
