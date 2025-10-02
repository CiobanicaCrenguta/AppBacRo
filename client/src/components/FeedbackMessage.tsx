import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FeedbackMessageProps {
  type: "success" | "error" | "hint";
  message: string;
}

export default function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      className: "border-success bg-success/10 text-success-foreground",
      iconClassName: "text-success",
    },
    error: {
      icon: XCircle,
      className: "border-destructive bg-destructive/10 text-destructive-foreground",
      iconClassName: "text-destructive",
    },
    hint: {
      icon: Lightbulb,
      className: "border-l-4 border-warning bg-warning/10 text-warning-foreground",
      iconClassName: "text-warning",
    },
  };

  const { icon: Icon, className, iconClassName } = config[type];

  return (
    <Alert className={className} data-testid={`feedback-${type}`}>
      <Icon className={`h-4 w-4 ${iconClassName}`} />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
