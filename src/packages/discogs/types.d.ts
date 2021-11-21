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
  AvailableFilters: any;
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
  getVersions: GetDiscogsMasterVersions;
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


export type DiscogsMasterGetVersionsArgs = {
  filter?: InputMaybe<DiscogsMasterVersionsFilterInput>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};

export type DiscogsMasterVersion = {
  __typename?: 'DiscogsMasterVersion';
  catno: Scalars['String'];
  country: Scalars['String'];
  format: Scalars['String'];
  id: Scalars['Int'];
  label: Scalars['String'];
  major_formats: Array<Scalars['String']>;
  released: Scalars['String'];
  resource_url: Scalars['String'];
  stats: DiscogsMasterVersionStats;
  status: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
};

export type DiscogsMasterVersionStats = {
  __typename?: 'DiscogsMasterVersionStats';
  community: DiscogsMasterVersionStatsCommunity;
};

export type DiscogsMasterVersionStatsCommunity = {
  __typename?: 'DiscogsMasterVersionStatsCommunity';
  in_collection: Scalars['Boolean'];
  in_wantlist: Scalars['Boolean'];
};

export type DiscogsMasterVersionsFilterFacets = {
  __typename?: 'DiscogsMasterVersionsFilterFacets';
  allows_multiple_values: Scalars['Boolean'];
  id: Scalars['String'];
  title: Scalars['String'];
  values: Array<DiscogsVersionsFilterFacetsValues>;
};

export type DiscogsMasterVersionsFilterInput = {
  /**
   * The country to filter
   *
   * Example: Belgium
   */
  country?: InputMaybe<Scalars['String']>;
  /**
   * The format to filter
   *
   * Example: Vinyl
   */
  format?: InputMaybe<Scalars['String']>;
  /**
   * The format to filter
   *
   * Example: Scorpio Music
   */
  label?: InputMaybe<Scalars['String']>;
  /**
   * The release year to filter
   *
   * Example: 1992
   */
  released?: InputMaybe<Scalars['String']>;
  /**
   * Sort items by this field
   *
   * Example: released
   */
  sort?: InputMaybe<DiscogsMasterVersionsFilterSort>;
  /**
   * Sort items in a particular order
   *
   * Example: asc
   */
  sort_order?: InputMaybe<DiscogsMasterVersionsFilterSortOrder>;
};

export enum DiscogsMasterVersionsFilterSort {
  Catno = 'catno',
  Country = 'country',
  Format = 'format',
  Label = 'label',
  Released = 'released',
  Title = 'title'
}

export enum DiscogsMasterVersionsFilterSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type DiscogsMasterVersionsFilters = {
  __typename?: 'DiscogsMasterVersionsFilters';
  available: Scalars['AvailableFilters'];
};

/** discogs pagination parameters */
export type DiscogsPaginationParameters = {
  /**
   * The page you want to request
   *
   * Example: 3
   */
  page?: Scalars['Int'];
  /**
   * The number of items per page
   *
   * Example: 5
   */
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
  getVersions: GetDiscogsMasterVersions;
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


export type DiscogsSearchResultMasterGetVersionsArgs = {
  filter?: InputMaybe<DiscogsMasterVersionsFilterInput>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
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

export type DiscogsVersionsFilterFacetsValues = {
  __typename?: 'DiscogsVersionsFilterFacetsValues';
  count: Scalars['Int'];
  title: Scalars['String'];
  value: Scalars['String'];
};

export type DiscogsVideo = {
  __typename?: 'DiscogsVideo';
  description: Scalars['String'];
  duration: Scalars['Int'];
  embed: Scalars['Boolean'];
  title: Scalars['String'];
  uri: Scalars['String'];
};

export type GetDiscogsMasterVersions = {
  __typename?: 'GetDiscogsMasterVersions';
  filter_facets: Array<Maybe<DiscogsMasterVersionsFilterFacets>>;
  filters: DiscogsMasterVersionsFilters;
  pagination: DiscogsSearchPagination;
  versions: Array<Maybe<DiscogsMasterVersion>>;
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
  /**
   * Search artist ANV (Artist Name Variation)
   *
   * Example: nirvana
   */
  anv?: InputMaybe<Scalars['String']>;
  /**
   * Search artist names
   *
   * Example: nirvana
   */
  artist?: InputMaybe<Scalars['String']>;
  /**
   * Search barcodes
   *
   * Example: 7 2064-24425-2 4
   */
  barcode?: InputMaybe<Scalars['String']>;
  /**
   * Search catalog number
   *
   * Example: DGCD-24425
   */
  catno?: InputMaybe<Scalars['String']>;
  /**
   * Search contributor usernames
   *
   * Example: jerome99
   */
  contributor?: InputMaybe<Scalars['String']>;
  /**
   * Search release country
   *
   * Example: canada
   */
  country?: InputMaybe<Scalars['String']>;
  /**
   * Search release credits
   *
   * Example: kurt
   */
  credit?: InputMaybe<Scalars['String']>;
  /**
   * Search formats
   *
   * Example: album
   */
  format?: InputMaybe<Scalars['String']>;
  /**
   * Search genres
   *
   * Example: rock
   */
  genre?: InputMaybe<Scalars['String']>;
  /**
   * Search label names
   *
   * Example: dgc
   */
  label?: InputMaybe<Scalars['String']>;
  /**
   * Your search query
   *
   * Example: nirvana
   */
  query?: InputMaybe<Scalars['String']>;
  /**
   * Search release titles
   *
   * Example: nevermind
   */
  release_title?: InputMaybe<Scalars['String']>;
  /**
   * Search styles
   *
   * Example: grunge
   */
  style?: InputMaybe<Scalars['String']>;
  /**
   * Search submitter username
   *
   * Example: milKt
   */
  submitter?: InputMaybe<Scalars['String']>;
  /** Example: nirvana - nevermind */
  title?: InputMaybe<Scalars['String']>;
  /**
   * Search track titles
   *
   * Example: smells like teen spirit
   */
  track?: InputMaybe<Scalars['String']>;
  /**
   * Search release year
   *
   * Example: 1991
   */
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
