import App from 'next/app';
import React from 'react';
import GlobalStyles from '@/components/GlobalStyles';

export default class ReactApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <GlobalStyles />
      </>
    );
  }
}
