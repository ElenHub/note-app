import { useCallback, useState } from 'react';

const useConfirmationDialog = () => {
  const [open, setOpen] = useState(false)
  const [itemIdToRemove, setItemIdToRemove] = useState<string | null>(null); 

  // Function to open the dialog and set the item ID to remove
  const handleOpen = useCallback((id: string) => {
    setItemIdToRemove(id); 
    setOpen(true); 
  }, []);

  // Function to close the dialog and reset the item ID
  const handleClose = useCallback(() => {
    setOpen(false); 
    setItemIdToRemove(null); 
  }, []);

  // Return the dialog state and control functions
  return { open, handleOpen, handleClose, itemIdToRemove };
};

export default useConfirmationDialog;