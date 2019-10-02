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
  // discogs: {type: DiscogsSearchResult},
  spotify: {
    type: SpotifySearchResult,
    resolve(args, parent) {
      //TODO: experiment here!
      if(!args.query){
        args.query = args.title;
      }
      return args;
    },
  },
};

export const getConnectionsFor = ({name}) => {
  return Object.entries(connections).reduce((acc, [key, value]) => {
    if (key === name) {
      return acc;
    }
    return {...acc, [key]: value};
  }, {});
};

export const Connection = new GraphQLObjectType({
  name: 'Connection',
  fields: connections,
});
