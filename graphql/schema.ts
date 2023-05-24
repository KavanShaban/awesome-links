// graphql/schema.ts

import { builder } from "./builder";
import "./types/Links"
import "./types/Users"

export const schema = builder.toSchema()

// export const typeDefs = `
//   type Link {
//     id: ID
//     title: String
//     description: String
//     url: String
//     category: String
//     imageUrl: String
//     users: [String]
//   }

//   type Query {
//     links: [Link]!
//   }
// `