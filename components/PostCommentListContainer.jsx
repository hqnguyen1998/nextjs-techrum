import React from 'react';
import useSWR from 'swr';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Pagination from '../components/Pagination';

// Components
import CommentListItem from './CommentListItem';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PostCommentListContainer = ({ pid }) => {
  let limitItems = 5;

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, error } = useSWR(`/api/comment?pid=${pid}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) {
    return Array.from({ length: 5 }, (v, i) => (
      <Box key={i} mt={2} mb={2}>
        <Skeleton variant='rect' height={200} />
      </Box>
    ));
  }

  const handlePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      {data.data
        .slice((currentPage - 1) * limitItems, currentPage * limitItems)
        .map((comment) => (
          <CommentListItem key={comment._id} comment={comment} />
        ))}
      <Pagination
        totalItems={data.data.length}
        limitItem={limitItems}
        currentPage={currentPage}
        handleChange={handlePage}
      />
    </React.Fragment>
  );
};

export default PostCommentListContainer;
