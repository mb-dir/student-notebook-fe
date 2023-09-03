import "./styles.scss";

import { FC } from "react";

const NoteForm: FC = () => {
  return (
    <form className="noteForm">
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="title">
          Title
        </label>
        <input className="noteForm__input" id="title" />
      </div>
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="content">
          Content
        </label>
        <textarea className="noteForm__textarea" id="content" />
      </div>
      <div className="noteForm__inputWrapper">
        <label className="noteForm__label" htmlFor="isHighPriority">
          High priority
        </label>
        <input
          type="checkbox"
          className="noteForm__checkbox"
          id="isHighPriority"
        />
      </div>
      <button className="noteForm__button">Add</button>
    </form>
  );
};

export default NoteForm;
