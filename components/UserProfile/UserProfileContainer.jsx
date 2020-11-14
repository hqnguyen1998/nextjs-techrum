import React from 'react';
import UserProfileHeader from './UserProfileHeader';
import { useSelector } from 'react-redux';
import PostListItem from '../PostListItem';
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@material-ui/core';

const UserProfileContainer = () => {
  const { profile, isLoading } = useSelector((state) => state.member);

  return (
    <React.Fragment>
      <UserProfileHeader />

      {!isLoading && (
        <Box component={Paper} mt={2} p={1}>
          <Typography
            variant='h4'
            style={{ fontWeight: 600, textTransform: 'capitalize' }}
          >
            Bài viết/tin
          </Typography>
          <br />
          <Divider light />
          <TableContainer>
            <Table>
              <TableBody>
                {profile.posts.map((post) => (
                  <PostListItem key={post._id} post={post} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </React.Fragment>
  );
};

export default UserProfileContainer;
