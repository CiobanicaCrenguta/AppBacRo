import StreakCounter from "../StreakCounter";

export default function StreakCounterExample() {
  return (
    <div className="p-6 space-y-4">
      <StreakCounter streak={0} scor={0} />
      <StreakCounter streak={3} scor={15} />
      <StreakCounter streak={10} scor={50} />
    </div>
  );
}
