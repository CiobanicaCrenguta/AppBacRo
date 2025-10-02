import WordBank from "../../drills/WordBank";
import { plumbComentariu } from "@/lib/mockData";

export default function WordBankExample() {
  return (
    <div className="p-6 max-w-2xl">
      <WordBank
        question={plumbComentariu.drills.nivel4[0]}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
