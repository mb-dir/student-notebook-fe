import "./styles.scss";

import { Dispatch, FC, SetStateAction } from "react";

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
  const paginationButtonsAmount = Math.ceil(totalNotesCount / notesPerPage);
  const buttons = [];

  const handlePaginationClick = (i: number) => {
    setPaginationPage(i);
    window.scrollTo({ top: 0 });
  };

  for (let i = 1; i <= paginationButtonsAmount; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePaginationClick(i)}
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
