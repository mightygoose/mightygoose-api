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
  RelationInfo: any;
  SearchAlbumFilter: any;
  SearchMasterFilter: any;
  SearchReleaseFilter: any;
};

export type AlbumRelation = {
  __typename?: 'AlbumRelation';
  info?: Maybe<Scalars['RelationInfo']>;
};

export type MasterRelation = {
  __typename?: 'MasterRelation';
  info?: Maybe<Scalars['RelationInfo']>;
};

export type ReleaseRelation = {
  __typename?: 'ReleaseRelation';
  info?: Maybe<Scalars['RelationInfo']>;
};

export type Search = {
  __typename?: 'Search';
  albums?: Maybe<SearchAlbums>;
  masters?: Maybe<SearchMasters>;
  releases?: Maybe<SearchReleases>;
};


export type SearchAlbumsArgs = {
  filter?: InputMaybe<Scalars['SearchAlbumFilter']>;
  search?: InputMaybe<Scalars['String']>;
};


export type SearchMastersArgs = {
  filter?: InputMaybe<Scalars['SearchMasterFilter']>;
  search?: InputMaybe<Scalars['String']>;
};


export type SearchReleasesArgs = {
  filter?: InputMaybe<Scalars['SearchReleaseFilter']>;
  search?: InputMaybe<Scalars['String']>;
};

export type SearchAlbums = {
  __typename?: 'SearchAlbums';
  _searchInfo?: Maybe<SearchInfo>;
};

export type SearchInfo = {
  __typename?: 'SearchInfo';
  filter?: Maybe<Scalars['SearchAlbumFilter']>;
  search?: Maybe<Scalars['String']>;
};

export type SearchMasters = {
  __typename?: 'SearchMasters';
  _searchInfo?: Maybe<SearchInfo>;
};

export type SearchReleases = {
  __typename?: 'SearchReleases';
  _searchInfo?: Maybe<SearchInfo>;
};
