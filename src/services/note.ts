import axiosInstance from "../axiosInstance";

export type Note = {
  title: string;
  content: string;
  isHighPriority: boolean;
};

export type NoteData = {
  notes: Note[];
  totalNotesCount: number;
  page: number;
  notesPerPage: number;
  notesOnCurrentPage: number;
};
export const addNote = async (noteData: Note) => {
  const { data } = await axiosInstance.post<Note>("/notes", noteData);

  return data;
};

export const getNotes = async () => {
  const data = await axiosInstance.get<NoteData>("/notes");
  return data;
};
