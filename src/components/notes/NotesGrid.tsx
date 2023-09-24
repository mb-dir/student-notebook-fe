import { FC } from "react";
import { Note } from "../../services/note";
import NoteCard from "./NoteCard";

type NotesGridProps = { notes: Note[] };

const NotesGrid: FC<NotesGridProps> = ({ notes }) => {
  return (
    <div className="notesWrapper">
      {(notes || []).map(note => {
        return (
          <NoteCard
            key={note._id}
            _id={note._id}
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
