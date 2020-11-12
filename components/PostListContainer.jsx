import React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { useRouter } from 'next/router';
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
// Config
import config from '../config/config.json';

// Components
import PaginationComponent from './Pagination';
import PostListItem from './PostListItem';

const useStyles = makeStyles((theme) => ({
  sortActions: {
    width: '100%',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PostListContainer = ({ categoryId }) => {
  const { post_limit, post_sort, API_POST_ROUTE } = config;
  const router = useRouter();
  const classes = useStyles();

  const { data, error } = useSWR(
    `${API_POST_ROUTE}/${categoryId}?sort=${post_sort}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) return <div>failed to load</div>;

  const isAuth = useSelector((state) => state.auth.isAuth);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleRedirectNewPost = () => {
    router.push(`${router.asPath}/new`);
  };

  return (
    <React.Fragment>
      {data ? (
        <PaginationComponent
          totalItems={data.data.length}
          limitItem={post_limit}
          currentPage={page}
          handleChange={handleChangePage}
          shape='rounded'
        >
          {isAuth && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleRedirectNewPost}
            >
              Đăng tin/ bài
            </Button>
          )}
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
                {data.data
                  .slice((page - 1) * post_limit, post_limit * page)
                  .map((post) => (
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
          totalItems={data.data.length}
          limitItem={post_limit}
          currentPage={page}
          handleChange={handleChangePage}
          shape='rounded'
        />
      ) : (
        <React.Fragment>
          <Skeleton variant='rect' animation='wave' height={50} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PostListContainer;
