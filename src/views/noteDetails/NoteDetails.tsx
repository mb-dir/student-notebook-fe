import "./styles.scss";

import { FC } from "react";
import { useParams } from "react-router";

const NoteDetails: FC = () => {
  const { noteId } = useParams();
  return <div>{noteId}</div>;
};

export default NoteDetails;
