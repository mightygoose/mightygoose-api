export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  SearchDiscogsFilter: any;
};

export type AlbumRelation = {
  __typename?: 'AlbumRelation';
  discogs?: Maybe<DiscogsRelation>;
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

export type DiscogsSearch = {
  __typename?: 'DiscogsSearch';
  id: Scalars['ID'];
  masters?: Maybe<SearchDiscogsMaster>;
};


export type DiscogsSearchMastersArgs = {
  filter?: InputMaybe<Scalars['SearchDiscogsFilter']>;
  search?: InputMaybe<Scalars['String']>;
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
};

export type ReleaseRelation = {
  __typename?: 'ReleaseRelation';
  discogs?: Maybe<DiscogsRelation>;
};

export type Search = {
  __typename?: 'Search';
  discogs?: Maybe<DiscogsSearch>;
};

export type SearchDiscogsMaster = {
  __typename?: 'SearchDiscogsMaster';
  pagination?: Maybe<DiscogsSearchPagination>;
  results?: Maybe<Array<Maybe<DiscogsSearchResultMaster>>>;
};
