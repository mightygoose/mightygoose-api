import { RESTDataSource } from 'apollo-datasource-rest';
import { DISCOGS_TOKEN } from './config';
import {
  DiscogsMaster,
  SearchDiscogsMaster,
  SearchDiscogsFilter,
  DiscogsPaginationParameters,
} from './types';

const processParams = <T extends Record<string, any>>(
  obj: T
): { [K in keyof T]: NonNullable<T[K]> } => {
  const res = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === 'undefined' || value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as { [K in keyof T]: NonNullable<T[K]> });

  return res;
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
  }

  async search<T>(params: SearchRequestParams) {
    return this.get<T>('/database/search', processParams(params));
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
