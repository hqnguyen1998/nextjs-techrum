import React from 'react';
import { fetcher } from '../../src/api-fetcher';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
// Redux actions
import { updateUser } from '../../redux/actions/authActions';

// Components
import UserProfileAvatar from './UserProfileAvatar';
import UserProfileBasicInformation from './UserProfileBasicInformation';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '200px',
  },
  avatar: {
    width: '90%',
    height: '90%',
    margin: 'auto',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  usernameText: {
    textTransform: 'uppercase',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
  },
  input: {
    display: 'none',
  },
}));

const UserProfileHeader = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { token } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.member);

  const inputRef = React.useRef(null);
  const [file, setFile] = React.useState(null);

  function handleAvatar() {
    inputRef.current.click();
  }

  function handleAvatarInput(e) {
    setFile(e.target.files[0]);
  }

  const handleChangeAvatar = async () => {
    let data = new FormData();

    data.append('image', file);

    axios({
      url:
        'https://api.imgbb.com/1/upload?key=a22cb8b9db6f05965dc8c4560f0b0f76',
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: data,
    }).then(async (res) => {
      const { data } = await axios({
        method: 'PUT',
        url: `${process.env.API_URI}/api/user`,
        headers: {
          Authorization: token,
        },
        data: {
          avatar: res.data.data.url,
        },
      });

      setFile(null);

      dispatch(updateUser(data.data));
    });
  };

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3}>
          <div className={classes.avatarContainer}>
            {!isLoading && (
              <UserProfileAvatar
                src={profile.avatar}
                alt={profile.username}
                className={classes.avatar}
              />
            )}
          </div>
          <React.Fragment>
            {file && (
              <div style={{ width: '100%', overflow: 'hidden' }}>
                <Typography variant='caption' noWrap>
                  {file.name}
                </Typography>
                <Button
                  onClick={handleChangeAvatar}
                  variant='contained'
                  color='secondary'
                  fullWidth
                >
                  Thay đổi
                </Button>
              </div>
            )}
            <TextField
              inputRef={inputRef}
              type='file'
              inputProps={{ accept: 'image/*' }}
              onChange={handleAvatarInput}
              style={{ display: 'none' }}
            />
          </React.Fragment>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          {!isLoading && (
            <Typography variant='h5' className={classes.usernameText}>
              {profile.username}
            </Typography>
          )}
          <br />
          <Divider />
          <br />
          {!isLoading && (
            <UserProfileBasicInformation
              joined_date={profile.joined_date}
              total_posts={profile.posts.length}
              total_comments={profile.comments.length}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileHeader;
