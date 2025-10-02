import ProgressBar from "../ProgressBar";

export default function ProgressBarExample() {
  return (
    <div className="p-6 max-w-md space-y-4">
      <ProgressBar current={1} total={3} nivel={1} />
      <ProgressBar current={2} total={3} nivel={2} />
      <ProgressBar current={3} total={3} nivel={5} />
    </div>
  );
}
