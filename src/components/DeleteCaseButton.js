import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteCaseButton = ({ caseId }) => {
    const { handleDeleteCase } = useContext(UserContext);
    // State hook that determines whether the confirmation dialog is open or not
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Opens the confirmation dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
 
    // Closes the confirmation dialog
    const handleClose = () => {
        setOpen(false);
    };

    // DELETE the case with the specified caseId
    const deleteCase = () => {
        fetch(`http://rails-service:3000/cases/${caseId}`, {
            method: "DELETE",
            headers: {"Authorization": token}
        })
        .then(() => {
          // Remove the case from the user's cases list then closes the confirmation dialog and navigates to the Cases page
            handleDeleteCase(caseId)
            setOpen(false);
            navigate('/Cases')
        })
    }

    // Button triggers the confirmation dialog 
    // Dialog includes a message and two buttons to either confirm or cancel the deletion
    return (
        <div>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Delete case
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this case?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Company policy states that managers may only delete
            cases that are out of the scope of our policies and procedures. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteCase} autoFocus>
            Yes, delete!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteCaseButton;