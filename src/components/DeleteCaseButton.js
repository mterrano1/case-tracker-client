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
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const deleteCase = () => {
        fetch(`http://localhost:3000/cases/${caseId}`, {
            method: "DELETE",
            headers: {"Authorization": token}
        })
        .then(() => {
            handleDeleteCase(caseId)
            setOpen(false);
            navigate('/Cases')
        })
    }

    return (
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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