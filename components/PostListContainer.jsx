import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import PaginationComponent from './Pagination';

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

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('desc');

  const { data, error } = useSWR(
    `/api/post/${categoryId}?page=${page - 1}&limit=${limit}&sort=${sort}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <React.Fragment>
      <Box mt={2} component={Paper}>
        <div className={classes.sortActions}></div>
        <TableContainer>
          <Table>
            <TableBody>
              {data.data.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <Avatar src={post.author.avatar} />
                  </TableCell>
                  <TableCell>
                    <Link href='/'>
                      <a>
                        <Typography
                          variant='body1'
                          align='justify'
                          color='textPrimary'
                        >
                          {post.title}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          {post.author.username}
                        </Typography>
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography variant='body1' color='textSecondary'>
                        Lượt trả lời
                      </Typography>
                      <Typography variant='body1' color='textPrimary'>
                        {post.comments.length}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <PaginationComponent
        totalItems={totalPosts}
        limitItem={limit}
        currentPage={page}
        handleChange={handleChangePage}
        color='secondary'
      />
    </React.Fragment>
  );
};

export default PostListContainer;
