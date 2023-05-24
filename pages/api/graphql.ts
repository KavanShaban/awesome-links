// pages/api/graphql.ts

import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse, NextConfig } from 'next'
import { resolvers } from '../../graphql/resolvers'

// import { typeDefs } from '../../graphql/schema'
import { schema } from '../../graphql/schema'

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    // schema: createSchema({
    //     typeDefs,
    //     resolvers
    // }),
    schema,
    graphqlEndpoint: '/api/graphql'
})

export const config = {
    api: {
        bodyParser: false
    }
}