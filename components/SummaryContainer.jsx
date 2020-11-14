import { Box, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { fetcher } from '../src/api-fetcher';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
  },
}));

const SummaryContainer = () => {
  const classes = useStyles();
  const [totalPosts, setTotalPosts] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const dataFetching = async () => {
      const posts = await fetcher(`${process.env.API_URI}/api/post`);
      const users = await fetcher(`${process.env.API_URI}/api/user`);

      setUsers(users.data);

      setTotalPosts(posts.data.length);
    };

    dataFetching();
  }, []);

  return (
    <Box component={Paper}>
      <div style={{ padding: 10 }}>
        <Typography
          variant='h5'
          align='center'
          color='secondary'
          style={{ fontWeight: 800 }}
        >
          Thống kê diễn đàn
        </Typography>
      </div>
      <Divider light />
      <div style={{ marginTop: 10 }}>
        <Typography variant='body1' align='center' color='textSecondary'>
          Bài viết: <span className={classes.text}>{totalPosts}</span>
        </Typography>
        <Typography variant='body1' align='center' color='textSecondary'>
          Thành viên: <span className={classes.text}>{users.length}</span>
        </Typography>
        <Typography variant='body1' align='center' color='textSecondary'>
          Thành viên mới nhất:{' '}
          <span className={classes.text}>
            {users.length > 0 ? users[users.length - 1].username : ''}
          </span>
        </Typography>
      </div>
      <br />
    </Box>
  );
};

export default SummaryContainer;
