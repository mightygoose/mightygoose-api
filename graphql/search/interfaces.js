import {GraphQLID, GraphQLString, GraphQLInterfaceType} from 'graphql';

export const SearchItemInterface = new GraphQLInterfaceType({
  name: 'SearchItemInterface',
  fields: {
    id: {type: GraphQLID},
    type: {type: GraphQLString},
    title: {type: GraphQLString},
  },
  resolveType: () => {},
});
