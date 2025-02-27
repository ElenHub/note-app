import React, { useState } from 'react';

import AddIcon
  from '@mui/icons-material/Add'; 
import {
  IconButton,
  TextField,
} from '@mui/material'; 

const TaskInput = (props) => {
    const [title, setTitle] = useState(''); 
    const [error, setError] = useState<string | null>(null); 

    // Handle key down event for the input field
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && title.trim()) {
            props.addTask(title, props.selectedDate);
            setTitle(''); 
            setError(null);
        }
    };

    // Handle the addition of a task
    const handleAddTask = () => {
        if (title.trim()) { 
            props.addTask(title, props.selectedDate); 
            setTitle(''); 
        } else {
            setError('Title is required');
        }
    };

    // Handle changes in the input field
    const handleChange = (e) => {
        setTitle(e.target.value); 
        if (error) {
            setError(null);
        }
    };

    return (
        <>
            <TextField 
                style={{ background: 'rgb(233, 233, 233)', borderRadius: "100px", height: '55px' }} // Styling for the input field
                value={title}
                onChange={handleChange} 
                onKeyDown={handleKeyDown} 
                placeholder="Enter the text" 
                variant="outlined"
                error={!!error} 
                helperText={error} 
                fullWidth 
                InputProps={{}} 
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', 
                            borderRadius: '100px', 
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--orange-color)', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--orange-color)', 
                        },
                    }
                }}
            />
            <IconButton onClick={handleAddTask}>
                <AddIcon sx={{ color: props.toggleStyle }} /> 
            </IconButton>
        </>
    );
};

export default TaskInput; 

