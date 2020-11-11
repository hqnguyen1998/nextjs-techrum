import React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PaginationComponent from './Pagination';
import PostListItem from './PostListItem';
import NewPostPopup from './NewPostPopup';

const useStyles = makeStyles((theme) => ({
  sortActions: {
    width: '100%',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PostListContainer = ({ categoryId, totalPosts }) => {
  const classes = useStyles();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const [openNewPostDialog, setOpenNewPostDialog] = React.useState(false);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('desc');

  const { data, error } = useSWR(
    `/api/post/${categoryId}?page=${page - 1}&limit=${limit}&sort=${sort}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  if (error) return <div>failed to load</div>;

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleOpenNewPost = () => {
    setOpenNewPostDialog(true);
  };

  const handleCloseNewPost = () => {
    setOpenNewPostDialog(false);
  };

  return (
    <React.Fragment>
      {data ? (
        <PaginationComponent
          totalItems={totalPosts}
          limitItem={limit}
          currentPage={page}
          handleChange={handleChangePage}
          shape='rounded'
          color='secondary'
        >
          <Button
            variant='contained'
            color='primary'
            onClick={() => isAuth && handleOpenNewPost()}
          >
            {isAuth ? 'Đăng bài' : 'Đăng nhập để đăng bài viết'}
          </Button>
          <NewPostPopup open={openNewPostDialog} onClose={handleCloseNewPost} />
        </PaginationComponent>
      ) : (
        <React.Fragment>
          <Skeleton variant='rect' animation='wave' height={50} />
        </React.Fragment>
      )}

      {data ? (
        <Box mt={2} component={Paper}>
          <div className={classes.sortActions}></div>
          <TableContainer>
            <Table>
              <TableBody>
                {data.data.map((post) => (
                  <PostListItem key={post._id} post={post} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <React.Fragment>
          <Box mt={1} mb={1}>
            <Skeleton variant='rect' height={500} />
          </Box>
        </React.Fragment>
      )}

      {data ? (
        <PaginationComponent
          totalItems={totalPosts}
          limitItem={limit}
          currentPage={page}
          handleChange={handleChangePage}
          shape='rounded'
          color='secondary'
        >
          <Button variant='contained' color='primary'>
            {isAuth ? 'Đăng bài' : 'Đăng nhập để đăng bài viết'}
          </Button>
        </PaginationComponent>
      ) : (
        <React.Fragment>
          <Skeleton variant='rect' animation='wave' height={50} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PostListContainer;
