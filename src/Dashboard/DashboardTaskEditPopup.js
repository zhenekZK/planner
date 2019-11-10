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
        status,
        priority,
        updateField,
        editTask,
        onClose
    } = props;

    console.log(props, "What the fuck man?");

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(e) => updateField('title', e.target.value)}
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
                            value={priority}
                            onChange={(e) => updateField('priority', e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="edit-popup-status">Status</InputLabel>
                        <Select
                            labelId="edit-popup-status"
                            id="edit-popup-status-select"
                            value={status}
                            onChange={(e) => updateField('status', e.target.value)}
                        >
                            <MenuItem value='open'>Open</MenuItem>
                            <MenuItem value='processing'>Processing</MenuItem>
                            <MenuItem value='done'>Done</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editTask} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DashboardTaskEditPopup.defaultProps = {
    title: '',
    open: false,
    status: 'open',
    priority: 1
};

export default DashboardTaskEditPopup;
