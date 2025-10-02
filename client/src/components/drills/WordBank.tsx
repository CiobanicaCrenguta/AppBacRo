import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import FeedbackMessage from "../FeedbackMessage";
import type { WordBankQuestion } from "@shared/schema";

interface WordBankProps {
  question: WordBankQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function WordBank({ question, onAnswer }: WordBankProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleWordClick = (word: string) => {
    if (!submitted) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleRemoveWord = (index: number) => {
    if (!submitted) {
      const newWords = [...selectedWords];
      newWords.splice(index, 1);
      setSelectedWords(newWords);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const userSentence = selectedWords.join(" ").toLowerCase().trim();
    const correctSentence = question.fraza_corecta.toLowerCase().trim();
    const isCorrect = userSentence === correctSentence;
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  const availableWords = question.cuvinte.filter((word) => {
    const usedCount = selectedWords.filter((w) => w === word).length;
    const totalCount = question.cuvinte.filter((w) => w === word).length;
    return usedCount < totalCount;
  });

  const userSentence = selectedWords.join(" ").toLowerCase().trim();
  const correctSentence = question.fraza_corecta.toLowerCase().trim();
  const isCorrect = userSentence === correctSentence;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">{question.instructiune}</h2>

      <Card className="p-4 min-h-24 bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {selectedWords.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Selectează cuvintele în ordinea corectă...
            </p>
          )}
          {selectedWords.map((word, index) => (
            <Badge
              key={index}
              variant="default"
              className="gap-1 pl-3 pr-2 py-1 text-sm"
              data-testid={`selected-word-${index}`}
            >
              {word}
              {!submitted && (
                <button
                  onClick={() => handleRemoveWord(index)}
                  className="ml-1 hover-elevate rounded-full p-0.5"
                  data-testid={`button-remove-${index}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <p className="text-sm font-medium">Bancă de cuvinte:</p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover-elevate"
              onClick={() => handleWordClick(word)}
              data-testid={`word-${index}`}
            >
              {word}
            </Badge>
          ))}
        </div>
      </div>

      {submitted && (
        <div className="space-y-3">
          <FeedbackMessage
            type={isCorrect ? "success" : "error"}
            message={
              isCorrect
                ? "Excelent! Ai construit fraza corect!"
                : "Fraza nu este corectă."
            }
          />
          {!isCorrect && (
            <div className="text-sm">
              <p className="font-medium mb-1">Fraza corectă:</p>
              <p className="text-muted-foreground">{question.fraza_corecta}</p>
            </div>
          )}
        </div>
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={selectedWords.length === 0}
          className="w-full"
          data-testid="button-submit"
        >
          Verifică fraza
        </Button>
      )}
    </div>
  );
}
