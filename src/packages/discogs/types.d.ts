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
};

export type DiscogsArtistShort = {
  __typename?: 'DiscogsArtistShort';
  anv: Scalars['String'];
  id: Scalars['ID'];
  join: Scalars['String'];
  name: Scalars['String'];
  resource_url: Scalars['String'];
  role: Scalars['String'];
  thumbnail_url: Scalars['String'];
  tracks: Scalars['String'];
};

export type DiscogsCommunity = {
  __typename?: 'DiscogsCommunity';
  have: Scalars['Int'];
  want: Scalars['Int'];
};

export type DiscogsImageShort = {
  __typename?: 'DiscogsImageShort';
  height: Scalars['Int'];
  resource_url: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  uri150: Scalars['String'];
  width: Scalars['Int'];
};

export type DiscogsLookup = {
  __typename?: 'DiscogsLookup';
  id: Scalars['ID'];
  masters?: Maybe<DiscogsMaster>;
  releases?: Maybe<DiscogsRelease>;
};


export type DiscogsLookupMastersArgs = {
  id: Scalars['Int'];
};


export type DiscogsLookupReleasesArgs = {
  id: Scalars['Int'];
};

export type DiscogsMaster = {
  __typename?: 'DiscogsMaster';
  artists: Array<Maybe<DiscogsArtistShort>>;
  data_quality: Scalars['String'];
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Maybe<DiscogsImageShort>>;
  lowest_price: Scalars['Float'];
  main_release: Scalars['Int'];
  main_release_url: Scalars['String'];
  most_recent_release: Scalars['Int'];
  most_recent_release_url: Scalars['String'];
  notes: Scalars['String'];
  num_for_sale: Scalars['Int'];
  relation: Relation;
  resource_url: Scalars['String'];
  styles: Array<Scalars['String']>;
  title: Scalars['String'];
  tracklist: Array<Maybe<DiscogsTrackShort>>;
  uri: Scalars['String'];
  versions_url: Scalars['String'];
  videos: Array<Maybe<DiscogsVideo>>;
  year: Scalars['Int'];
};

/** discogs pagination parameters */
export type DiscogsPaginationParameters = {
  page?: Scalars['Int'];
  per_page?: Scalars['Int'];
};

export type DiscogsRelation = {
  __typename?: 'DiscogsRelation';
  id: Scalars['ID'];
  masters: SearchDiscogsMaster;
  releases: SearchDiscogsRelease;
};


export type DiscogsRelationMastersArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};


export type DiscogsRelationReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};

export type DiscogsRelease = {
  __typename?: 'DiscogsRelease';
  artists: Array<Maybe<DiscogsArtistShort>>;
  artists_sort: Scalars['String'];
  blocked_from_sale: Scalars['Boolean'];
  community: DiscogsReleaseCommunity;
  companies: Array<DiscogsReleaseLabel>;
  country: Scalars['String'];
  data_quality: Scalars['String'];
  date_added: Scalars['String'];
  date_changed: Scalars['String'];
  estimated_weight: Scalars['Int'];
  extraartists: Array<DiscogsArtistShort>;
  format_quantity: Scalars['Int'];
  formats?: Maybe<Array<DiscogsReleaseFormat>>;
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  identifiers: Array<DiscogsReleaseIdentifier>;
  images: Array<Maybe<DiscogsImageShort>>;
  labels: Array<DiscogsReleaseLabel>;
  lowest_price?: Maybe<Scalars['Float']>;
  master: DiscogsMaster;
  master_id: Scalars['Int'];
  master_url: Scalars['String'];
  notes: Scalars['String'];
  num_for_sale: Scalars['Int'];
  relation: Relation;
  released: Scalars['String'];
  released_formatted: Scalars['String'];
  resource_url: Scalars['String'];
  series: Array<DiscogsReleaseLabel>;
  status: Scalars['String'];
  styles: Array<Scalars['String']>;
  thumb: Scalars['String'];
  title: Scalars['String'];
  tracklist: Array<Maybe<DiscogsTrackShort>>;
  uri: Scalars['String'];
  videos: Array<DiscogsVideo>;
  year: Scalars['Int'];
};

export type DiscogsReleaseCommunity = {
  __typename?: 'DiscogsReleaseCommunity';
  contributors: Array<DiscogsReleaseCommunityUser>;
  data_quality: Scalars['String'];
  have: Scalars['Int'];
  rating: DiscogsReleaseCommunityRating;
  status: Scalars['String'];
  submitter: DiscogsReleaseCommunityUser;
  want: Scalars['Int'];
};

export type DiscogsReleaseCommunityRating = {
  __typename?: 'DiscogsReleaseCommunityRating';
  average: Scalars['Float'];
  count: Scalars['Int'];
};

export type DiscogsReleaseCommunityUser = {
  __typename?: 'DiscogsReleaseCommunityUser';
  average: Scalars['Float'];
  count: Scalars['Int'];
};

export type DiscogsReleaseFormat = {
  __typename?: 'DiscogsReleaseFormat';
  descriptions: Array<Scalars['String']>;
  name: Scalars['String'];
  qty: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type DiscogsReleaseIdentifier = {
  __typename?: 'DiscogsReleaseIdentifier';
  average: Scalars['Float'];
  count: Scalars['Int'];
};

export type DiscogsReleaseLabel = {
  __typename?: 'DiscogsReleaseLabel';
  catno: Scalars['String'];
  entity_type: Scalars['String'];
  entity_type_name: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  resource_url: Scalars['String'];
  thumbnail_url: Scalars['String'];
};

export type DiscogsSearch = {
  __typename?: 'DiscogsSearch';
  id: Scalars['ID'];
  masters: SearchDiscogsMaster;
  releases: SearchDiscogsRelease;
};


export type DiscogsSearchMastersArgs = {
  filter?: InputMaybe<SearchDiscogsFilter>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  search?: InputMaybe<Scalars['String']>;
};


export type DiscogsSearchReleasesArgs = {
  filter?: InputMaybe<SearchDiscogsFilter>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  search?: InputMaybe<Scalars['String']>;
};

export type DiscogsSearchPagination = {
  __typename?: 'DiscogsSearchPagination';
  items: Scalars['Int'];
  page: Scalars['Int'];
  pages: Scalars['Int'];
  per_page: Scalars['Int'];
  urls: DiscogsSearchPaginationUrls;
};

export type DiscogsSearchPaginationUrls = {
  __typename?: 'DiscogsSearchPaginationUrls';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
  prev?: Maybe<Scalars['String']>;
};

export type DiscogsSearchResultMaster = {
  __typename?: 'DiscogsSearchResultMaster';
  barcode: Array<Maybe<Scalars['String']>>;
  catno: Scalars['String'];
  community: DiscogsCommunity;
  country: Scalars['String'];
  cover_image: Scalars['String'];
  format: Array<Scalars['String']>;
  genre: Array<Scalars['String']>;
  id: Scalars['ID'];
  label: Array<Scalars['String']>;
  master: DiscogsMaster;
  master_id: Scalars['Int'];
  master_url: Scalars['String'];
  relation: Relation;
  resource_url: Scalars['String'];
  style: Array<Scalars['String']>;
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  year: Scalars['String'];
};

export type DiscogsSearchResultRelease = {
  __typename?: 'DiscogsSearchResultRelease';
  barcode: Array<Maybe<Scalars['String']>>;
  catno: Scalars['String'];
  community: DiscogsCommunity;
  country: Scalars['String'];
  cover_image: Scalars['String'];
  format: Array<Scalars['String']>;
  format_quantity: Scalars['Int'];
  formats?: Maybe<Array<DiscogsReleaseFormat>>;
  genre: Array<Scalars['String']>;
  id: Scalars['ID'];
  label: Array<Scalars['String']>;
  master: DiscogsMaster;
  master_id: Scalars['Int'];
  master_url: Scalars['String'];
  relation: Relation;
  release: DiscogsRelease;
  resource_url: Scalars['String'];
  style: Array<Scalars['String']>;
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  year: Scalars['String'];
};

export type DiscogsTrackShort = {
  __typename?: 'DiscogsTrackShort';
  duration: Scalars['String'];
  position: Scalars['String'];
  title: Scalars['String'];
  type_: Scalars['String'];
};

export type DiscogsUserData = {
  __typename?: 'DiscogsUserData';
  in_collection?: Maybe<Scalars['Boolean']>;
  in_wantlist?: Maybe<Scalars['Boolean']>;
};

export type DiscogsVideo = {
  __typename?: 'DiscogsVideo';
  description: Scalars['String'];
  duration: Scalars['Int'];
  embed: Scalars['Boolean'];
  title: Scalars['String'];
  uri: Scalars['String'];
};

export type Lookup = {
  __typename?: 'Lookup';
  discogs: DiscogsLookup;
};

export type Relation = {
  __typename?: 'Relation';
  discogs: DiscogsRelation;
};

export type Search = {
  __typename?: 'Search';
  discogs: DiscogsSearch;
};

/** discogs general search parameters */
export type SearchDiscogsFilter = {
  /** Example: nirvana */
  anv?: InputMaybe<Scalars['String']>;
  /** Example: nirvana */
  artist?: InputMaybe<Scalars['String']>;
  /** Example: 7 2064-24425-2 4 */
  barcode?: InputMaybe<Scalars['String']>;
  /** Example: DGCD-24425 */
  catno?: InputMaybe<Scalars['String']>;
  /** Example: jerome99 */
  contributor?: InputMaybe<Scalars['String']>;
  /** Example: canada */
  country?: InputMaybe<Scalars['String']>;
  /** Example: kurt */
  credit?: InputMaybe<Scalars['String']>;
  /** Example: album */
  format?: InputMaybe<Scalars['String']>;
  /** Example: rock */
  genre?: InputMaybe<Scalars['String']>;
  /** Example: dgc */
  label?: InputMaybe<Scalars['String']>;
  /** Example: nirvana */
  query?: InputMaybe<Scalars['String']>;
  /** Example: nevermind */
  release_title?: InputMaybe<Scalars['String']>;
  /** Example: grunge */
  style?: InputMaybe<Scalars['String']>;
  /** Example: milKt */
  submitter?: InputMaybe<Scalars['String']>;
  /** Example: nirvana - nevermind */
  title?: InputMaybe<Scalars['String']>;
  /** Example: smells like teen spirit */
  track?: InputMaybe<Scalars['String']>;
  /** Example: 1991 */
  year?: InputMaybe<Scalars['Int']>;
};

export type SearchDiscogsMaster = {
  __typename?: 'SearchDiscogsMaster';
  pagination: DiscogsSearchPagination;
  results: Array<DiscogsSearchResultMaster>;
};

export type SearchDiscogsRelease = {
  __typename?: 'SearchDiscogsRelease';
  pagination: DiscogsSearchPagination;
  results: Array<DiscogsSearchResultRelease>;
};

export enum Services {
  Discogs = 'Discogs'
}
