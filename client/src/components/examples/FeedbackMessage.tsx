import FeedbackMessage from "../FeedbackMessage";

export default function FeedbackMessageExample() {
  return (
    <div className="p-6 max-w-md space-y-4">
      <FeedbackMessage type="success" message="Răspuns corect! Excelent!" />
      <FeedbackMessage type="error" message="Răspuns incorect. Încearcă din nou!" />
      <FeedbackMessage type="hint" message="Indiciu: Gândește-te la simbolistica culorilor reci." />
    </div>
  );
}
