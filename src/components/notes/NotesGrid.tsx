import { FC } from "react";
import NoteCard from "./NoteCard";
import { NotesData } from "../../services/note";

const NotesGrid: FC<NotesData> = ({
  notes,
  totalNotesCount,
  page,
  notesPerPage,
  notesOnCurrentPage,
}) => {
  return (
    <div className="notesWrapper">
      {(notes || []).map(note => {
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
