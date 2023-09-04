import "./styles.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { FC } from "react";

interface IFormInput {
  title: string;
  content: string;
  isHighPriority: boolean;
}

const NoteForm: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = ({
    title,
    content,
    isHighPriority,
  }) => {
    console.log(title, content, isHighPriority);
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
