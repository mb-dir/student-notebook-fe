import "./styles.scss";

import { toast } from "react-toastify";
import { getNotes } from "../../services/note";
import { Dispatch, FC, SetStateAction } from "react";
import { NotesData } from "../../services/note";

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
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setPaginationPage(1);
      const data = await getNotes({ search });
      setNotesData(data);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <form className="searchForm" onSubmit={onSubmit}>
      <input className="searchForm__input" onChange={setSearch} />
      <button className="searchForm__btn">Search</button>
    </form>
  );
};

export default SearchForm;
