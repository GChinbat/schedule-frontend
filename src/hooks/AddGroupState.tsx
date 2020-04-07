import React, { createContext, useState, ReactNode } from 'react';

export const AddGroupContext = createContext<{
  lessonSlug: string | null;
  setLessonSlug: React.Dispatch<React.SetStateAction<string>> | null;
}>({ lessonSlug: null, setLessonSlug: null });

export function AddGroupStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [lessonSlug, setLessonSlug] = useState<string>(null);
  return (
    <AddGroupContext.Provider value={{ lessonSlug, setLessonSlug }}>
      {children}
    </AddGroupContext.Provider>
  );
}
