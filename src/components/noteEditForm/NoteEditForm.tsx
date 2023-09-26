import "./styles.scss";

import { FC, MouseEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { editNote } from "../../services/note";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type FormInput = {
  title: string;
  content: string;
  isHighPriority: boolean;
};
type NoteEditFormProps = FormInput & { onDiscard: () => void; _id: string };

const NoteEditForm: FC<NoteEditFormProps> = ({
  title,
  content,
  isHighPriority,
  onDiscard,
  _id,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      title,
      content,
      isHighPriority,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async ({
    title,
    content,
    isHighPriority,
  }) => {
    try {
      await editNote(_id, { title, content, isHighPriority });
      onDiscard();
      navigate("/notes");
      toast.success("Note was edited");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <form className="noteEditForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="noteEditForm__inputWrapper">
        <label className="noteEditForm__label" htmlFor="title">
          Title
        </label>
        <input
          className={`noteEditForm__input ${
            !!errors.title ? "noteEditForm__input--error" : ""
          }`}
          id="title"
          {...register("title", {
            required: "Title field is required",
          })}
        />
        <p className="noteEditForm__error">{errors.title?.message}</p>
      </div>
      <div className="noteEditForm__inputWrapper">
        <label className="noteEditForm__label" htmlFor="content">
          Content
        </label>
        <textarea
          className={`noteEditForm__textarea ${
            !!errors.content ? "noteEditForm__textarea--error" : ""
          }`}
          id="content"
          {...register("content", {
            required: "Content field is required",
          })}
        />
        <p className="noteEditForm__error">{errors.content?.message}</p>
      </div>
      <div className="noteEditForm__inputWrapper">
        <label className="noteEditForm__label" htmlFor="isHighPriority">
          High priority
        </label>
        <input
          type="checkbox"
          className="noteEditForm__checkbox"
          id="isHighPriority"
          {...register("isHighPriority")}
        />
      </div>
      <button className="noteEditForm__button noteEditForm__button--save">
        Save
      </button>
      <button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onDiscard();
        }}
        className="noteEditForm__button noteEditForm__button--discard"
      >
        Discard changes
      </button>
    </form>
  );
};

export default NoteEditForm;
