import "./styles.scss";

import { Dispatch, FC, SetStateAction } from "react";

import { useNavigate } from "react-router-dom";

type PaginationProps = {
  page: number;
  totalNotesCount: number;
  notesPerPage: number;
  setPaginationPage: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<PaginationProps> = ({
  page,
  totalNotesCount,
  notesPerPage,
  setPaginationPage,
}) => {
  const navigate = useNavigate();

  const paginationButtonsAmount = Math.ceil(totalNotesCount / notesPerPage);
  const buttons = [];

  for (let i = 1; i <= paginationButtonsAmount; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => {
          setPaginationPage(i);
          navigate(`/notes?page=${i}`);
        }}
        className={`paginationWrapper__button ${
          page === i ? "paginationWrapper__button--active" : ""
        }`}
      >
        {i}
      </button>
    );
  }
  return <div className="paginationWrapper">{buttons}</div>;
};

export default Pagination;
