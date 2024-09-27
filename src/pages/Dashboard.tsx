import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import NoteFilter from '../components/NoteFilter';
import { NoteType } from '../types';
const Dashboard = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    }
  
    return (
      <div className=" w-screen p-4 bg-yellow-200" style={{height:'100vh'}}>
          {/* Header and Logout button */}
          <div className='flex justify-center items-center'>
              <h1 className="text-center text-yellow-700 text-3xl font-bold mb-4">Notes Dashboard</h1>
              <button className='absolute top-1 right-5 bg-white font-bold text-yellow-700 px-4 py-2 mt-4 rounded-md hover:bg-slate-200' onClick={handleLogout}>Logout</button>
          </div>

          {/* Note Form, Note Filter and Note List */}
          <div className='flex' style={{height:'88vh'}}>

              {/* Note Filter and Note List */}
              <div className='flex flex-col w-1/3'>
                <div className=' pr-4 pl-4'>
                  <NoteFilter filterNotes={filterNotes} />
                </div>
        
                <div className=' overflow-auto pr-4 pl-4 m-1'>
                    <div className='bg-white rounded-lg p-4 border-2 border-yellow-300 shadow-lg' style={{minHeight:'79vh'}}>
                      <NoteList notes={filteredNotes} onEdit={handleEdit} onDelete={deleteNote} />
                    </div>
                </div>
              </div>
              
              {/* Note Form */}
              <div className=' w-2/3 h-full' >
                <NoteForm
                  addNote={addNote}
                  editNote={editNote}
                  noteToEdit={noteToEdit}
                  clearEdit={clearEdit}
                  />
              </div>

        </div>
      </div>
    );
};

export default Dashboard;

