import { gql } from 'apollo-server';

export const typeDefs = gql`
  type SearchSpotifyAlbum {
    id: ID!
    title: String!
  }

  extend type SearchAlbums {
    spotify: SearchSpotifyAlbum
  }
`;

export const resolvers = {
  SearchAlbums: {
    spotify: () => {
      console.log('spotify search resolver');
      return { id: 1, title: 'test' };
    },
  },
};

export default { typeDefs, resolvers };
