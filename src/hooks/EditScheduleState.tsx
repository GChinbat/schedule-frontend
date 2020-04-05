import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import { ScheduleEntry } from '@/api/schedule';

export const EditScheduleContext = createContext<{
  item: ScheduleEntry | null;
  setScheduleItem: React.Dispatch<React.SetStateAction<ScheduleEntry>>;
}>({ item: null, setScheduleItem: null });

export function EditScheduleStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [scheduleItem, setScheduleItem] = useState<ScheduleEntry>(null);
  return (
    <EditScheduleContext.Provider
      value={{ item: scheduleItem, setScheduleItem }}
    >
      {children}
    </EditScheduleContext.Provider>
  );
}
