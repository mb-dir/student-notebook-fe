import "./styles.scss";

import { FC } from "react";
import { Link } from "react-router-dom";
import { Note } from "../../services/note";

type NoteCardProps = Note;

const NoteCard: FC<NoteCardProps> = ({
  _id,
  title,
  content,
  isHighPriority,
}) => {
  return (
    <div className="noteCard">
      <h3 className="noteCard__title">
        <Link to={`${_id}`}>{title}</Link>
      </h3>
      <div className="noteCard__content">{content}</div>
      <p className="noteCard__priority">
        Priority: {isHighPriority ? "High" : "Low"}
      </p>
    </div>
  );
};

export default NoteCard;
