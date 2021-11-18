import { RESTDataSource } from 'apollo-datasource-rest';
import { DISCOGS_TOKEN } from './config';
import {
  DiscogsMaster,
  SearchDiscogsMaster,
  SearchDiscogsFilter,
  DiscogsPaginationParameters,
} from './types';

const omitInvalidParams = <T extends Record<string, any>>(params: T) => {
  const acc: Record<string, string | number> = {};

  for (let key in params) {
    const value = params[key];

    if (typeof value === 'string' || typeof value === 'number') {
      acc[key] = value;
    }
  }
  return acc;
};

interface SearchParams
  extends SearchDiscogsFilter,
    DiscogsPaginationParameters {}

enum types {
  release = 'release',
  master = 'master',
}

interface SearchRequestParams extends SearchParams {
  type: types;
}

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com';
  }

  willSendRequest(request: any) {
    request.params.set('token', DISCOGS_TOKEN);
    console.log(
      `${request.method} ${request.path}?${request.params.toString()}`
    );
  }

  async search<T>(params: SearchRequestParams) {
    return this.get<T>('/database/search', omitInvalidParams(params));
  }

  async searchReleases(params: any) {
    return this.search({
      type: 'release',
      ...params,
    });
  }

  async searchMasters(params: SearchParams): Promise<SearchDiscogsMaster> {
    return this.search<SearchDiscogsMaster>({
      type: types.master,
      ...params,
    });
  }

  async lookupMaster(id: number): Promise<DiscogsMaster> {
    return this.get<DiscogsMaster>(`/masters/${id}`);
  }
}
