import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 300,
        minWidth: 290,
    }
}));

function MultipleInput(props) {
    const classes = useStyles();

    const {
        options,
        value,
        placeholder,
        onChange
    } = props;

    return (
        <div className={classes.root}>
            <NoSsr>
                <Select
                    classes={classes}
                    inputId="react-select-multiple"
                    TextFieldProps={{
                        label: 'Countries',
                        InputLabelProps: {
                            htmlFor: 'react-select-multiple',
                            shrink: true,
                        },
                    }}
                    placeholder={placeholder}
                    options={options}
                    value={value}
                    onChange={onChange}
                    isMulti
                />
            </NoSsr>
        </div>
    );
}

MultipleInput.defaultProps = {
    options: [],
    value: [],
    placeholder: 'Select several variants'
};

MultipleInput.propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default MultipleInput;
