import MultipleChoice from "../../drills/MultipleChoice";
import { plumbComentariu } from "@/lib/mockData";

export default function MultipleChoiceExample() {
  return (
    <div className="p-6 max-w-2xl">
      <MultipleChoice
        question={plumbComentariu.drills.nivel1[0]}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
