import React from 'react';

interface NoteFilterProps {
  filterNotes: (query: string) => void;
}

const NoteFilter: React.FC<NoteFilterProps> = ({ filterNotes }) => {
  return (
    <input
      type="text"
      className="filter-input p-2 border-yellow-300 focus:outline-yellow-600 border-2 rounded-lg mb-4 w-full"
      onChange={(e) => filterNotes(e.target.value)}
      placeholder="Search notes..."
    />
  );
};

export default NoteFilter;
