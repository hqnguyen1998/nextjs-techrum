import React from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import {
  Box,
  InputBase,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import Layout from '../../layouts/Layout';
import PostListItem from '../../components/PostListItem';

const useStyles = makeStyles(() => ({
  input: {
    height: '70px',
    fontSize: '30px',
  },
}));

const SearchPage = () => {
  const router = useRouter();
  const classes = useStyles();

  const { q } = router.query;

  const [search, setSearch] = React.useState(q || '');
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${process.env.API_URI}/api/post?q=${search}`
      );

      const data = await response.json();

      setPosts(data.data);
    };

    fetchPosts();
  }, [search]);

  return (
    <Layout title='Search'>
      <Box component={Paper} p={2} mb={2}>
        <InputBase
          placeholder='Search'
          fullWidth
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classes={{
            input: classes.input,
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            {posts.length > 0 &&
              posts.map((post) => <PostListItem key={post._id} post={post} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default SearchPage;
