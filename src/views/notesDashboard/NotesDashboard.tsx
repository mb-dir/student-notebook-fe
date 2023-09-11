import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { NotesData, getNotes } from "../../services/note";

import { Collapse } from "react-collapse";
import NoteForm from "../../components/noteForm/NoteForm";
import NotesGrid from "../../components/notes/NotesGrid";
import { toast } from "react-toastify";

const NotesDashboard: FC = () => {
  const [isAddNewNoteOpen, setIsAddNewNoteOpen] = useState<boolean>(false);
  const [isShowAllNotesOpen, setIsShowAllNotesOpen] = useState<boolean>(false);
  const onAddNewNoteClick = () => {
    setIsAddNewNoteOpen(prev => !prev);
    setIsShowAllNotesOpen(false);
  };
  const onShowAllNotesClick = () => {
    setIsShowAllNotesOpen(prev => !prev);
    setIsAddNewNoteOpen(false);
  };

  const [notesData, setNotesData] = useState<NotesData | null>(null);
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
    <>
      <h2 className="notesHeader">
        Here you can manage all your notes and add new one as well!
      </h2>
      <div className="collapseWrapper">
        <div className="collapseWrapper__buttons">
          <button
            onClick={onAddNewNoteClick}
            className="collapseWrapper__optionButton"
          >
            Add new note
          </button>
          <button
            onClick={onShowAllNotesClick}
            className="collapseWrapper__optionButton"
          >
            Show all notes
          </button>
        </div>
        <Collapse isOpened={isAddNewNoteOpen}>
          <NoteForm setNotesData={setNotesData} />
        </Collapse>
        <Collapse isOpened={isShowAllNotesOpen}>
          <NotesGrid
            notes={notesData?.notes || []}
            totalNotesCount={notesData?.totalNotesCount || 0}
            page={notesData?.page || 0}
            notesPerPage={notesData?.notesPerPage || 0}
            notesOnCurrentPage={notesData?.notesOnCurrentPage || 0}
          />
        </Collapse>
      </div>
    </>
  );
};

export default NotesDashboard;
