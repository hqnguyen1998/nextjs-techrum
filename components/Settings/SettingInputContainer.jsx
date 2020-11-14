import React from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  InputBase,
  Divider,
  Button,
  Box,
  Fade,
  makeStyles,
} from '@material-ui/core';
import { updateUser } from '../../redux/actions/authActions';

const SettingInputContainer = ({
  title,
  placeholder,
  name,
  defaultValue,
  disabled,
  ...otherInputProps
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token, user, isAuth } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    [name]: isAuth ? user[name] : '',
  });

  const handleChange = (e) => {
    setValue((prevValue) => ({ [name]: e.target.value }));
  };

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    const data = await dispatch(updateUser({ token: token, data: value }));

    if (data.success) {
      setOpen(false);
    }

    enqueueSnackbar(data.msg, {
      variant: data.success ? 'success' : 'error',
    });
  };

  return (
    <Box mb={5} className={classes.root}>
      <div className={classes.inputWrapper}>
        <Typography variant='h6' className={classes.heading}>
          {title}
        </Typography>
        <InputBase
          name={name}
          placeholder={placeholder}
          value={value[name] || ''}
          onChange={handleChange}
          fullWidth
          disabled={!open && true}
          {...otherInputProps}
        />
        <Divider light />
      </div>

      <div className={classes.buttonWrapper}>
        {!disabled && !open && (
          <Button onClick={handleOpenEdit} variant='outlined'>
            Edit
          </Button>
        )}
        <Fade in={open}>
          <div>
            <Button
              onClick={handleSubmit}
              variant='outlined'
              color='primary'
              disabled={value[name] && value[name].length <= 0 && true}
            >
              Change
            </Button>{' '}
            <Button
              onClick={handleCloseEdit}
              variant='outlined'
              color='secondary'
            >
              Cancel
            </Button>
          </div>
        </Fade>
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', justifyContent: 'space-between' },
  inputWrapper: { width: '70%' },
  heading: { fontWeight: 600 },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    height: '40px',
  },
}));

export default SettingInputContainer;
