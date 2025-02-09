import React from 'react';

import {
  Button,
  TextField,
} from '@mui/material';

interface NoteFormProps {
  title: string; 
  details: string;
  onSubmit: (e: React.FormEventHandler<HTMLFormElement>) => void; 
  onChange: (field: string, value: string) => void;
  errors: { title?: string; details?: string };
  fontColor: string; 
  toggleStyle: { backgroundColor: string; iconColor: string }; 
}

const NoteForm: React.FC<NoteFormProps> = (props) => {
  return (
    <form onSubmit={props.onSubmit}> 
      {/* Title input field */}
      <TextField
        label="Title" 
        value={props.title}
        onChange={(e) => props.onChange('title', e.target.value)}
        error={Boolean(props.errors.title)} 
        helperText={props.errors.title} 
        fullWidth 
        margin="normal" 
        InputProps={{
          sx: {
            borderRadius: '14px', 
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black', 
            },
          },
        }}
        sx={{
          '& label.Mui-focused': {
            color: 'black', 
          },
          marginBottom: '20px' 
        }}
      />
      
      {/* Details input field */}
      <TextField
        label="Details"
        color='transparent' 
        value={props.details} 
        onChange={(e) => props.onChange('details', e.target.value)} 
        multiline 
        rows={24} 
        error={Boolean(props.errors.details)} 
        helperText={props.errors.details} 
        fullWidth 
        InputProps={{
          sx: {
            borderRadius: '14px', 
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black', 
            },
          },
        }}
        sx={{
          '& label.Mui-focused': {
            color: 'black', 
          },
          '& .MuiInputBase-input': {
            color: props.fontColor, 
          },
        }}
      />

      {/* Submit button */}
      <Button
        sx={{
          borderRadius: '30px', 
          backgroundColor: 'var(--orange-color)', 
          color: "var(--black-color)",
          marginBottom: '20px', 
          marginTop: '30px' 
        }}
        type="submit" 
        variant="contained" 
        fullWidth 
      >
        Submit
      </Button>  
    </form>
  );
}

export default NoteForm; 

