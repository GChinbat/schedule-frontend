import gql from 'graphql-tag';

export type Time = {
  hours: number;
  minutes: number;
};
export type ScheduleEntry = {
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
