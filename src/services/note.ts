import axiosInstance from "../axiosInstance";

export type Note = {
  _id: string;
  title: string;
  content: string;
  isHighPriority: boolean;
};

type getNotesParams = { page: number };

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

export const editNote = async (_id: string, noteData: Omit<Note, "_id">) => {
  const { data } = await axiosInstance.put<Note>(`/notes/${_id}`, noteData);
  return data;
};

export const getNotes = async (params?: getNotesParams) => {
  const { data } = await axiosInstance.get<NotesData>("/notes", { params });
  return data;
};

export const getNote = async (_id: string) => {
  const { data } = await axiosInstance.get<Note>(`/notes/${_id}`);
  return data;
};

export const deleteNote = async (_id: string) => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${_id}`);
  return data;
};
