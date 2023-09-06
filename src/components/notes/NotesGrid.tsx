import { FC, useEffect, useState } from "react";
import { NoteData, getNotes } from "../../services/note";

import NoteCard from "./NoteCard";
import { toast } from "react-toastify";

const NotesGrid: FC = () => {
  const [notesData, setNotesData] = useState<NoteData | null>(null);
  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const { data } = await getNotes();
        setNotesData(data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    getAllNotes();
  }, []);
  return (
    <div>
      {(notesData?.notes || []).map(note => {
        return (
          <NoteCard
            key={note._id}
            title={note.title}
            content={note.content}
            isHighPriority={note.isHighPriority}
          />
        );
      })}
    </div>
  );
};

export default NotesGrid;
