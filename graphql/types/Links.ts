// /graphql/types/Link.ts
import { builder } from "../builder";

builder.prismaObject('Link', {
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        url: t.exposeString('url'),
        description: t.exposeString('description'),
        imageUrl: t.exposeString('imageUrl'),
        category: t.exposeString('category'),
        users: t.relation('User')
    })
})

// 1. 
builder.queryField("linksQ", (t) =>
    // 2. 
    t.prismaField({
        // 3. 
        // type: ['Link'],
        type: ['Link'],
        // 4. 
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.link.findMany({ ...query })
    })
)

// 1. 
builder.queryField("links", (t) =>
    // 2. 
    //   t.prismaField({
    t.prismaConnection({
        // 3. 
        // type: ['Link'],
        type: 'Link',
        cursor: 'id',
        // 4. 
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.link.findMany({ ...query })
    })
)

builder.mutationField("createLink", (t) =>
    t.prismaField({
        type: 'Link',
        args: {
            title: t.arg.string({ required: true }),
            description: t.arg.string({ required: true }),
            url: t.arg.string({ required: true }),
            imageUrl: t.arg.string({ required: true }),
            category: t.arg.string({ required: true }),
        },
        resolve: async (query, _parent, args, ctx) => {
            const { title, description, url, imageUrl, category } = args

            if (!(await ctx).user) {
                throw new Error("You have to be logged in to perform this action")
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: (await ctx).user?.email,
                }
            })

            // if (!user || user.role !== "ADMIN") {
            //     throw new Error("You don have permission ot perform this action")
            // }

            return prisma.link.create({
                ...query,
                data: {
                    // id: 20,
                    title,
                    description,
                    url,
                    imageUrl,
                    category,
                }
            })
        }
    })
)