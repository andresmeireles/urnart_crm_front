import { graphql } from '../../../gql';

export function modelQuery() {
  return graphql(`
    query GetModels {
      models {
        id
        name
      }
    }
  `);
}

export function colorQuery() {
  return graphql(`
    query GetColors {
      colors {
        id
        name
      }
    }
  `);
}

export function typesQuery() {
  return graphql(`
    query GetTypes {
      types {
        id
        name
      }
    }
  `);
}

export function specQuery() {
  return graphql(`
    query GetSpecs {
      specs {
        id
        name
      }
    }
  `);
}
