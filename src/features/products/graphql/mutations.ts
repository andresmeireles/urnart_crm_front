import { graphql } from '../../../gql';

export function addModel() {
  return graphql(`
    mutation AddModel($name: String!) {
      addModel(name: $name) {
        id
      }
    }
  `);
}
