import React, { useState, useEffect } from 'react';
import { NoteType } from '../types';

interface NoteFormProps {
  addNote: (note: NoteType) => void;
  editNote: (note: NoteType) => void;
  noteToEdit: NoteType | null;
  clearEdit: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote, editNote, noteToEdit, clearEdit }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (noteToEdit) {
      setContent(noteToEdit.content);
    } else {
      setContent('');
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteToEdit) {
      editNote({ ...noteToEdit, content });
      clearEdit();
    } else {
      addNote({ id: Date.now(), content });
    }
    setContent('');
  };

  return (
    <form className="note-form p-4 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 border-2 rounded-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      ></textarea>
      <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
        {noteToEdit ? 'Edit Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
