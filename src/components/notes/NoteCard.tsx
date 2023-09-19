import "./styles.scss";

import { FC } from "react";
import { Note } from "../../services/note";

type NoteCardProps = Omit<Note, "_id">;

const NoteCard: FC<NoteCardProps> = ({ title, content, isHighPriority }) => {
  return (
    <div className="noteCard">
      <h3 className="noteCard__title">{title}</h3>
      <div className="noteCard__content">{content}</div>
      <p className="noteCard__priority">
        Priority: {isHighPriority ? "High" : "Low"}
      </p>
    </div>
  );
};

export default NoteCard;
