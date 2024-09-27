import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteFilter from './components/NoteFilter';
import './index.css';
import { NoteType } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<NoteType | null>(null);

  const addNote = (note: NoteType) => {
    setNotes([note, ...notes]);
    setFilteredNotes([note, ...notes]);
  };

  const editNote = (updatedNote: NoteType) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  const deleteNote = (id: number) => {
    const remainingNotes = notes.filter((note) => note.id !== id);
    setNotes(remainingNotes);
    setFilteredNotes(remainingNotes);
  };

  const filterNotes = (query: string) => {
    const filtered = notes.filter((note) =>
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleEdit = (id: number) => {
    const note = notes.find((note) => note.id === id) || null;
    setNoteToEdit(note);
  };

  const clearEdit = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Notes Dashboard</h1>
      <NoteForm
        addNote={addNote}
        editNote={editNote}
        noteToEdit={noteToEdit}
        clearEdit={clearEdit}
      />
      <NoteFilter filterNotes={filterNotes} />
      <NoteList notes={filteredNotes} onEdit={handleEdit} onDelete={deleteNote} />
    </div>
  );
};

export default App;
