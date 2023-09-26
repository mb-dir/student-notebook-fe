import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { Note, deleteNote, getNote } from "../../services/note";

import ConfirmPopup from "../../components/confirmPopup/ConfirmPopup";
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const NoteDetails: FC = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const handleNoteDelete = async () => {
    try {
      if (!noteId) {
        toast.error(
          "An issue has occurred; please attempt the action again or get in touch with the administrator for assistance."
        );
        return;
      }
      await deleteNote(noteId);
      toast.success("Note was deleted");
      navigate("/notes");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ConfirmPopup
            onConfirm={handleNoteDelete}
            onReject={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      {noteData ? (
        <div className="noteWrapper">
          <button
            className="noteWrapper__button noteWrapper__button--delete"
            onClick={() => setIsModalOpen(prev => !prev)}
          >
            Delete
          </button>
          <button className="noteWrapper__button noteWrapper__button--edit">
            Edit
          </button>
          <h2>{noteData.title}</h2>
          <p>{noteData.content}</p>
          <p>Priority: {noteData.isHighPriority ? "High" : "Low"}</p>
          <button
            className="noteWrapper__backButton"
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
