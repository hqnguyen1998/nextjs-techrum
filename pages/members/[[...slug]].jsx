import React from 'react';
// Redux actions
import { wrapper } from '../../redux/store';
import { fetchMemberProfile } from '../../redux/actions/memberActions';
// Components & Layout
import Layout from '../../layouts/Layout';
import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

const ProfilePage = ({ data }) => {
  return (
    <Layout title={data.username}>
      <UserProfileContainer />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params: { slug }, store }) => {
    const { success, data } = await store.dispatch(fetchMemberProfile(slug[1]));

    if (!success || data.username !== slug[0] || slug.length !== 2) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return {
      props: {
        data: data,
      },
    };
  }
);

export default ProfilePage;
