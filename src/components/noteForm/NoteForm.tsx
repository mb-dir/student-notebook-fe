import "./styles.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { FC } from "react";
import { addNote } from "../../services/note";
import { toast } from "react-toastify";

interface IFormInput {
  title: string;
  content: string;
  isHighPriority: boolean;
}

const NoteForm: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    title,
    content,
    isHighPriority,
  }) => {
    try {
      await addNote({ title, content, isHighPriority });
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
