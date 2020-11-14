import React from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { wrapper } from '../../redux/store';
// Layouts & Components
import Layout from '../../layouts/Layout';
import Settings from '../../components/Settings/Settings';

const UserSettings = () => {
  const { isAuth } = useSelector((state) => state.auth);

  React.useEffect(() => {
    !isAuth && Router.push('/');
  }, [isAuth]);

  return (
    <Layout>
      <Settings />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, res, req }) => {
    const { auth } = store.getState();

    if (!auth.isAuth) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default UserSettings;
