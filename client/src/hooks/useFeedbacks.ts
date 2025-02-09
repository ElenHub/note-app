import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { feedbacksAPI } from '../api/feedbacks-api';
import {
    addFeedbacks,
    deleteFeedbacks,
    FeedbackType,
    setFeedbacks,
    updateFeedbackTitle,
} from '../redux/features/feedbacksSlice';

export const useFeedbacks = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector((state: RootState) => state.feedbacks.feedbacks) || [];

    // Effect for loading feedbacks when the component mounts
    useEffect(() => {
        const loadFeedbacks = async () => {
            try {
                const fetchedFeedbacks = await feedbacksAPI.getFeedbacks();
                dispatch(setFeedbacks(fetchedFeedbacks));
            } catch (error) {
                console.error('Error loading feedbacks:', error);
            }
        };
        loadFeedbacks(); 
    }, [dispatch, feedbacks]); 

    // Function to create a new feedback
    const createFeedbacks = async (feedback: FeedbackType) => {
        try {
            const newFeedback = await feedbacksAPI.createFeedbacks(feedback.title);
            dispatch(addFeedbacks(newFeedback));
        } catch (error) {
            console.error('Error creating feedback:', error);
        }
    };

    // Function to remove a feedback by ID
    const removeFeedbacks = async (id: string) => {
        try {
            await feedbacksAPI.deleteFeedbacks(id);
            dispatch(deleteFeedbacks(id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    // Function to edit the title of a feedback
    const editFeedbackTitle = async (id: string, newTitle: string) => {
        try {
            await feedbacksAPI.updateFeedbacks(id, newTitle);
            dispatch(updateFeedbackTitle({ id, newTitle }));
        } catch (error) {
            console.error('Error updating feedback title:', error);
        }
    };

    return { feedbacks, createFeedbacks, removeFeedbacks, editFeedbackTitle };
};

