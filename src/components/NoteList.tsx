import React from 'react';
import Note from './Note';
import { NoteType } from '../types';

interface NoteListProps {
  notes: NoteType[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="note-list grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
      {notes.map(note => (
        <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
