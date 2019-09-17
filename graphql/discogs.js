const { gql } = require('apollo-server-koa');
import { RESTDataSource } from 'apollo-datasource-rest';


export const typeDefs = gql`
  type DiscogsRelease {
    artist: String
    album: String
  }

  type DiscogsSearchResult {
    releases: [DiscogsRelease]
  }
`;

export const resolvers = {
};

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://foo.bar';
  }

  search(params){
    return {
      releases: () => {
	return [{ artist: 'Foo', album: 'Blah' }]
      }
    }
  }
}
