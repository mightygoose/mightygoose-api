import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { SPOTIFY_ID, SPOTIFY_SECRET } from './config';
import { InputMaybe, SpotifyAlbum, SpotifyLookupAlbumArgs } from './types';
import { Context } from '.';

// const omitInvalidParams = <T extends Record<string, any>>(params: T) => {
// const acc: Record<string, string | number> = {};

// for (let key in params) {
// const value = params[key];

// if (typeof value === 'string' || typeof value === 'number') {
// acc[key] = value;
// }
// }
// return acc;
// };

// interface SearchParams
// extends SearchDiscogsFilter,
// DiscogsPaginationParameters {}

// interface MasterVersionParams
// extends DiscogsMasterVersionsFilterInput,
// DiscogsPaginationParameters {}

// interface ArtistReleasesParams
// extends DiscogsArtistGetReleasesSort,
// DiscogsPaginationParameters {}

// interface LabelReleasesParams
// extends DiscogsLabelGetReleasesSort,
// DiscogsPaginationParameters {}

// enum SEARCH_TYPES {
// release = 'release',
// master = 'master',
// artist = 'artist',
// label = 'label',
// }

// interface SearchRequestParams extends SearchParams {
// type: SEARCH_TYPES;
// }

const cache = new InMemoryLRUCache();

export class SpotifyAccountsAPI extends RESTDataSource<Context> {
  baseURL = 'https://accounts.spotify.com/api';

  keyValueCache = cache;

  async willSendRequest(request: any) {
    console.log(
      `${request.method} ${this.baseURL}${
        request.path
      }?${request.params.toString()}`
    );
  }

  async getToken() {
    const cachedAccessToken = await this.keyValueCache.get('access_token');
    if (cachedAccessToken) {
      return cachedAccessToken;
    }
    const { access_token, expires_in } = await this.post(
      '/token',
      `${encodeURI('grant_type')}=${encodeURI('client_credentials')}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':
            'Basic ' +
            Buffer.from(SPOTIFY_ID + ':' + SPOTIFY_SECRET).toString('base64'),
        },
      }
    );
    this.keyValueCache.set('access_token', access_token, { ttl: expires_in });
    return access_token;
  }
}

export class SpotifyAPI extends RESTDataSource<Context> {
  baseURL = 'https://api.spotify.com/v1';

  async willSendRequest(request: any) {
    const token = await this.context.dataSources.spotifyAccountsApi.getToken();
    request.headers.set('Authorization', `Bearer ${token}`);
    console.log(
      `${request.method} ${this.baseURL}${
        request.path
      }?${request.params.toString()}`
    );
  }

  async resolveURL(request: any) {
    const url = await super.resolveURL(request);
    url.searchParams.append = () => {};
    const params = [];
    for (const [name, value] of request.params) {
      params.push([name, value].join('='));
    }
    url.search = `?${params.join('&')}`;
    return url;
  }

  async lookupAlbum({
    id,
    market,
  }: SpotifyLookupAlbumArgs): Promise<SpotifyAlbum> {
    return this.get<SpotifyAlbum>(`/albums/${id}`, {
      // market: market || undefined,
    });
  }

  // async search<T>(params: SearchRequestParams) {
  // return this.get<T>('/database/search', omitInvalidParams(params));
  // }

  // async searchReleases(params: SearchParams): Promise<SearchDiscogsRelease> {
  // return this.search<SearchDiscogsRelease>({
  // type: SEARCH_TYPES.release,
  // ...params,
  // });
  // }

  // async lookupRelease(
  // id: number,
  // curr_abbr?: InputMaybe<DiscogsCurrencies>
  // ): Promise<DiscogsRelease> {
  // return this.get<DiscogsRelease>(
  // `/releases/${id}`,
  // omitInvalidParams({ curr_abbr })
  // );
  // }

  // async lookupReleaseRating(id: number): Promise<DiscogsReleaseRatingWrapper> {
  // return this.get<DiscogsReleaseRatingWrapper>(`/releases/${id}/rating`);
  // }

  // async lookupArtistReleases(
  // id: number,
  // params: ArtistReleasesParams
  // ): Promise<DiscogsArtistReleases> {
  // return this.get<DiscogsArtistReleases>(
  // `/artists/${id}/releases`,
  // omitInvalidParams(params)
  // );
  // }

  // async searchMasters(params: SearchParams): Promise<SearchDiscogsMaster> {
  // return this.search<SearchDiscogsMaster>({
  // type: SEARCH_TYPES.master,
  // ...params,
  // });
  // }

  // async lookupMaster(id: number): Promise<DiscogsMaster> {
  // return this.get<DiscogsMaster>(`/masters/${id}`);
  // }

  // async lookupMasterVersions(
  // id: number,
  // params: MasterVersionParams
  // ): Promise<GetDiscogsMasterVersions> {
  // return this.get<GetDiscogsMasterVersions>(
  // `/masters/${id}/versions`,
  // omitInvalidParams(params)
  // );
  // }

  // async searchArtists(params: SearchParams): Promise<SearchDiscogsArtist> {
  // return this.search<SearchDiscogsArtist>({
  // type: SEARCH_TYPES.artist,
  // ...params,
  // });
  // }

  // async lookupArtist(id: number): Promise<DiscogsArtist> {
  // return this.get<DiscogsArtist>(`/artists/${id}`);
  // }

  // async searchLabels(params: SearchParams): Promise<SearchDiscogsLabel> {
  // return this.search<SearchDiscogsLabel>({
  // type: SEARCH_TYPES.label,
  // ...params,
  // });
  // }

  // async lookupLabel(id: number): Promise<DiscogsLabel> {
  // return this.get<DiscogsLabel>(`/labels/${id}`);
  // }

  // async lookupLabelReleases(
  // id: number,
  // params: LabelReleasesParams
  // ): Promise<DiscogsLabelReleases> {
  // return this.get<DiscogsLabelReleases>(
  // `/labels/${id}/releases`,
  // omitInvalidParams(params)
  // );
  // }
}

// import {RESTDataSource} from 'apollo-datasource-rest';
// import {SPOTIFY_ID, SPOTIFY_SECRET} from './config';

// export class SpotifyAPI extends RESTDataSource {
// constructor() {
// super();
// this.baseURL = 'https://api.spotify.com/v1/';
// }

// async willSendRequest(request) {
// request.headers.set('Authorization', `Bearer ${await getToken()}`);
// }

// // workaround to prevent '+' sign escape
// // TODO: remove it, do not replace it in query
// resolveURL(request) {
// const url = super.resolveURL(request);
// url.searchParams.append = () => {};
// const params = [];
// for (const [name, value] of request.params) {
// params.push([name, value].join('='));
// }
// url.search = `?${params.join('&')}`;
// return url;
// }

// search(params) {
// return this.get('search', params);
// }

// searchAlbums(params = {}) {
// return this.search({
// type: 'album',
// q: (params.query || '').replace(/[ ]/gi, '+'),
// });
// }
// }

// export const dataSources = {spotifyApi: new SpotifyAPI()};
