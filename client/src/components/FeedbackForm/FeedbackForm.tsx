import React, { useCallback } from 'react';

import { toast } from 'react-toastify';

import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useFeedbacks } from '../../hooks/useFeedbacks';
import { useLoadFeedbacks } from '../../hooks/useLoadFeedbacks';
import { BackButton } from '../BackButton/BackButton';
import FeedbackInput from '../FeedbackInput/FeedbackInput';
import FeedbackList from '../FeedbackList/FeedbackList';

interface FeedbackFormProps {
  toggleStyle: {
    iconColor: string; 
  };
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ toggleStyle }) => {
  const { createFeedbacks, removeFeedbacks, editFeedbackTitle } = useFeedbacks();
  const { feedbacks, loading, error } = useLoadFeedbacks(); 
  
  const updateFeedbackTitle  = useCallback((id: string, newTitle: string) => {
    editFeedbackTitle(id, newTitle);
  }, [editFeedbackTitle]);

  const addFeedback = useCallback((title: string) => {
    if (title.trim()) {
      createFeedbacks({ title });
      toast.success('The feedback was successfully added!');
    } 
  }, [createFeedbacks]);

  return (
    <Box sx={{ marginTop: 4, bgcolor: "var(--white-color)", padding: 2, borderRadius: 2, boxShadow: 2 }}>
      <BackButton toggleStyle={toggleStyle} />
         <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center", color: toggleStyle.textColor }}>
          Add Feedback
        </Typography>
      {loading ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress color='warning' />
          </Box>
        </>
      ) : error ? (
        <Typography variant="body1" color="error" align="center" sx={{ margin: 2 }}>
          Error loading tasks: {error}
        </Typography>
      ) : (
        <>
        <FeedbackInput toggleStyle={toggleStyle} addFeedback={addFeedback} loading={loading} />
        <FeedbackList 
          toggleStyle={toggleStyle} 
          feedbacks={feedbacks}  
          removeFeedbacks={removeFeedbacks} 
          updateFeedbackTitle={updateFeedbackTitle}
        />
        </>
      )}
     </Box>
  );
  
};
 


export default FeedbackForm;