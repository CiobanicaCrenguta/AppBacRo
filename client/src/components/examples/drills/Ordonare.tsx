import Ordonare from "../../drills/Ordonare";
import { plumbComentariu } from "@/lib/mockData";

export default function OrdonareExample() {
  return (
    <div className="p-6 max-w-2xl">
      <Ordonare
        question={plumbComentariu.drills.nivel2[0]}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
