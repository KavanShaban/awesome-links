// graphql/builder.ts

// 1.
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import prisma from "../lib/prisma";

// 2. 
export const builder = new SchemaBuilder<{
    // 3. 
    PrismaTypes: PrismaTypes
}>({
    // 4.
    //   plugins: [PrismaPlugin],
    plugins: [PrismaPlugin, RelayPlugin],
    relayOptions: {},
    prisma: {
        client: prisma,
    }
})

// 5. 
builder.queryType({
    fields: (t) => ({
        ok: t.boolean({
            resolve: () => true,
        }),
    }),
});