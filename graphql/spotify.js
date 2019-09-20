import https from 'https';
import {gql} from 'apollo-server-koa';
import {RESTDataSource} from 'apollo-datasource-rest';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import SpotifyWebApi from 'spotify-web-api-node';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

const SPOTIFY_ID = process.env['SPOTIFY_ID'];
const SPOTIFY_SECRET = process.env['SPOTIFY_SECRET'];

const SpotifyPagination = new GraphQLObjectType({
  name: 'SpotifyPagination',
  fields: {
    href: {type: GraphQLString},
    next: {type: GraphQLString},
    previous: {type: GraphQLString},
    offset: {type: GraphQLInt},
    limit: {type: GraphQLInt},
    total: {type: GraphQLInt},
  },
});

const SpotifyAlbum = new GraphQLObjectType({
  name: 'SpotifyAlbum',
  fields: {
    name: {type: GraphQLString},
  }
});

const SpotifyAlbumsSearchResult = new GraphQLObjectType({
  name: 'SpotifyAlbumsSearchResult',
  fields: {
    pagination: {
      type: SpotifyPagination,
    },
    results: {
      type: GraphQLList(SpotifyAlbum),
    },
  },
});

export const SpotifySearchResult = new GraphQLObjectType({
  name: 'SpotifySearchResult',
  fields: {
    albums: {
      type: SpotifyAlbumsSearchResult,
      async resolve(args, _, {dataSources}) {
        const { albums } = await dataSources.spotifyApi.searchAlbums(args);
        const { items: results, ...pagination } = albums;
        return { results, pagination };
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: SpotifySearchResult,
});

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_ID,
  clientSecret: SPOTIFY_SECRET,
});

const getToken = (() => {
  let token = null;
  return async () => {
    if (token) {
      return token;
    }
    console.log('refreshing spotify token');
    try {
      const {body} = await spotifyApi.clientCredentialsGrant();
      token = body['access_token'];
      setTimeout(() => (token = null), +body['expires_in'] * 1000);
      return token;
    } catch (e) {
      throw new Error(
        `Something went wrong when retrieving an access token ${e}`,
      );
    }
  };
})();

export class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${await getToken()}`);
  }

  search(params) {
    return this.get('search', params);
  }

  searchAlbums(params = {}) {
    return this.search({
      type: 'album',
      q: (params.query || '').replace(/[ ]/ig, '+'),
    });
  }
}
