import React from 'react';
import Pagination from '../components/Pagination';

// Components
import CommentListItem from './CommentListItem';

const PostCommentListContainer = ({ comments }) => {
  let limitItems = 5;

  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      {comments
        .slice((currentPage - 1) * limitItems, currentPage * limitItems)
        .map((comment) => (
          <CommentListItem key={comment._id} comment={comment} />
        ))}
      <Pagination
        totalItems={comments.length}
        limitItem={limitItems}
        currentPage={currentPage}
        handleChange={handlePage}
      />
    </React.Fragment>
  );
};

export default PostCommentListContainer;
