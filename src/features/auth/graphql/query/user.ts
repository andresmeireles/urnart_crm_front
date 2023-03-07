import { graphql } from '../../../../gql';

export const getUser = () => {
  return graphql(`
    query GetUser {
      getUser {
        name
      }
    }
  `);
};
