import gql from 'graphql-tag';

export type Time = {
  hours: number;
  minutes: number;
};
export type ScheduleEntry = {
  id: string;
  lessonGroup: {
    slug: string;
    groupName: string;
    lesson: {
      name: string;
      teachers: string[];
    };
  };
  startTime: Time;
  endTime: Time;
};

export const GET_SCHEDULE = gql`
  query {
    schedule {
      id
      lessonGroup {
        slug
        groupName
        lesson {
          name
          teachers
        }
      }
      startTime {
        hours
        minutes
      }
      endTime {
        hours
        minutes
      }
    }
  }
`;

export const GET_LESSONS_AND_GROUPS = gql`
  query {
    getLessons {
      name
      slug
      groups {
        slug
        groupName
      }
    }
  }
`;

export const ADD_SCHEDULE_ITEM = gql`
  mutation addScheduleItem($item: ScheduleItemInput!) {
    addScheduleItem(item: $item) {
      id
    }
  }
`;

export type EditScheduleItemInput = {
  day?: number;
  endTime?: Time;
  startTime?: Time;
};
export const EDIT_SCHEDULE_ITEM = gql`
  mutation editScheduleItem($id: String!, $item: EditScheduleItemInput!) {
    editScheduleItem(id: $id, item: $item) {
      id
    }
  }
`;

export const GET_SCHEDULE_FOR_GROUP = gql`
  query getScheduleForGroup($groupSlug: String!) {
    scheduleForGroup(groupSlug: $groupSlug) {
      lessonGroup {
        slug
        groupName
        lesson {
          name
          teachers
        }
      }
      startTime {
        hours
        minutes
      }
      endTime {
        hours
        minutes
      }
    }
  }
`;
