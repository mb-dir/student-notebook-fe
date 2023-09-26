import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { NotesData, getNotes } from "../../services/note";

import { Collapse } from "react-collapse";
import NoteForm from "../../components/noteForm/NoteForm";
import NotesGrid from "../../components/notes/NotesGrid";
import Pagination from "../../components/pagination/Pagination";
import { toast } from "react-toastify";

const NotesDashboard: FC = () => {
  const [isAddNewNoteOpen, setIsAddNewNoteOpen] = useState<boolean>(false);
  const [isShowAllNotesOpen, setIsShowAllNotesOpen] = useState<boolean>(false);
  const [paginationPage, setPaginationPage] = useState<number>(1);

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
        const data = await getNotes({ page: paginationPage });
        setNotesData(data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    getAllNotes();
  }, [paginationPage]);

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
          {!!notesData?.notes.length ? (
            <>
              <NotesGrid notes={notesData.notes} />
              <Pagination
                page={paginationPage}
                setPaginationPage={setPaginationPage}
                totalNotesCount={notesData.totalNotesCount}
                notesPerPage={notesData.notesPerPage}
              />
            </>
          ) : (
            <div>No notes yet</div>
          )}
        </Collapse>
      </div>
    </>
  );
};

export default NotesDashboard;
