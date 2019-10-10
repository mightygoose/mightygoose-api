import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';


export const UseFields = new GraphQLInputObjectType({
  name: 'UseFields',
  fields: {
    key: {type: GraphQLNonNull(GraphQLString)},
    as: {type: GraphQLString},
  },
});

export const createUseFields = (name, keys = []) => {
  const SearchFields = new GraphQLEnumType({
    name: `${name}SearchFields`,
    values: keys.reduce((acc, key) => ({ ...acc, [key]: { value: key } }), {})
  });
  return new GraphQLInputObjectType({
    name,
    fields: {
      key: {type: GraphQLNonNull(SearchFields)},
      use: {type: GraphQLString},
    },
  })
};
