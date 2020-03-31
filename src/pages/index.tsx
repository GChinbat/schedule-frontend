import React from 'react';
import Head from 'next/head';

import { withApollo } from '@/api/withApollo';

import Schedule from '@/components/Schedule';

function Home() {
  return (
    <>
      <Head>
        <title>React App</title>
      </Head>
      <Schedule />
    </>
  );
}

export default withApollo({ ssr: true })(Home);
