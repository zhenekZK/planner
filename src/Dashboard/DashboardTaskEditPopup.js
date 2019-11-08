import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function DashboardTaskEditPopup(props) {
    const {
        open,
        title,
        updateTitle,
        createTask,
        handleClose
    } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}
                        margin="dense"
                        // id="list-name"
                        label="Task Title"
                        type="text"
                        fullWidth
                    />
                    <FormControl>
                        <InputLabel id="edit-popup-priority">Priority</InputLabel>
                        <Select
                            labelId="edit-popup-priority"
                            id="edit-popup-priority-select"
                            // value={}
                            // onChange={handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createTask} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DashboardTaskEditPopup.defaultProps = {
    open: false
};

export default DashboardTaskEditPopup;
