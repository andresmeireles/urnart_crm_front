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

export function addSpec() {
  return graphql(`
    mutation AddSpec($name: String!) {
      addSpec(name: $name) {
        id
      }
    }
  `);
}

export function addColor() {
  return graphql(`
    mutation AddColor($name: String!) {
      addColor(name: $name) {
        id
      }
    }
  `);
}

export function addType() {
  return graphql(`
    mutation AddType($name: String!) {
      addType(name: $name) {
        id
      }
    }
  `);
}

export function addProduct() {
  return graphql(`
    mutation AddProduct(
      $model: Int!
      $height: String!
      $price: Float!
      $type: Int
      $color: Int
      $spec: Int
    ) {
      addProduct(
        model: $model
        type: $type
        height: $height
        price: $price
        color: $color
        spec: $spec
      ) {
        model {
          name
        }
        type {
          name
        }
        color {
          name
        }
        height
        spec {
          name
        }
      }
    }
  `);
}
