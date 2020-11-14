import { fetcher } from '../../src/api-fetcher';
// config
import { API_USER_ROUTE } from '../../config/config.json';
// Redux actions
import { wrapper } from '../../redux/store';
import { fetchMemberProfile } from '../../redux/actions/memberActions';
// Components & Layout
import Layout from '../../layouts/Layout';
import UserProfileContainer from '../../components/UserProfile/UserProfileContainer';

const ProfilePage = ({ username, id }) => {
  return (
    <Layout title={username}>
      <UserProfileContainer id={id} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params: { slug }, store }) => {
    const { success, data } = await fetcher(
      `${process.env.API_URI}${API_USER_ROUTE}/${slug[1]}`
    );

    if (!success || data.username !== slug[0] || slug.length !== 2) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    store.dispatch(fetchMemberProfile(data));

    return {
      props: {
        username: data.username,
        id: data._id,
      },
    };
  }
);

export default ProfilePage;
