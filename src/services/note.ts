import axiosInstance from "../axiosInstance";

export type Note = {
  _id: string;
  title: string;
  content: string;
  isHighPriority: boolean;
};

export type NotesData = {
  notes: Note[];
  totalNotesCount: number;
  page: number;
  notesPerPage: number;
  notesOnCurrentPage: number;
};
export const addNote = async (noteData: Omit<Note, "_id">) => {
  const { data } = await axiosInstance.post<Note>("/notes", noteData);

  return data;
};

export const getNotes = async () => {
  const data = await axiosInstance.get<NotesData>("/notes");
  return data;
};
