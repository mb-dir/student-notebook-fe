import axiosInstance from "../axiosInstance";

type Note = {
  title: string;
  content: string;
  isHighPriority: boolean;
};
export const addNote = async (noteData: Note) => {
  const { data } = await axiosInstance.post<Note>("/notes", noteData);

  return data;
};
