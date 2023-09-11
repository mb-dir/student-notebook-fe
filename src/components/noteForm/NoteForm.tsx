import "./styles.scss";

import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { NoteData, addNote, getNotes } from "../../services/note";
import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-toastify";

type FormInput = {
  title: string;
  content: string;
  isHighPriority: boolean;
};
type NoteFormProps = {
  setNotesData: Dispatch<SetStateAction<NoteData | null>>;
};

const NoteForm: FC<NoteFormProps> = ({ setNotesData }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormInput>();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormInput> = async ({
    title,
    content,
    isHighPriority,
  }) => {
    try {
      await addNote({ title, content, isHighPriority });
      const { data } = await getNotes();
      setNotesData(data);
      toast.success("New note added");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <form className="noteForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="title">
          Title
        </label>
        <input className="noteForm__input" id="title" {...register("title")} />
      </div>
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="content">
          Content
        </label>
        <textarea
          className="noteForm__textarea"
          id="content"
          {...register("content")}
        />
      </div>
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="isHighPriority">
          High priority
        </label>
        <input
          type="checkbox"
          className="noteForm__checkbox"
          id="isHighPriority"
          {...register("isHighPriority")}
        />
      </div>
      <button className="noteForm__button">Add</button>
    </form>
  );
};

export default NoteForm;
