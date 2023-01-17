import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

const CustomDialog = ({ open, handleClose, dialogTitleText, contentText, handleAgree, agreeLabel, cancelLabel, confirmText }) => {
    const [textConfirm, setTextConfirm] = useState('');
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogTitleText}</DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {confirmText && (
                    <TextField
                        margin="dense"
                        id="confirmtext"
                        type="text"
                        fullWidth
                        value={textConfirm}
                        onChange={(e) => setTextConfirm(e.target.value)}
                        variant="outlined"
                        placeholder={`Please type '${confirmText}' to confirm action`}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="inherit">
                    {cancelLabel}
                </Button>
                <Button
                    onClick={handleAgree}
                    variant="outlined"
                    color="error"
                    disabled={!confirmText ? false : confirmText !== textConfirm}
                >
                    {agreeLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CustomDialog.propTypes = {
    dialogTitleText: PropTypes.string,
    contentText: PropTypes.string,
    open: PropTypes.bool,
    agreeLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    handleClose: PropTypes.func,
    handleAgree: PropTypes.func,
    confirmText: PropTypes.string
};
export default CustomDialog;
