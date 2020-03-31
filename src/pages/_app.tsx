import App from 'next/app';
import React from 'react';

import { Grommet } from '@bit/grommet.grommet.grommet';
import GlobalStyles from '@/components/GlobalStyles';

export default class ReactApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Grommet full>
        <Component {...pageProps} />
        <GlobalStyles />
      </Grommet>
    );
  }
}
