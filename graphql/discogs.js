import {gql} from 'apollo-server-koa';
import {RESTDataSource} from 'apollo-datasource-rest';

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;

export const typeDefs = gql`
  type DiscogsRelease {
    artist: String
    album: String
    title: String
  }

  type DiscogsSearchResult {
    releases: [DiscogsRelease]
  }
`;

export const resolvers = {};

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com/database';
  }

  willSendRequest(request) {
    request.params.set('token', DISCOGS_TOKEN);
  }

  search(params) {
    return {
      releases: async () => {
        const response = await this.get('search', {
          type: 'release',
          q: encodeURI(params.query),
        });
        return response.results;
      },
    };
  }
}
