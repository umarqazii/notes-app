import React from 'react';

interface NoteFilterProps {
  filterNotes: (query: string) => void;
}

const NoteFilter: React.FC<NoteFilterProps> = ({ filterNotes }) => {
  return (
    <input
      type="text"
      className="filter-input w-full p-2 border-2 rounded-lg mb-4"
      onChange={(e) => filterNotes(e.target.value)}
      placeholder="Search notes..."
    />
  );
};

export default NoteFilter;
