import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// const useStyles = makeStyles({
//     root: {
//         background: 'linear-gradient(45deg, #96cfab 30%, #83d884 70%)',
//         border: 0,
//         borderRadius: 5,
//         boxShadow: '0 3px 5px 2px rgba(131, 216, 130, .25)',
//         padding: '20px',
//     },
// });

function DashboardAddListPopup(props) {
    // const classes = useStyles();

    const {
        open,
        title,
        updateTitle,
        createList,
        handleClose
    } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        margin="dense"
                        // id="list-name"
                        label="List Title"
                        type="text"
                        fullWidth
                    />
                    {/*<TextField*/}
                    {/*    value={surname}*/}
                    {/*    onChange={(e) => setSurname(e.target.value)}*/}
                    {/*    margin="dense"*/}
                    {/*    id="surname"*/}
                    {/*    label="Surname"*/}
                    {/*    type="text"*/}
                    {/*    fullWidth*/}
                    {/*/>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createList} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DashboardAddListPopup.defaultProps = {
    open: false
};

export default DashboardAddListPopup;
