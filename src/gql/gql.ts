/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Login($name: String!, $password: String!, $remember: Boolean = false) {\n      login(name: $name, password: $password, remember: $remember)\n    }\n  ": types.LoginDocument,
    "\n    query GetUser {\n      getUser {\n        name\n      }\n    }\n  ": types.GetUserDocument,
    "\n    mutation AddModel($name: String!) {\n      addModel(name: $name) {\n        id\n      }\n    }\n  ": types.AddModelDocument,
    "\n    mutation AddSpec($name: String!) {\n      addSpec(name: $name) {\n        id\n      }\n    }\n  ": types.AddSpecDocument,
    "\n    mutation AddColor($name: String!) {\n      addColor(name: $name) {\n        id\n      }\n    }\n  ": types.AddColorDocument,
    "\n    mutation AddType($name: String!) {\n      addType(name: $name) {\n        id\n      }\n    }\n  ": types.AddTypeDocument,
    "\n    mutation AddProduct(\n      $model: Int!\n      $height: String!\n      $price: Float!\n      $type: Int\n      $color: Int\n      $spec: Int\n    ) {\n      addProduct(\n        model: $model\n        type: $type\n        height: $height\n        price: $price\n        color: $color\n        spec: $spec\n      ) {\n        model {\n          name\n        }\n        type {\n          name\n        }\n        color {\n          name\n        }\n        height\n        spec {\n          name\n        }\n      }\n    }\n  ": types.AddProductDocument,
    "\n    query GetModels {\n      models {\n        id\n        name\n      }\n    }\n  ": types.GetModelsDocument,
    "\n    query GetColors {\n      colors {\n        id\n        name\n      }\n    }\n  ": types.GetColorsDocument,
    "\n    query GetTypes {\n      types {\n        id\n        name\n      }\n    }\n  ": types.GetTypesDocument,
    "\n    query GetSpecs {\n      specs {\n        id\n        name\n      }\n    }\n  ": types.GetSpecsDocument,
    "\n    query GetProducts {\n      products {\n        id\n        model {\n          name\n        }\n        color {\n          name\n        }\n        spec {\n          name\n        }\n        type {\n          name\n        }\n        height\n        price\n      }\n    }\n  ": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Login($name: String!, $password: String!, $remember: Boolean = false) {\n      login(name: $name, password: $password, remember: $remember)\n    }\n  "): (typeof documents)["\n    query Login($name: String!, $password: String!, $remember: Boolean = false) {\n      login(name: $name, password: $password, remember: $remember)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUser {\n      getUser {\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetUser {\n      getUser {\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddModel($name: String!) {\n      addModel(name: $name) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddModel($name: String!) {\n      addModel(name: $name) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddSpec($name: String!) {\n      addSpec(name: $name) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddSpec($name: String!) {\n      addSpec(name: $name) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddColor($name: String!) {\n      addColor(name: $name) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddColor($name: String!) {\n      addColor(name: $name) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddType($name: String!) {\n      addType(name: $name) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation AddType($name: String!) {\n      addType(name: $name) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddProduct(\n      $model: Int!\n      $height: String!\n      $price: Float!\n      $type: Int\n      $color: Int\n      $spec: Int\n    ) {\n      addProduct(\n        model: $model\n        type: $type\n        height: $height\n        price: $price\n        color: $color\n        spec: $spec\n      ) {\n        model {\n          name\n        }\n        type {\n          name\n        }\n        color {\n          name\n        }\n        height\n        spec {\n          name\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation AddProduct(\n      $model: Int!\n      $height: String!\n      $price: Float!\n      $type: Int\n      $color: Int\n      $spec: Int\n    ) {\n      addProduct(\n        model: $model\n        type: $type\n        height: $height\n        price: $price\n        color: $color\n        spec: $spec\n      ) {\n        model {\n          name\n        }\n        type {\n          name\n        }\n        color {\n          name\n        }\n        height\n        spec {\n          name\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetModels {\n      models {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetModels {\n      models {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetColors {\n      colors {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetColors {\n      colors {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTypes {\n      types {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetTypes {\n      types {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSpecs {\n      specs {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetSpecs {\n      specs {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProducts {\n      products {\n        id\n        model {\n          name\n        }\n        color {\n          name\n        }\n        spec {\n          name\n        }\n        type {\n          name\n        }\n        height\n        price\n      }\n    }\n  "): (typeof documents)["\n    query GetProducts {\n      products {\n        id\n        model {\n          name\n        }\n        color {\n          name\n        }\n        spec {\n          name\n        }\n        type {\n          name\n        }\n        height\n        price\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;