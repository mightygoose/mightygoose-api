import {GraphQLID, GraphQLInterfaceType} from 'graphql';

export const SearchItemInterface = new GraphQLInterfaceType({
  name: 'SearchItemInterface',
  fields: {
    id: {type: GraphQLID},
  },
  resolveType: () => {},
});
