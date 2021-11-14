import { gql } from 'apollo-server';

export const typeDefs = gql`
  input SearchAlbumFilter {
    q: String
  }

  type SearchAlbums {
    searchInfo: String
  }

  scalar RelationInfo

  type Relation {
    info: RelationInfo
  }

  type Search {
    albums(q: String, filter: SearchAlbumFilter): SearchAlbums
  }

  type Query {
    search: Search
  }
`;

export const resolvers = {
  Query: {
    search: () => ({}),
  },
  Search: {
    albums: (_data: any, { filter, q }: { filter: any; q: string }) => {
      console.log('search album resolver', filter);
      return { filter, q };
    },
  },
};

export default { typeDefs, resolvers };
