import React, { createContext, useState, ReactNode } from 'react';

import { ScheduleEntry } from '@/api/schedule';

export type EditableScheduleEntry = ScheduleEntry & { day: number };
export const EditScheduleContext = createContext<{
  scheduleItem: EditableScheduleEntry | null;
  setScheduleItem: React.Dispatch<React.SetStateAction<ScheduleEntry>>;
}>({ scheduleItem: null, setScheduleItem: null });

export function EditScheduleStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [scheduleItem, setScheduleItem] = useState<EditableScheduleEntry>(null);
  return (
    <EditScheduleContext.Provider value={{ scheduleItem, setScheduleItem }}>
      {children}
    </EditScheduleContext.Provider>
  );
}
