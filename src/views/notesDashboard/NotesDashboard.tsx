import "./styles.scss";

import { FC, useEffect, useState } from "react";
import { NotesData, getNotes } from "../../services/note";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import { Collapse } from "react-collapse";
import Loader from "../../components/loader/Loader";
import NoContent from "../../components/noContent/NoContent";
import NoteForm from "../../components/noteForm/NoteForm";
import NotesGrid from "../../components/notes/NotesGrid";
import Pagination from "../../components/pagination/Pagination";
import { toast } from "react-toastify";

type FormInput = {
  search: string;
};

const NotesDashboard: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.state?.page;
  const [isAddNewNoteOpen, setIsAddNewNoteOpen] = useState<boolean>(false);
  const [isShowAllNotesOpen, setIsShowAllNotesOpen] = useState<boolean>(true);
  const [paginationPage, setPaginationPage] = useState<number>(page || 1);
  const onAddNewNoteClick = () => {
    setIsAddNewNoteOpen(prev => !prev);
    setIsShowAllNotesOpen(false);
    navigate("/notes");
  };
  const onShowAllNotesClick = () => {
    setIsShowAllNotesOpen(prev => !prev);
    setIsAddNewNoteOpen(false);
  };

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

  const [notesData, setNotesData] = useState<NotesData | null>(null);
  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const data = await getNotes({ page: paginationPage });
        setNotesData(data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    getAllNotes();
  }, [paginationPage]);

  return (
    <>
      <h2 className="notesHeader">
        Here you can manage all your notes and add new one as well!
      </h2>
      <div className="collapseWrapper">
        <div className="collapseWrapper__buttons">
          <button
            onClick={onAddNewNoteClick}
            className="collapseWrapper__optionButton"
          >
            Add new note
          </button>
          <button
            onClick={onShowAllNotesClick}
            className="collapseWrapper__optionButton"
          >
            Show all notes
          </button>
        </div>
        <Collapse isOpened={isAddNewNoteOpen}>
          <NoteForm setNotesData={setNotesData} />
        </Collapse>
        <Collapse isOpened={isShowAllNotesOpen}>
          {!!notesData?.notes ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("search")} />
                <button>Szukaj</button>
              </form>
              <NotesGrid notes={notesData.notes} />
              <Pagination
                page={paginationPage}
                setPaginationPage={setPaginationPage}
                totalNotesCount={notesData.totalNotesCount}
                notesPerPage={notesData.notesPerPage}
              />
            </>
          ) : (
            <Loader />
          )}
          {notesData?.notes.length === 0 && (
            <NoContent>There are no notes</NoContent>
          )}
        </Collapse>
      </div>
    </>
  );
};

export default NotesDashboard;
