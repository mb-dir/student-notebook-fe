import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { Note, getNote } from "../../services/note";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const NoteDetails: FC = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState<Note | null>(null);
  const navigate = useNavigate();

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
    <div>
      {noteData ? (
        <div className="noteWrapper">
          <h2>{noteData.title}</h2>
          <p>{noteData.content}</p>
          <p>Priority: {noteData.isHighPriority ? "High" : "Low"}</p>
          <button
            className="noteWrapper__button"
            onClick={() => navigate("/notes")}
          >
            Back to notes dashboard
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetails;
