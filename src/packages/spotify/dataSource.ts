import { RESTDataSource } from 'apollo-datasource-rest';
// import { DISCOGS_TOKEN } from './config';
// import {
// InputMaybe,
// DiscogsMaster,
// DiscogsRelease,
// SearchDiscogsMaster,
// SearchDiscogsRelease,
// SearchDiscogsArtist,
// SearchDiscogsFilter,
// DiscogsPaginationParameters,
// GetDiscogsMasterVersions,
// DiscogsMasterVersionsFilterInput,
// DiscogsCurrencies,
// DiscogsReleaseRatingWrapper,
// DiscogsArtist,
// DiscogsArtistGetReleasesSort,
// DiscogsArtistReleases,
// SearchDiscogsLabel,
// DiscogsLabel,
// DiscogsLabelGetReleasesSort,
// DiscogsLabelReleases,
// } from './types';

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

export class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://api.spotify.com/v1';

  willSendRequest(request: any) {
    // request.params.set('token', DISCOGS_TOKEN);
    // console.log(
    // `${request.method} ${this.baseURL}${
    // request.path
    // }?${request.params.toString()}`
    // );
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
