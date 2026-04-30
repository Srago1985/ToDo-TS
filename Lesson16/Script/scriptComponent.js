const root = ReactDOM.createRoot(document.getElementById('root'));

const Task = ({content}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedContent, setEditedContent] = React.useState(content);   
    
    const handleClickDelete = () => {
       if (confirm('Are you sure you want to delete this task?')) {
           // In a real app, this would remove the task from state
           console.log("Task deleted:", content);
       }
    };
    
    if (isEditing) {
        return (
            <div className="box">
                <input 
                    type="text" 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
                <button className="btn light" onClick={() => setIsEditing(false)}>Save</button>
            </div>
        );
    } else {
        return (
            <div className="box">
                <div>{editedContent}</div>
                <button className="btn light" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn red" onClick={handleClickDelete}>Delete</button>
            </div>
        );
    }
};

root.render(
    <div className="field">
        <Task content={'Task 1'}/>
        <Task content={'Task 2'}/>
        <Task content={'Task 3'}/>
    </div>
);
