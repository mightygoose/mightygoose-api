export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  RelationInfo: any;
  SearchAlbumFilter: any;
  SearchMasterFilter: any;
  SearchReleaseFilter: any;
  SpotifySearchAlbumsInfo: any;
};

export type AlbumRelation = {
  __typename?: 'AlbumRelation';
  discogs?: Maybe<DiscogsRelation>;
  info?: Maybe<Scalars['RelationInfo']>;
  spotify?: Maybe<SpotifyRelation>;
};

export type DiscogsCommunity = {
  __typename?: 'DiscogsCommunity';
  have?: Maybe<Scalars['Int']>;
  want?: Maybe<Scalars['Int']>;
};

export type DiscogsRelation = {
  __typename?: 'DiscogsRelation';
  albums?: Maybe<SearchDiscogsMaster>;
  artists?: Maybe<Scalars['String']>;
};

export type DiscogsSearchPagination = {
  __typename?: 'DiscogsSearchPagination';
  items?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pages?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  urls?: Maybe<DiscogsSearchPaginationUrls>;
};

export type DiscogsSearchPaginationUrls = {
  __typename?: 'DiscogsSearchPaginationUrls';
  last?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
};

export type DiscogsSearchResultMaster = {
  __typename?: 'DiscogsSearchResultMaster';
  barcode?: Maybe<Array<Maybe<Scalars['String']>>>;
  catno?: Maybe<Scalars['String']>;
  community?: Maybe<DiscogsCommunity>;
  country?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  format?: Maybe<Array<Maybe<Scalars['String']>>>;
  genre?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Array<Maybe<Scalars['String']>>>;
  master_id?: Maybe<Scalars['Int']>;
  master_url?: Maybe<Scalars['String']>;
  relation?: Maybe<MasterRelation>;
  resource_url?: Maybe<Scalars['String']>;
  style?: Maybe<Array<Maybe<Scalars['String']>>>;
  thumb?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
};

export type MasterRelation = {
  __typename?: 'MasterRelation';
  discogs?: Maybe<DiscogsRelation>;
  info?: Maybe<Scalars['RelationInfo']>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  search?: Maybe<Search>;
};

export type ReleaseRelation = {
  __typename?: 'ReleaseRelation';
  discogs?: Maybe<DiscogsRelation>;
  info?: Maybe<Scalars['RelationInfo']>;
};

export type Search = {
  __typename?: 'Search';
  albums?: Maybe<SearchAlbums>;
  masters?: Maybe<SearchMasters>;
  releases?: Maybe<SearchReleases>;
};


export type SearchAlbumsArgs = {
  filter?: Maybe<Scalars['SearchAlbumFilter']>;
  search?: Maybe<Scalars['String']>;
};


export type SearchMastersArgs = {
  filter?: Maybe<Scalars['SearchMasterFilter']>;
  search?: Maybe<Scalars['String']>;
};


export type SearchReleasesArgs = {
  filter?: Maybe<Scalars['SearchReleaseFilter']>;
  search?: Maybe<Scalars['String']>;
};

export type SearchAlbums = {
  __typename?: 'SearchAlbums';
  _searchInfo?: Maybe<SearchInfo>;
  spotify?: Maybe<SearchSpotifyAlbum>;
};


export type SearchAlbumsSpotifyArgs = {
  filter?: Maybe<Scalars['SearchAlbumFilter']>;
  search?: Maybe<Scalars['String']>;
};

export type SearchDiscogsMaster = {
  __typename?: 'SearchDiscogsMaster';
  pagination?: Maybe<DiscogsSearchPagination>;
  results?: Maybe<Array<Maybe<DiscogsSearchResultMaster>>>;
};

export type SearchInfo = {
  __typename?: 'SearchInfo';
  filter?: Maybe<Scalars['SearchAlbumFilter']>;
  search?: Maybe<Scalars['String']>;
};

export type SearchMasters = {
  __typename?: 'SearchMasters';
  _searchInfo?: Maybe<SearchInfo>;
  discogs?: Maybe<SearchDiscogsMaster>;
};


export type SearchMastersDiscogsArgs = {
  filter?: Maybe<Scalars['SearchMasterFilter']>;
  search?: Maybe<Scalars['String']>;
};

export type SearchReleases = {
  __typename?: 'SearchReleases';
  _searchInfo?: Maybe<SearchInfo>;
};

export type SearchSpotifyAlbum = {
  __typename?: 'SearchSpotifyAlbum';
  info?: Maybe<Scalars['SpotifySearchAlbumsInfo']>;
  results?: Maybe<Array<Maybe<SpotifyAlbum>>>;
};

export type SpotifyAlbum = {
  __typename?: 'SpotifyAlbum';
  id?: Maybe<Scalars['ID']>;
  relation?: Maybe<AlbumRelation>;
  title?: Maybe<Scalars['String']>;
};

export type SpotifyRelation = {
  __typename?: 'SpotifyRelation';
  albums?: Maybe<SearchSpotifyAlbum>;
  artists?: Maybe<Scalars['String']>;
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};
