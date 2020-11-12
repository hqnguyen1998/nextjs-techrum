import React from 'react';
import { Grid } from '@material-ui/core';
// Layout
import Layout from '../layouts/Layout';
// Components
import CategoryContainer from '../components/Category/CategoryContainer';
import SummaryContainer from '../components/SummaryContainer';

export default function Home() {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SummaryContainer />
        </Grid>
        <Grid item xs={12} md={9}>
          <CategoryContainer />
        </Grid>
      </Grid>
    </Layout>
  );
}
