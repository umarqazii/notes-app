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
    <form className="note-form p-4 border-2 border-yellow-300 bg-white rounded-lg shadow-lg" style={{height:'99.5%'}} onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 border-yellow-200 focus:outline-yellow-500 border-2 rounded-lg h-5/6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      ></textarea>
      <button type="submit" className="mt-2 bg-yellow-300 font-bold text-yellow-700 px-4 py-2 rounded-md hover:bg-yellow-500">
        {noteToEdit ? 'Edit Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
