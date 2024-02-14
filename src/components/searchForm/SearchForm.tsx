import "./styles.scss";

import { toast } from "react-toastify";
import { getNotes } from "../../services/note";
import { FC, FormEvent } from "react";
import { NotesData } from "../../services/note";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

type SearchFormProps = {
  setPaginationPage: (page: number) => void;
  setNotesData: (data: NotesData) => void;
  setSearch: any;
  search: string;
};
const SearchForm: FC<SearchFormProps> = ({
  setPaginationPage,
  setNotesData,
  setSearch,
  search,
}) => {
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPaginationPage(1);
      navigate({
        pathname: "/notes",
        search: `?${createSearchParams({
          page: "1",
          search,
        })}`,
      });
      const data = await getNotes({ search });
      setNotesData(data);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <form className="searchForm" onSubmit={onSubmit}>
      <input
        className="searchForm__input"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="searchForm__btn">Search</button>
    </form>
  );
};

export default SearchForm;
