import ComentariuCard from "../ComentariuCard";
import { plumbComentariu } from "@/lib/mockData";

export default function ComentariuCardExample() {
  return (
    <div className="p-6 max-w-md">
      <ComentariuCard
        comentariu={plumbComentariu.comentariu}
        onStart={() => console.log("Start drill")}
        onEdit={() => console.log("Edit commentary")}
        showEdit={true}
      />
    </div>
  );
}
