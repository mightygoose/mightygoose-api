import { RESTDataSource } from 'apollo-datasource-rest';
import { DISCOGS_TOKEN } from './config';
import {
  InputMaybe,
  DiscogsMaster,
  DiscogsRelease,
  SearchDiscogsMaster,
  SearchDiscogsRelease,
  SearchDiscogsFilter,
  DiscogsPaginationParameters,
  GetDiscogsMasterVersions,
  DiscogsMasterVersionsFilterInput,
  DiscogsCurrencies,
  DiscogsReleaseRatingWrapper,
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

interface MasterVersionParams
  extends DiscogsMasterVersionsFilterInput,
    DiscogsPaginationParameters {}

enum SEARCH_TYPES {
  release = 'release',
  master = 'master',
}

interface SearchRequestParams extends SearchParams {
  type: SEARCH_TYPES;
}

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com';
  }

  willSendRequest(request: any) {
    request.params.set('token', DISCOGS_TOKEN);
    console.log(
      `${request.method} ${this.baseURL}${
        request.path
      }?${request.params.toString()}`
    );
  }

  async search<T>(params: SearchRequestParams) {
    return this.get<T>('/database/search', omitInvalidParams(params));
  }

  async searchReleases(params: SearchParams): Promise<SearchDiscogsRelease> {
    return this.search<SearchDiscogsRelease>({
      type: SEARCH_TYPES.release,
      ...params,
    });
  }

  async lookupRelease(
    id: number,
    curr_abbr?: InputMaybe<DiscogsCurrencies>
  ): Promise<DiscogsRelease> {
    return this.get<DiscogsRelease>(
      `/releases/${id}`,
      omitInvalidParams({ curr_abbr })
    );
  }

  async lookupReleaseRating(id: number): Promise<DiscogsReleaseRatingWrapper> {
    return this.get<DiscogsReleaseRatingWrapper>(`/releases/${id}/rating`);
  }

  async searchMasters(params: SearchParams): Promise<SearchDiscogsMaster> {
    return this.search<SearchDiscogsMaster>({
      type: SEARCH_TYPES.master,
      ...params,
    });
  }

  async lookupMaster(id: number): Promise<DiscogsMaster> {
    return this.get<DiscogsMaster>(`/masters/${id}`);
  }

  async lookupMasterVersions(
    id: number,
    params: MasterVersionParams
  ): Promise<GetDiscogsMasterVersions> {
    return this.get<GetDiscogsMasterVersions>(
      `/masters/${id}/versions`,
      omitInvalidParams(params)
    );
  }
}
