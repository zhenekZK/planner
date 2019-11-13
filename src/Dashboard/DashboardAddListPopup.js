import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function DashboardAddListPopup(props) {
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
                        label="List Title"
                        type="text"
                        fullWidth
                    />
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
