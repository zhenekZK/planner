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

function DashboardTaskAddPopup(props) {
    const {
        open,
        title,
        description,
        status,
        priority,
        updateField,
        onSave,
        onClose
    } = props;

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(e) => updateField('title', e.target.value)}
                        margin="dense"
                        id="edit-popup-title-select"
                        label="Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={description}
                        onChange={(e) => updateField('description', e.target.value)}
                        margin="dense"
                        id="edit-popup-description-select"
                        label="Description"
                        fullWidth
                        multiline
                        rows="3"
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="edit-popup-priority">Priority</InputLabel>
                        <Select
                            labelId="edit-popup-priority"
                            id="edit-popup-priority-select"
                            value={priority}
                            onChange={(e) => updateField('priority', e.target.value)}
                        >
                            <MenuItem value='low'>low</MenuItem>
                            <MenuItem value='medium'>medium</MenuItem>
                            <MenuItem value='high'>high</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin='normal'>
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
                    <Button onClick={onSave} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DashboardTaskAddPopup.defaultProps = {
    title: '',
    open: false,
    status: 'open',
    priority: 'low',
    list: null
};

export default DashboardTaskAddPopup;
