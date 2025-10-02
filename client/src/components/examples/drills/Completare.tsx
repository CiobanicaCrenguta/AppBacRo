import Completare from "../../drills/Completare";
import { plumbComentariu } from "@/lib/mockData";

export default function CompletareExample() {
  return (
    <div className="p-6 max-w-2xl">
      <Completare
        question={plumbComentariu.drills.nivel3[0]}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
