import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { Note, getNote } from "../../services/note";

import { toast } from "react-toastify";
import { useParams } from "react-router";

const NoteDetails: FC = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState<Note | null>(null);

  useEffect(() => {
    const getSingleNote = async () => {
      try {
        if (!noteId) {
          toast.error(
            "An issue has occurred; please attempt the action again or get in touch with the administrator for assistance."
          );
          return;
        }
        const data = await getNote(noteId);
        setNoteData(data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    getSingleNote();
  }, [noteId]);

  return (
    // React Quill here
    <div className="noteWrapper">
      {noteData ? (
        <>
          <h2>{noteData.title}</h2>
          <p>{noteData.content}</p>
          <p>Priority: {noteData.isHighPriority ? "High" : "Low"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetails;
