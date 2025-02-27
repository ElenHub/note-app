import React from 'react';

import {
  MdSearch,
} from 'react-icons/md';

import {
  Box,
  InputAdornment,
  TextField,
} from '@mui/material'; 

interface SearchProps {
  setSearchTerm: (term: string) => void; 
  toggleStyle: {
    iconColor: string; 
  };
}

const Search: React.FC<SearchProps> = (props) => {
  // Handle the change in input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    props.setSearchTerm(value); 
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgb(233, 233, 233)', 
        borderRadius: '100px' 
      }}
    >
      <TextField
        variant="outlined" 
        placeholder='Search for notes' 
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"> 
              <MdSearch size='1.3rem' /> 
            </InputAdornment>
          ),
          sx: {
            '& .MuiInputBase-input::placeholder': {
              opacity: 1, 
            },
          },
        }}
        sx={{
          width: '100%', 
          '& .MuiOutlinedInput-root': {
            borderRadius: '100px',
            '& fieldset': {
              borderColor: props.toggleStyle.iconColor,
            },
            '&:hover fieldset': {
              borderColor: props.toggleStyle.iconColor, 
            },
            '&.Mui-focused fieldset': {
              borderColor: props.toggleStyle.iconColor, 
            },
          },
        }}
      />
    </Box>
  );
};

export default Search; 

