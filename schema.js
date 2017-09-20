const fetch = require('node-fetch');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

const RepoType = new GraphQLObjectType({
    name: 'Repo',
    description: 'Repo',
    fields: {
        name: {
            type: GraphQLString,
            resolve: data => data.name
        },
        url: {
            type: GraphQLString,
            resolve: data => data.url
        },
        size: {
            type: GraphQLString,
            resolve: data => data.size
        }
    }
})

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
        },
        repos: {
            type: new GraphQLList(RepoType),
            resolve: (root, args) => {
                console.log("root", root, args)
                return fetch(`https://api.github.com/users/${args.userName}/repos`)
                    .then(response => response.json())
            }
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

