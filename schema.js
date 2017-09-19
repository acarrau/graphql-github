const fetch = require('node-fetch');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: {
        name: {
            type: GraphQLString,
            resolve: data => data.name
        },
        location: {
            type: GraphQLString,
            resolve: data => data.location
        },
        avatar_url: {
            type: GraphQLString,
            resolve: data => data.avatar_url
        }
    }
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    userName: { type: GraphQLString }
                },
                resolve: (root, args) => fetch(`https://api.github.com/users/${args.userName}`)
                    .then(response => response.json())
            }
        })
    })
})

