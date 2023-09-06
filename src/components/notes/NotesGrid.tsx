import { FC, useEffect, useState } from "react";
import { NoteData, getNotes } from "../../services/note";

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
          <div>
            {note.title} {note.content} {note.isHighPriority}
          </div>
        );
      })}
    </div>
  );
};

export default NotesGrid;
