import FreeWrite from "../../drills/FreeWrite";
import { plumbComentariu } from "@/lib/mockData";

export default function FreeWriteExample() {
  return (
    <div className="p-6 max-w-2xl">
      <FreeWrite
        question={plumbComentariu.drills.nivel5[0]}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
