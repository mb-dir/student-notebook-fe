import "./styles.scss";

import { FC, useState } from "react";

import { Collapse } from "react-collapse";
import NoteForm from "../../components/noteForm/NoteForm";
import NotesGrid from "../../components/notes/NotesGrid";

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
  return (
    <div>
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
          <NoteForm />
        </Collapse>
        <Collapse isOpened={isShowAllNotesOpen}>
          <NotesGrid />
        </Collapse>
      </div>
    </div>
  );
};

export default NotesDashboard;
