import { Dialog, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },
  dialogTitleText: {
    fontWeight: 600,
    fontSize: '18px',
    color: theme.palette.secondary.contrastText,
  },
}));

const DialogContainer = ({ open, handleClose, title, children }) => {
  const classes = useStyles();
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Typography variant='h5' className={classes.dialogTitleText}>
          {title}
        </Typography>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogContainer;
