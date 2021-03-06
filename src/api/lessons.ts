import gql from 'graphql-tag';

export type LessonGroup = {
  slug: string;
  lesson: Lesson;
  groupName: string;
};

export type Lesson = {
  slug: string;
  name: string;
  groups: LessonGroup[];
  teachers: string[];
};

export const GET_LESSONS = gql`
  {
    getLessons {
      slug
      name
      groups {
        slug
        groupName
      }
      teachers
    }
  }
`;
