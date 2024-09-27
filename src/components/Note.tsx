import React, { useEffect, useRef } from 'react';
import pinimg from '../assets/pin.png';
import gsap from 'gsap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NoteType } from '../types';

interface NoteProps {
  note: NoteType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  // Create a ref for the pin image
  const pinRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (pinRef.current) {
      gsap.from(pinRef.current, {
        x: 100,
        scale: 3,     // Start with a small scale
        opacity: 0,     // Start with 0 opacity
        duration: 1,    // Duration of the animation
        ease: 'anticipate'  // A bouncy easing effect
      });
    }
  }, []);

  return (
    <div className="note-card bg-yellow-100 shadow-md p-4 rounded-lg">
      <div className="flex justify-center">
        {/* Attach the ref to the pin image */}
        <img src={pinimg} alt="pin" ref={pinRef} className="w-10" />
      </div>
      <p>{note.content}</p>
      <div className="note-actions mt-2 flex justify-end">
        <FaEdit className="text-blue-500 cursor-pointer mx-2" onClick={() => onEdit(note.id)} />
        <FaTrash className="text-red-500 cursor-pointer" onClick={() => onDelete(note.id)} />
      </div>
    </div>
  );
};

export default Note;
