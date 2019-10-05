import {
  mergeSchemas,
  makeExecutableSchema,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import {gql} from 'apollo-server-koa';
import {
  graphql,
  extendSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import {promises as fsPromises} from 'fs';
import path from 'path';

const {readdir} = fsPromises;

const searchParams = {
  query: {type: GraphQLString},
  artist: {type: GraphQLString},
  album: {type: GraphQLString},
};

const loadExtensions = async extensions => {
  return Promise.all(extensions.map(name => import(path.resolve(name))));
};

export const init = async ({extensions}) => {
  const modulesData = await loadExtensions(extensions);

  const fields = {};
  const resolvers = {};
  let schemaExtension = '';

  for (let index in modulesData) {
    const {name, SearchResultName, ConnectionName, schema} = modulesData[index];

    // TODO: extract name and SearchResultName from schema root type

    fields[name] = {
      type: schema.getType(SearchResultName),
      args: searchParams,
      resolve(search, nestedSearch) {
        return {...search, ...nestedSearch};
      },
    };

    let connectionExtensionSchema = ``;
    const connectionResolvers = {};
    for (let i in modulesData) {
      if (i === index) {
        continue;
      }

      const {
        name: moduleName,
        SearchResultName: moduleSearchResultName,
      } = modulesData[i];

      connectionExtensionSchema += `
        ${moduleName}: ${moduleSearchResultName}
      `;

      connectionResolvers[moduleName] = obj => obj;
    }

    schemaExtension += `
      extend type ${ConnectionName} {
        ${connectionExtensionSchema}
      }
    `;
    resolvers[ConnectionName] = connectionResolvers;
  }

  const SearchResult = new GraphQLObjectType({
    name: 'SearchResult',
    fields,
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'search',
      fields: {
        search: {
          type: SearchResult,
          args: searchParams,
          resolve(_, args) {
            return args;
          },
        },
      },
    }),
  });

  const extendedSchema = extendSchema(schema, gql(schemaExtension));

  addResolveFunctionsToSchema({schema: extendedSchema, resolvers});

  const dataSources = modulesData.reduce((acc, {dataSources}) => {
    return {
      ...acc,
      ...dataSources,
    };
  }, {});

  return [extendedSchema, dataSources];
};
