import React from 'react';
import PropTypes from "prop-types";

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
        description,
        updateField,
        createList,
        handleClose
    } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add list</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(e) => updateField('title', e.target.value)}
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={description}
                        onChange={(e) => updateField('description', e.target.value)}
                        margin="dense"
                        label="Description"
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
    open: true,
    title: '',
    description: ''
};

DashboardAddListPopup.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    onClose: PropTypes.func,
    createList: PropTypes.func,
    updateField: PropTypes.func,
    handleClose: PropTypes.func
};

export default DashboardAddListPopup;
