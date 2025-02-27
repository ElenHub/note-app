import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import useConfirmationDialog
  from '../../hooks/useConfirmationDialog'; 
import useNotes from '../../hooks/useNotes';
import { NoteItemProps } from '../../types/type';
import ConfirmationDialog from '../Forms/ConfirmationDialog';

const NoteItem: React.FC<NoteItemProps> = (props) => {
  const { removeNote } = useNotes();
  const { open, handleOpen, handleClose, itemIdToRemove } = useConfirmationDialog();

  // Function to handle delete action
  const handleDelete = () => {
    if (itemIdToRemove) {
      removeNote(itemIdToRemove);
      toast.error('The note was successfully deleted!');
    }
    handleClose();
  };

  // If no note data is provided, render nothing
  if (!props.note) {
    return null;
  }

  return (
    <Card sx={{ backgroundColor: props.note.color, marginBottom: 2, borderRadius: '15px' }}>
      <CardContent>
        <Link to={`/edit/${props.note._id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" color="text.primary">
            {props.note.title?.length > 20 ? `${props.note.title.substr(0, 20)}...` : props.note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginTop:'6px'}}>
              {props.note.details.length > 46 ? (props.note.details.substr(0, 46)) + '...' : props.note.details}
         </Typography>
        </Link>

        {/* Section for date and delete button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <Typography variant="caption" color="text.secondary">
            {props.note.date}
          </Typography>
          <IconButton
            sx={{
              color: 'error',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              }
            }}
            onClick={() => handleOpen(props.note._id)}
          >
            <Delete color='error' />
          </IconButton>
          
            {/* Confirmation dialog for delete action */}
          <ConfirmationDialog
            open={open}
            handleClose={handleClose}
            handleConfirm={handleDelete}
            itemType="note"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteItem;