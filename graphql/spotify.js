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

const SpotifyImage = new GraphQLObjectType({
  name: 'SpotifyImage',
  fields: {
    height: {type: GraphQLInt},
    url: {type: GraphQLString},
    width: {type: GraphQLInt},
  },
});

const SpotifyExternalUrls = new GraphQLObjectType({
  name: 'SpotifyExternalUrls',
  fields: {
    spotify: {type: GraphQLString},
  },
});

const SpotifyArtistSimplified = new GraphQLObjectType({
  name: 'SpotifyArtistSimplified',
  fields: {
    external_urls: {type: SpotifyExternalUrls},
    href: {type: GraphQLString},
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    type: {type: GraphQLInt},
    uri: {type: GraphQLInt},
  },
});

const SpotifyAlbum = new GraphQLObjectType({
  name: 'SpotifyAlbum',
  fields: {
    album_type: {type: GraphQLString},
    artists: {type: GraphQLList(SpotifyArtistSimplified)},
    available_markets: {type: GraphQLList(GraphQLString)},
    external_urls: {type: SpotifyExternalUrls},
    href: {type: GraphQLString},
    id: {type: GraphQLString},
    images: {type: GraphQLList(SpotifyImage)},
    name: {type: GraphQLString},
    release_date: {type: GraphQLString},
    release_date_precision: {type: GraphQLString},
    total_tracks: {type: GraphQLInt},
    type: {type: GraphQLString},
    uri: {type: GraphQLString},
  },
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
        const {albums} = await dataSources.spotifyApi.searchAlbums(args);
        const {items: results, ...pagination} = albums;
        console.log('-----------------------');
        console.log(JSON.stringify(results[0], null, 2));
        console.log('-----------------------');
        return {results, pagination};
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
      q: (params.query || '').replace(/[ ]/gi, '+'),
    });
  }
}
