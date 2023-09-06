import "./styles.scss";

import { FC } from "react";
import { Note } from "../../services/note";

const NoteCard: FC<Omit<Note, "_id">> = ({
  title,
  content,
  isHighPriority,
}) => {
  return (
    <div className="noteCard">
      <h3 className="noteCard__title">{title}</h3>
      <div className="noteCard__content">{content}</div>
      <p>Priority: {isHighPriority ? "High" : "Low"}</p>
    </div>
  );
};

export default NoteCard;
