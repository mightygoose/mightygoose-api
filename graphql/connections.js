import {DiscogsRelease, DiscogsSearchResult} from './discogs';
import {SpotifyAlbum, SpotifySearchResult} from './spotify';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

export const connections = {
  discogs: {type: DiscogsSearchResult},
  spotify: {
    type: SpotifySearchResult,
    resolve(args, parent) {
      return args;
    },
  },
};

export const getFieldsFor = ({name}) => {
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
      name: 'Connection',
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
