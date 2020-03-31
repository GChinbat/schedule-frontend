/// <reference types="next" />
/// <reference types="next/types/global" />

import { ReactNode } from 'react';

declare module '*.svg' {
  const content: ReactNode;
  export default content;
}
