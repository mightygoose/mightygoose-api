import {GraphQLString, GraphQLInt, GraphQLInputObjectType} from 'graphql';

export const SearchParams = {
  q: {
    type: GraphQLString,
    description: `
	Example: nirvana
	Your search query
    `,
  },
  query: {
    type: GraphQLString,
    description: `
	Example: nirvana
	Your search query
    `,
  },
  title: {
    type: GraphQLString,
    description: `
	Example: nirvana - nevermind
	Search by combined “Artist Name - Release Title” title field.
    `,
  },
  release_title: {
    type: GraphQLString,
    description: `
	Example: nevermind
	Search release titles.
    `,
  },
  credit: {
    type: GraphQLString,
    description: `
	Example: kurt
	Search release credits.
    `,
  },
  artist: {
    type: GraphQLString,
    description: `
	Example: nirvana
	Search artist names.
    `,
  },
  anv: {
    type: GraphQLString,
    description: `
	Example: nirvana
	Search artist ANV.
    `,
  },
  label: {
    type: GraphQLString,
    description: `
	Example: dgc
	Search label names.
    `,
  },
  genre: {
    type: GraphQLString,
    description: `
	Example: rock
	Search genres.
    `,
  },
  style: {
    type: GraphQLString,
    description: `
	Example: grunge
	Search styles.
    `,
  },
  country: {
    type: GraphQLString,
    description: `
	Example: canada
	Search release country.
    `,
  },
  year: {
    type: GraphQLInt,
    description: `
	Example: 1991
	Search release year.
    `,
  },
  format: {
    type: GraphQLString,
    description: `
	Example: album
	Search formats.
    `,
  },
  catno: {
    type: GraphQLString,
    description: `
	Example: DGCD-24425
	Search catalog number.
    `,
  },
  barcode: {
    type: GraphQLString,
    description: `
	Example: 7 2064-24425-2 4
	Search barcodes.
    `,
  },
  track: {
    type: GraphQLString,
    description: `
	Example: smells like teen spirit
	Search track titles.
    `,
  },
  submitter: {
    type: GraphQLString,
    description: `
	Example: milKt
	Search submitter username.
    `,
  },
  contributor: {
    type: GraphQLString,
    description: `
	Example: jerome99
	Search contributor usernames.
    `,
  },
};

export const Search = new GraphQLInputObjectType({
  name: 'Search',
  fields: SearchParams,
});
