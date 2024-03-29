import "./styles.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Note, editNote, getNote } from "../../services/note";

import Loader from "../loader/Loader";
import { Quill } from "quill";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type FormInput = {
  title: string;
  content: string;
  isHighPriority: boolean;
};
type NoteEditFormProps = FormInput & {
  onDiscard: () => void;
  _id: string;
  setNoteData: Dispatch<SetStateAction<Note | null>>;
};

const NoteEditForm: FC<NoteEditFormProps> = ({
  title,
  content,
  isHighPriority,
  onDiscard,
  _id,
  setNoteData,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      title,
      content,
      isHighPriority,
    },
  });
  const quillRef = useRef<ReactQuill | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLabelClick = () => {
    if (quillRef.current) {
      const quill: Quill = quillRef.current.getEditor();
      quill.setSelection(quill.getLength(), quill.getLength());
      quill.focus();
    }
  };
  const onSubmit: SubmitHandler<FormInput> = async ({
    title,
    content,
    isHighPriority,
  }) => {
    setIsLoading(true);
    try {
      await editNote(_id, { title, content, isHighPriority });
      const data = await getNote(_id);
      setNoteData(data);
      onDiscard();
      navigate(`/notes/${_id}`);
      toast.success("Note was edited");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}{" "}
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
          <label
            className="noteEditForm__label"
            htmlFor="content"
            onClick={onLabelClick}
          >
            Content
          </label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content field is required" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                ref={el => {
                  if (el) {
                    quillRef.current = el;
                  }
                }}
                id="content"
                className={`noteForm__textarea ${
                  !!errors.content ? "noteForm__textarea--error" : ""
                }`}
              />
            )}
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
    </>
  );
};

export default NoteEditForm;
