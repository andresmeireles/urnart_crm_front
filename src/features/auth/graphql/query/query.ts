import { graphql } from '../../../../gql';

export const auth = () => {
  return graphql(`
    query Login($name: String!, $password: String!, $remember: Boolean = false) {
      login(name: $name, password: $password, remember: $remember)
    }
  `);
};
