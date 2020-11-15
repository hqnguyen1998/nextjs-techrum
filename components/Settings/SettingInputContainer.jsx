import React from 'react';
import { fetcher } from '../../src/api-fetcher';
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
  Avatar,
} from '@material-ui/core';
import { updateUser } from '../../redux/actions/authActions';

const SettingInputContainer = ({
  title,
  type,
  placeholder,
  name,
  defaultValue,
  disabled,
  ...otherInputProps
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputFileRef = React.useRef(null);
  const { token, user, isAuth } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [value, setValue] = React.useState({
    [name]: isAuth ? user[name] : '',
  });

  const handleChange = (e) => {
    setValue((prevValue) => ({ [name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    if (type === 'file') {
      const data = new FormData();

      data.append('image', file);
      fetcher(
        `https://api.imgbb.com/1/upload?key=a22cb8b9db6f05965dc8c4560f0b0f76`,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => {
          inputFileRef.current.value = '';
          setOpen(false);
          const newData = {
            [name]: res.data.url,
          };

          dispatch(updateUser({ token, data: newData }));

          setFile('');

          enqueueSnackbar('Cập nhật thông tin thành công', {
            variant: 'success',
          });
        })
        .catch((err) => {
          enqueueSnackbar('Cập nhật thông tin không thành công', {
            variant: 'error',
          });
        });

      return;
    }

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
        {type === 'file' ? (
          <div style={{ display: 'flex' }}>
            <InputBase
              inputRef={inputFileRef}
              type='file'
              name={name}
              onChange={handleFile}
              inputProps={{ accept: 'image/*' }}
              fullWidth
              disabled={!open && true}
              {...otherInputProps}
            />
            <Avatar src={user[name]} />
          </div>
        ) : (
          <InputBase
            name={name}
            placeholder={placeholder}
            value={value[name] || ''}
            onChange={handleChange}
            fullWidth
            disabled={!open && true}
            {...otherInputProps}
          />
        )}
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
