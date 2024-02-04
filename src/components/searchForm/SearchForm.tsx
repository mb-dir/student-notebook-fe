import "./styles.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getNotes } from "../../services/note";
import { FC } from "react";
import { NotesData } from "../../services/note";

type FormInput = {
  search: string;
};
type SearchFormProps = {
  setPaginationPage: (page: number) => void;
  setNotesData: (data: NotesData) => void;
};
const SearchForm: FC<SearchFormProps> = ({
  setPaginationPage,
  setNotesData,
}) => {
  const { handleSubmit, register } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async ({ search }) => {
    try {
      setPaginationPage(1);
      const data = await getNotes({ search });
      setNotesData(data);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
      <input className="searchForm__input" {...register("search")} />
      <button className="searchForm__btn">Search</button>
    </form>
  );
};

export default SearchForm;
