import gql from 'graphql-tag';

export const GET_SCHEDULE = gql`
  query {
    schedule {
      lessonGroup {
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
