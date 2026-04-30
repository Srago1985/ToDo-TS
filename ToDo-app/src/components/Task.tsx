import React, { memo, useEffect, useState } from 'react';

interface TaskProps {
    id: number;
    text: string;
    remove: (id: number) => void;
    edit: (id: number, text: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, remove, edit }: TaskProps) => {
    const [isEditing, setIsEditing] = useState(false);
        const [editedContent, setEditedContent] = useState(text);

        useEffect(() => {
                setEditedContent(text);
        }, [text]);
    
    const handleClickDelete = () => {
       if (confirm('Are you sure you want to delete this task?')) {
                     remove(id);
       }
    };

    const handleSave = () => {
                edit(id, editedContent);
        setIsEditing(false);
    };
    
    if (isEditing) {
        return (
            <div className="flex items-center gap-3 p-4 my-3 border border-gray-300 rounded-lg bg-gray-50">
                <input 
                    type="text" 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors" onClick={handleSave}>Save</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-3 p-4 my-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex-1 text-left text-gray-800">{text}</div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors" onClick={handleClickDelete}>Delete</button>
            </div>
        );
    }
};

export default memo(Task);