import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

export const getFieldsFor = ({name}) => {
  const connections = {
    discogs: {type: require('./discogs').DiscogsSearchResult},
    spotify: {
      type: require('./spotify').SpotifySearchResult,
      resolve(args, parent) {
        return args;
      },
    },
  };

  return Object.entries(connections).reduce((acc, [key, value]) => {
    if (key === name) {
      return acc;
    }
    return {...acc, [key]: value};
  }, {});
};

export const getConnectionFor = ({name}) => {
  return {
    type: new GraphQLObjectType({
      name: `${name}_Connection`,
      fields: getFieldsFor({name}),
    }),
    resolve(args, parent) {
      //TODO: experiment here!
      if (!args.query) {
        args.query = args.title;
      }
      return args;
    },
  };
};
