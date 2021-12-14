import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
  AvailableFilters: any;
};

/** The Artist resource represents a person in the Discogs database who contributed to a Release in some capacity */
export type DiscogsArtist = {
  __typename?: 'DiscogsArtist';
  data_quality: Scalars['String'];
  getReleases: DiscogsArtistReleases;
  id: Scalars['ID'];
  images: Array<DiscogsImageShort>;
  members: Array<DiscogsArtistMembers>;
  name: Scalars['String'];
  namevariations: Array<Scalars['String']>;
  profile: Scalars['String'];
  relation: Relation;
  releases_url: Scalars['String'];
  resource_url: Scalars['String'];
  uri: Scalars['String'];
  urls: Array<Scalars['String']>;
};


/** The Artist resource represents a person in the Discogs database who contributed to a Release in some capacity */
export type DiscogsArtistGetReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  sort?: InputMaybe<DiscogsArtistGetReleasesSort>;
};

export type DiscogsArtistGetReleasesSort = {
  sort?: InputMaybe<DiscogsArtistRelesesSort>;
  sort_order?: InputMaybe<DiscogsMasterVersionsFilterSortOrder>;
};

export type DiscogsArtistMaster = DiscogsArtistReleaseResult & {
  __typename?: 'DiscogsArtistMaster';
  artist: Scalars['String'];
  id: Scalars['ID'];
  main_release: Scalars['Int'];
  master: DiscogsMaster;
  relation: Relation;
  release: DiscogsRelease;
  resource_url: Scalars['String'];
  role: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: DiscogsArtistReleaseResultTypes;
  year: Scalars['Int'];
};


export type DiscogsArtistMasterReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
};

export type DiscogsArtistMembers = {
  __typename?: 'DiscogsArtistMembers';
  active?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  resource_url?: Maybe<Scalars['String']>;
  thumbnail_url?: Maybe<Scalars['String']>;
};

export type DiscogsArtistRelease = DiscogsArtistReleaseResult & {
  __typename?: 'DiscogsArtistRelease';
  artist: Scalars['String'];
  format: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
  relation: Relation;
  release: DiscogsRelease;
  resource_url: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: DiscogsArtistReleaseResultTypes;
  year: Scalars['Int'];
};


export type DiscogsArtistReleaseReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
};

export type DiscogsArtistReleaseResult = {
  artist: Scalars['String'];
  id: Scalars['ID'];
  relation: Relation;
  resource_url: Scalars['String'];
  role: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: DiscogsArtistReleaseResultTypes;
  year: Scalars['Int'];
};

export enum DiscogsArtistReleaseResultTypes {
  Master = 'master',
  Release = 'release'
}

export type DiscogsArtistReleases = {
  __typename?: 'DiscogsArtistReleases';
  pagination: DiscogsSearchPagination;
  releases: Array<DiscogsArtistReleaseResult>;
};

export enum DiscogsArtistRelesesSort {
  Format = 'format',
  /** (i.e. title of the release) */
  Title = 'title',
  /** (i.e. year of the release) */
  Year = 'year'
}

export type DiscogsArtistShort = {
  __typename?: 'DiscogsArtistShort';
  anv: Scalars['String'];
  artist: DiscogsArtist;
  getReleases: DiscogsArtistReleases;
  id: Scalars['ID'];
  join: Scalars['String'];
  name: Scalars['String'];
  relation: Relation;
  resource_url: Scalars['String'];
  role: Scalars['String'];
  thumbnail_url: Scalars['String'];
  tracks: Scalars['String'];
};


export type DiscogsArtistShortGetReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  sort?: InputMaybe<DiscogsArtistGetReleasesSort>;
};

export type DiscogsCommunity = {
  __typename?: 'DiscogsCommunity';
  have: Scalars['Int'];
  want: Scalars['Int'];
};

export enum DiscogsCurrencies {
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Mxn = 'MXN',
  Nzd = 'NZD',
  Sek = 'SEK',
  Usd = 'USD',
  Zar = 'ZAR'
}

export type DiscogsImageShort = {
  __typename?: 'DiscogsImageShort';
  height: Scalars['Int'];
  resource_url: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  uri150: Scalars['String'];
  width: Scalars['Int'];
};

export type DiscogsLabel = {
  __typename?: 'DiscogsLabel';
  contact_info: Scalars['String'];
  data_quality: Scalars['String'];
  getReleases: DiscogsLabelReleases;
  id: Scalars['ID'];
  images: Array<Maybe<DiscogsImageShort>>;
  name: Scalars['String'];
  profile: Scalars['String'];
  releases_url: Scalars['String'];
  resource_url: Scalars['String'];
  uri: Scalars['String'];
  urls: Array<Scalars['String']>;
};


export type DiscogsLabelGetReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  sort?: InputMaybe<DiscogsLabelGetReleasesSort>;
};

export type DiscogsLabelGetReleasesSort = {
  sort?: InputMaybe<DiscogsLabelRelesesSort>;
  sort_order?: InputMaybe<DiscogsSortOrder>;
};

export type DiscogsLabelReleaseResult = {
  __typename?: 'DiscogsLabelReleaseResult';
  artist: Scalars['String'];
  catno: Scalars['String'];
  format: Scalars['String'];
  id: Scalars['ID'];
  release: DiscogsRelease;
  resource_url: Scalars['String'];
  status: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['Int'];
};


export type DiscogsLabelReleaseResultReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
};

export type DiscogsLabelReleases = {
  __typename?: 'DiscogsLabelReleases';
  pagination: DiscogsSearchPagination;
  releases: Array<DiscogsLabelReleaseResult>;
};

export enum DiscogsLabelRelesesSort {
  Format = 'format',
  /** (i.e. title of the release) */
  Title = 'title',
  /** (i.e. year of the release) */
  Year = 'year'
}

export type DiscogsLookup = {
  __typename?: 'DiscogsLookup';
  /** Get an artist */
  artist?: Maybe<DiscogsArtist>;
  id: Scalars['ID'];
  /** Get a label */
  label?: Maybe<DiscogsLabel>;
  master?: Maybe<DiscogsMaster>;
  release?: Maybe<DiscogsRelease>;
};


export type DiscogsLookupArtistArgs = {
  id: Scalars['Int'];
};


export type DiscogsLookupLabelArgs = {
  id: Scalars['Int'];
};


export type DiscogsLookupMasterArgs = {
  id: Scalars['Int'];
};


export type DiscogsLookupReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
  id: Scalars['Int'];
};

/** The Master resource represents a set of similar Releases. Masters (also known as “master releases”) have a “main release” which is often the chronologically earliest */
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
  release: DiscogsRelease;
  resource_url: Scalars['String'];
  styles: Array<Scalars['String']>;
  title: Scalars['String'];
  tracklist: Array<Maybe<DiscogsTrackShort>>;
  uri: Scalars['String'];
  versions_url: Scalars['String'];
  videos: Array<Maybe<DiscogsVideo>>;
  year: Scalars['Int'];
};


/** The Master resource represents a set of similar Releases. Masters (also known as “master releases”) have a “main release” which is often the chronologically earliest */
export type DiscogsMasterGetVersionsArgs = {
  filter?: InputMaybe<DiscogsMasterVersionsFilterInput>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};


/** The Master resource represents a set of similar Releases. Masters (also known as “master releases”) have a “main release” which is often the chronologically earliest */
export type DiscogsMasterReleaseArgs = {
  type?: DiscogsMasterReleaseType;
};

export enum DiscogsMasterReleaseType {
  Main = 'main',
  MostRecent = 'most_recent'
}

/** Retrieves a list of all Releases that are versions of this master */
export type DiscogsMasterVersion = {
  __typename?: 'DiscogsMasterVersion';
  catno: Scalars['String'];
  country: Scalars['String'];
  format: Scalars['String'];
  id: Scalars['Int'];
  label: Scalars['String'];
  major_formats: Array<Scalars['String']>;
  rating: DiscogsReleaseRatingWrapper;
  relation: Relation;
  release: DiscogsRelease;
  released: Scalars['String'];
  resource_url: Scalars['String'];
  stats: DiscogsMasterVersionStats;
  status: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
};


/** Retrieves a list of all Releases that are versions of this master */
export type DiscogsMasterVersionReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
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
  artists?: Maybe<SearchDiscogsArtist>;
  id: Scalars['ID'];
  masters: SearchDiscogsMaster;
  releases: SearchDiscogsRelease;
};


export type DiscogsRelationArtistsArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};


export type DiscogsRelationMastersArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};


export type DiscogsRelationReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
};

/** The Release resource represents a particular physical or digital object released by one or more Artists. */
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
  /** The Community Release Rating endpoint retrieves the average rating and the total number of user ratings for a given release */
  rating: DiscogsReleaseRatingWrapper;
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

/** Retrieves the community release rating average and count */
export type DiscogsReleaseRating = {
  __typename?: 'DiscogsReleaseRating';
  average: Scalars['Float'];
  count: Scalars['Int'];
};

export type DiscogsReleaseRatingWrapper = {
  __typename?: 'DiscogsReleaseRatingWrapper';
  rating: DiscogsReleaseRating;
  release_id: Scalars['Int'];
};

export type DiscogsSearch = {
  __typename?: 'DiscogsSearch';
  artists: SearchDiscogsArtist;
  id: Scalars['ID'];
  labels: SearchDiscogsLabel;
  masters: SearchDiscogsMaster;
  releases: SearchDiscogsRelease;
};


export type DiscogsSearchArtistsArgs = {
  filter?: InputMaybe<SearchDiscogsFilter>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  search?: InputMaybe<Scalars['String']>;
};


export type DiscogsSearchLabelsArgs = {
  filter?: InputMaybe<SearchDiscogsFilter>;
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  search?: InputMaybe<Scalars['String']>;
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

export type DiscogsSearchResultArtist = {
  __typename?: 'DiscogsSearchResultArtist';
  cover_image: Scalars['String'];
  getReleases: DiscogsArtistReleases;
  id: Scalars['ID'];
  relation: Relation;
  resource_url: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  user_data: DiscogsMasterVersionStatsCommunity;
};


export type DiscogsSearchResultArtistGetReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  sort?: InputMaybe<DiscogsArtistGetReleasesSort>;
};

export type DiscogsSearchResultLabel = {
  __typename?: 'DiscogsSearchResultLabel';
  cover_image: Scalars['String'];
  getReleases: DiscogsLabelReleases;
  id: Scalars['ID'];
  master_id?: Maybe<Scalars['Int']>;
  master_url?: Maybe<Scalars['String']>;
  resource_url: Scalars['String'];
  thumb: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  user_data: DiscogsUserData;
};


export type DiscogsSearchResultLabelGetReleasesArgs = {
  pagination?: InputMaybe<DiscogsPaginationParameters>;
  sort?: InputMaybe<DiscogsLabelGetReleasesSort>;
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
  rating: DiscogsReleaseRatingWrapper;
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


export type DiscogsSearchResultReleaseReleaseArgs = {
  curr_abbr?: InputMaybe<DiscogsCurrencies>;
};

export enum DiscogsSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type DiscogsTrackShort = {
  __typename?: 'DiscogsTrackShort';
  duration: Scalars['String'];
  position: Scalars['String'];
  title: Scalars['String'];
  type_: Scalars['String'];
};

export type DiscogsUserData = {
  __typename?: 'DiscogsUserData';
  in_collection: Scalars['Boolean'];
  in_wantlist: Scalars['Boolean'];
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
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  lookup: Lookup;
  search: Search;
};

export type Relation = {
  __typename?: 'Relation';
  _relationData: RelationData;
  discogs?: Maybe<DiscogsRelation>;
};

export type RelationData = {
  __typename?: 'RelationData';
  album?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Scalars['String']>>;
  country?: Maybe<Scalars['String']>;
  genre?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type Search = {
  __typename?: 'Search';
  discogs: DiscogsSearch;
  id: Scalars['ID'];
};

export type SearchDiscogsArtist = {
  __typename?: 'SearchDiscogsArtist';
  pagination: DiscogsSearchPagination;
  results: Array<DiscogsSearchResultArtist>;
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

export type SearchDiscogsLabel = {
  __typename?: 'SearchDiscogsLabel';
  pagination: DiscogsSearchPagination;
  results: Array<DiscogsSearchResultLabel>;
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
  Base = 'BASE',
  Discogs = 'Discogs'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AvailableFilters: ResolverTypeWrapper<Scalars['AvailableFilters']>;
  DiscogsArtist: ResolverTypeWrapper<DiscogsArtist>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DiscogsArtistGetReleasesSort: DiscogsArtistGetReleasesSort;
  DiscogsArtistMaster: ResolverTypeWrapper<DiscogsArtistMaster>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  DiscogsArtistMembers: ResolverTypeWrapper<DiscogsArtistMembers>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DiscogsArtistRelease: ResolverTypeWrapper<DiscogsArtistRelease>;
  DiscogsArtistReleaseResult: ResolversTypes['DiscogsArtistMaster'] | ResolversTypes['DiscogsArtistRelease'];
  DiscogsArtistReleaseResultTypes: DiscogsArtistReleaseResultTypes;
  DiscogsArtistReleases: ResolverTypeWrapper<DiscogsArtistReleases>;
  DiscogsArtistRelesesSort: DiscogsArtistRelesesSort;
  DiscogsArtistShort: ResolverTypeWrapper<DiscogsArtistShort>;
  DiscogsCommunity: ResolverTypeWrapper<DiscogsCommunity>;
  DiscogsCurrencies: DiscogsCurrencies;
  DiscogsImageShort: ResolverTypeWrapper<DiscogsImageShort>;
  DiscogsLabel: ResolverTypeWrapper<DiscogsLabel>;
  DiscogsLabelGetReleasesSort: DiscogsLabelGetReleasesSort;
  DiscogsLabelReleaseResult: ResolverTypeWrapper<DiscogsLabelReleaseResult>;
  DiscogsLabelReleases: ResolverTypeWrapper<DiscogsLabelReleases>;
  DiscogsLabelRelesesSort: DiscogsLabelRelesesSort;
  DiscogsLookup: ResolverTypeWrapper<DiscogsLookup>;
  DiscogsMaster: ResolverTypeWrapper<DiscogsMaster>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  DiscogsMasterReleaseType: DiscogsMasterReleaseType;
  DiscogsMasterVersion: ResolverTypeWrapper<DiscogsMasterVersion>;
  DiscogsMasterVersionStats: ResolverTypeWrapper<DiscogsMasterVersionStats>;
  DiscogsMasterVersionStatsCommunity: ResolverTypeWrapper<DiscogsMasterVersionStatsCommunity>;
  DiscogsMasterVersionsFilterFacets: ResolverTypeWrapper<DiscogsMasterVersionsFilterFacets>;
  DiscogsMasterVersionsFilterInput: DiscogsMasterVersionsFilterInput;
  DiscogsMasterVersionsFilterSort: DiscogsMasterVersionsFilterSort;
  DiscogsMasterVersionsFilterSortOrder: DiscogsMasterVersionsFilterSortOrder;
  DiscogsMasterVersionsFilters: ResolverTypeWrapper<DiscogsMasterVersionsFilters>;
  DiscogsPaginationParameters: DiscogsPaginationParameters;
  DiscogsRelation: ResolverTypeWrapper<DiscogsRelation>;
  DiscogsRelease: ResolverTypeWrapper<DiscogsRelease>;
  DiscogsReleaseCommunity: ResolverTypeWrapper<DiscogsReleaseCommunity>;
  DiscogsReleaseCommunityRating: ResolverTypeWrapper<DiscogsReleaseCommunityRating>;
  DiscogsReleaseCommunityUser: ResolverTypeWrapper<DiscogsReleaseCommunityUser>;
  DiscogsReleaseFormat: ResolverTypeWrapper<DiscogsReleaseFormat>;
  DiscogsReleaseIdentifier: ResolverTypeWrapper<DiscogsReleaseIdentifier>;
  DiscogsReleaseLabel: ResolverTypeWrapper<DiscogsReleaseLabel>;
  DiscogsReleaseRating: ResolverTypeWrapper<DiscogsReleaseRating>;
  DiscogsReleaseRatingWrapper: ResolverTypeWrapper<DiscogsReleaseRatingWrapper>;
  DiscogsSearch: ResolverTypeWrapper<DiscogsSearch>;
  DiscogsSearchPagination: ResolverTypeWrapper<DiscogsSearchPagination>;
  DiscogsSearchPaginationUrls: ResolverTypeWrapper<DiscogsSearchPaginationUrls>;
  DiscogsSearchResultArtist: ResolverTypeWrapper<DiscogsSearchResultArtist>;
  DiscogsSearchResultLabel: ResolverTypeWrapper<DiscogsSearchResultLabel>;
  DiscogsSearchResultMaster: ResolverTypeWrapper<DiscogsSearchResultMaster>;
  DiscogsSearchResultRelease: ResolverTypeWrapper<DiscogsSearchResultRelease>;
  DiscogsSortOrder: DiscogsSortOrder;
  DiscogsTrackShort: ResolverTypeWrapper<DiscogsTrackShort>;
  DiscogsUserData: ResolverTypeWrapper<DiscogsUserData>;
  DiscogsVersionsFilterFacetsValues: ResolverTypeWrapper<DiscogsVersionsFilterFacetsValues>;
  DiscogsVideo: ResolverTypeWrapper<DiscogsVideo>;
  GetDiscogsMasterVersions: ResolverTypeWrapper<GetDiscogsMasterVersions>;
  Lookup: ResolverTypeWrapper<Lookup>;
  Query: ResolverTypeWrapper<{}>;
  Relation: ResolverTypeWrapper<Relation>;
  RelationData: ResolverTypeWrapper<RelationData>;
  Search: ResolverTypeWrapper<Search>;
  SearchDiscogsArtist: ResolverTypeWrapper<SearchDiscogsArtist>;
  SearchDiscogsFilter: SearchDiscogsFilter;
  SearchDiscogsLabel: ResolverTypeWrapper<SearchDiscogsLabel>;
  SearchDiscogsMaster: ResolverTypeWrapper<SearchDiscogsMaster>;
  SearchDiscogsRelease: ResolverTypeWrapper<SearchDiscogsRelease>;
  Services: Services;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AvailableFilters: Scalars['AvailableFilters'];
  DiscogsArtist: DiscogsArtist;
  String: Scalars['String'];
  ID: Scalars['ID'];
  DiscogsArtistGetReleasesSort: DiscogsArtistGetReleasesSort;
  DiscogsArtistMaster: DiscogsArtistMaster;
  Int: Scalars['Int'];
  DiscogsArtistMembers: DiscogsArtistMembers;
  Boolean: Scalars['Boolean'];
  DiscogsArtistRelease: DiscogsArtistRelease;
  DiscogsArtistReleaseResult: ResolversParentTypes['DiscogsArtistMaster'] | ResolversParentTypes['DiscogsArtistRelease'];
  DiscogsArtistReleases: DiscogsArtistReleases;
  DiscogsArtistShort: DiscogsArtistShort;
  DiscogsCommunity: DiscogsCommunity;
  DiscogsImageShort: DiscogsImageShort;
  DiscogsLabel: DiscogsLabel;
  DiscogsLabelGetReleasesSort: DiscogsLabelGetReleasesSort;
  DiscogsLabelReleaseResult: DiscogsLabelReleaseResult;
  DiscogsLabelReleases: DiscogsLabelReleases;
  DiscogsLookup: DiscogsLookup;
  DiscogsMaster: DiscogsMaster;
  Float: Scalars['Float'];
  DiscogsMasterVersion: DiscogsMasterVersion;
  DiscogsMasterVersionStats: DiscogsMasterVersionStats;
  DiscogsMasterVersionStatsCommunity: DiscogsMasterVersionStatsCommunity;
  DiscogsMasterVersionsFilterFacets: DiscogsMasterVersionsFilterFacets;
  DiscogsMasterVersionsFilterInput: DiscogsMasterVersionsFilterInput;
  DiscogsMasterVersionsFilters: DiscogsMasterVersionsFilters;
  DiscogsPaginationParameters: DiscogsPaginationParameters;
  DiscogsRelation: DiscogsRelation;
  DiscogsRelease: DiscogsRelease;
  DiscogsReleaseCommunity: DiscogsReleaseCommunity;
  DiscogsReleaseCommunityRating: DiscogsReleaseCommunityRating;
  DiscogsReleaseCommunityUser: DiscogsReleaseCommunityUser;
  DiscogsReleaseFormat: DiscogsReleaseFormat;
  DiscogsReleaseIdentifier: DiscogsReleaseIdentifier;
  DiscogsReleaseLabel: DiscogsReleaseLabel;
  DiscogsReleaseRating: DiscogsReleaseRating;
  DiscogsReleaseRatingWrapper: DiscogsReleaseRatingWrapper;
  DiscogsSearch: DiscogsSearch;
  DiscogsSearchPagination: DiscogsSearchPagination;
  DiscogsSearchPaginationUrls: DiscogsSearchPaginationUrls;
  DiscogsSearchResultArtist: DiscogsSearchResultArtist;
  DiscogsSearchResultLabel: DiscogsSearchResultLabel;
  DiscogsSearchResultMaster: DiscogsSearchResultMaster;
  DiscogsSearchResultRelease: DiscogsSearchResultRelease;
  DiscogsTrackShort: DiscogsTrackShort;
  DiscogsUserData: DiscogsUserData;
  DiscogsVersionsFilterFacetsValues: DiscogsVersionsFilterFacetsValues;
  DiscogsVideo: DiscogsVideo;
  GetDiscogsMasterVersions: GetDiscogsMasterVersions;
  Lookup: Lookup;
  Query: {};
  Relation: Relation;
  RelationData: RelationData;
  Search: Search;
  SearchDiscogsArtist: SearchDiscogsArtist;
  SearchDiscogsFilter: SearchDiscogsFilter;
  SearchDiscogsLabel: SearchDiscogsLabel;
  SearchDiscogsMaster: SearchDiscogsMaster;
  SearchDiscogsRelease: SearchDiscogsRelease;
}>;

export interface AvailableFiltersScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AvailableFilters'], any> {
  name: 'AvailableFilters';
}

export type DiscogsArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtist'] = ResolversParentTypes['DiscogsArtist']> = ResolversObject<{
  data_quality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getReleases?: Resolver<ResolversTypes['DiscogsArtistReleases'], ParentType, ContextType, RequireFields<DiscogsArtistGetReleasesArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['DiscogsImageShort']>, ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['DiscogsArtistMembers']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namevariations?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  releases_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urls?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsArtistMasterResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistMaster'] = ResolversParentTypes['DiscogsArtistMaster']> = ResolversObject<{
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  main_release?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  master?: Resolver<ResolversTypes['DiscogsMaster'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsArtistMasterReleaseArgs, never>>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DiscogsArtistReleaseResultTypes'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsArtistMembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistMembers'] = ResolversParentTypes['DiscogsArtistMembers']> = ResolversObject<{
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resource_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsArtistReleaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistRelease'] = ResolversParentTypes['DiscogsArtistRelease']> = ResolversObject<{
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsArtistReleaseReleaseArgs, never>>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DiscogsArtistReleaseResultTypes'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsArtistReleaseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistReleaseResult'] = ResolversParentTypes['DiscogsArtistReleaseResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DiscogsArtistMaster' | 'DiscogsArtistRelease', ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['DiscogsArtistReleaseResultTypes'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type DiscogsArtistReleasesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistReleases'] = ResolversParentTypes['DiscogsArtistReleases']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  releases?: Resolver<Array<ResolversTypes['DiscogsArtistReleaseResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsArtistShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsArtistShort'] = ResolversParentTypes['DiscogsArtistShort']> = ResolversObject<{
  anv?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['DiscogsArtist'], ParentType, ContextType>;
  getReleases?: Resolver<ResolversTypes['DiscogsArtistReleases'], ParentType, ContextType, RequireFields<DiscogsArtistShortGetReleasesArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  join?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsCommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsCommunity'] = ResolversParentTypes['DiscogsCommunity']> = ResolversObject<{
  have?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  want?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsImageShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsImageShort'] = ResolversParentTypes['DiscogsImageShort']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri150?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsLabel'] = ResolversParentTypes['DiscogsLabel']> = ResolversObject<{
  contact_info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data_quality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getReleases?: Resolver<ResolversTypes['DiscogsLabelReleases'], ParentType, ContextType, RequireFields<DiscogsLabelGetReleasesArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['DiscogsImageShort']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releases_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urls?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsLabelReleaseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsLabelReleaseResult'] = ResolversParentTypes['DiscogsLabelReleaseResult']> = ResolversObject<{
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  catno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsLabelReleaseResultReleaseArgs, never>>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsLabelReleasesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsLabelReleases'] = ResolversParentTypes['DiscogsLabelReleases']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  releases?: Resolver<Array<ResolversTypes['DiscogsLabelReleaseResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsLookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsLookup'] = ResolversParentTypes['DiscogsLookup']> = ResolversObject<{
  artist?: Resolver<Maybe<ResolversTypes['DiscogsArtist']>, ParentType, ContextType, RequireFields<DiscogsLookupArtistArgs, 'id'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['DiscogsLabel']>, ParentType, ContextType, RequireFields<DiscogsLookupLabelArgs, 'id'>>;
  master?: Resolver<Maybe<ResolversTypes['DiscogsMaster']>, ParentType, ContextType, RequireFields<DiscogsLookupMasterArgs, 'id'>>;
  release?: Resolver<Maybe<ResolversTypes['DiscogsRelease']>, ParentType, ContextType, RequireFields<DiscogsLookupReleaseArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMaster'] = ResolversParentTypes['DiscogsMaster']> = ResolversObject<{
  artists?: Resolver<Array<Maybe<ResolversTypes['DiscogsArtistShort']>>, ParentType, ContextType>;
  data_quality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  getVersions?: Resolver<ResolversTypes['GetDiscogsMasterVersions'], ParentType, ContextType, RequireFields<DiscogsMasterGetVersionsArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['DiscogsImageShort']>>, ParentType, ContextType>;
  lowest_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  main_release?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  main_release_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  most_recent_release?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  most_recent_release_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  num_for_sale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsMasterReleaseArgs, 'type'>>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  styles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracklist?: Resolver<Array<Maybe<ResolversTypes['DiscogsTrackShort']>>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  versions_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Array<Maybe<ResolversTypes['DiscogsVideo']>>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterVersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMasterVersion'] = ResolversParentTypes['DiscogsMasterVersion']> = ResolversObject<{
  catno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  major_formats?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['DiscogsReleaseRatingWrapper'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsMasterVersionReleaseArgs, never>>;
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['DiscogsMasterVersionStats'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterVersionStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMasterVersionStats'] = ResolversParentTypes['DiscogsMasterVersionStats']> = ResolversObject<{
  community?: Resolver<ResolversTypes['DiscogsMasterVersionStatsCommunity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterVersionStatsCommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMasterVersionStatsCommunity'] = ResolversParentTypes['DiscogsMasterVersionStatsCommunity']> = ResolversObject<{
  in_collection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  in_wantlist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterVersionsFilterFacetsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMasterVersionsFilterFacets'] = ResolversParentTypes['DiscogsMasterVersionsFilterFacets']> = ResolversObject<{
  allows_multiple_values?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['DiscogsVersionsFilterFacetsValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsMasterVersionsFiltersResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsMasterVersionsFilters'] = ResolversParentTypes['DiscogsMasterVersionsFilters']> = ResolversObject<{
  available?: Resolver<ResolversTypes['AvailableFilters'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsRelation'] = ResolversParentTypes['DiscogsRelation']> = ResolversObject<{
  artists?: Resolver<Maybe<ResolversTypes['SearchDiscogsArtist']>, ParentType, ContextType, RequireFields<DiscogsRelationArtistsArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  masters?: Resolver<ResolversTypes['SearchDiscogsMaster'], ParentType, ContextType, RequireFields<DiscogsRelationMastersArgs, 'pagination'>>;
  releases?: Resolver<ResolversTypes['SearchDiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsRelationReleasesArgs, 'pagination'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsRelease'] = ResolversParentTypes['DiscogsRelease']> = ResolversObject<{
  artists?: Resolver<Array<Maybe<ResolversTypes['DiscogsArtistShort']>>, ParentType, ContextType>;
  artists_sort?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blocked_from_sale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['DiscogsReleaseCommunity'], ParentType, ContextType>;
  companies?: Resolver<Array<ResolversTypes['DiscogsReleaseLabel']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data_quality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_added?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_changed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimated_weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  extraartists?: Resolver<Array<ResolversTypes['DiscogsArtistShort']>, ParentType, ContextType>;
  format_quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  formats?: Resolver<Maybe<Array<ResolversTypes['DiscogsReleaseFormat']>>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  identifiers?: Resolver<Array<ResolversTypes['DiscogsReleaseIdentifier']>, ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['DiscogsImageShort']>>, ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['DiscogsReleaseLabel']>, ParentType, ContextType>;
  lowest_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  master?: Resolver<ResolversTypes['DiscogsMaster'], ParentType, ContextType>;
  master_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  master_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  num_for_sale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['DiscogsReleaseRatingWrapper'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  released_formatted?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series?: Resolver<Array<ResolversTypes['DiscogsReleaseLabel']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  styles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tracklist?: Resolver<Array<Maybe<ResolversTypes['DiscogsTrackShort']>>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['DiscogsVideo']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseCommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseCommunity'] = ResolversParentTypes['DiscogsReleaseCommunity']> = ResolversObject<{
  contributors?: Resolver<Array<ResolversTypes['DiscogsReleaseCommunityUser']>, ParentType, ContextType>;
  data_quality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  have?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['DiscogsReleaseCommunityRating'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submitter?: Resolver<ResolversTypes['DiscogsReleaseCommunityUser'], ParentType, ContextType>;
  want?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseCommunityRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseCommunityRating'] = ResolversParentTypes['DiscogsReleaseCommunityRating']> = ResolversObject<{
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseCommunityUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseCommunityUser'] = ResolversParentTypes['DiscogsReleaseCommunityUser']> = ResolversObject<{
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseFormatResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseFormat'] = ResolversParentTypes['DiscogsReleaseFormat']> = ResolversObject<{
  descriptions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseIdentifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseIdentifier'] = ResolversParentTypes['DiscogsReleaseIdentifier']> = ResolversObject<{
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseLabel'] = ResolversParentTypes['DiscogsReleaseLabel']> = ResolversObject<{
  catno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity_type_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseRating'] = ResolversParentTypes['DiscogsReleaseRating']> = ResolversObject<{
  average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsReleaseRatingWrapperResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsReleaseRatingWrapper'] = ResolversParentTypes['DiscogsReleaseRatingWrapper']> = ResolversObject<{
  rating?: Resolver<ResolversTypes['DiscogsReleaseRating'], ParentType, ContextType>;
  release_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearch'] = ResolversParentTypes['DiscogsSearch']> = ResolversObject<{
  artists?: Resolver<ResolversTypes['SearchDiscogsArtist'], ParentType, ContextType, RequireFields<DiscogsSearchArtistsArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  labels?: Resolver<ResolversTypes['SearchDiscogsLabel'], ParentType, ContextType, RequireFields<DiscogsSearchLabelsArgs, 'pagination'>>;
  masters?: Resolver<ResolversTypes['SearchDiscogsMaster'], ParentType, ContextType, RequireFields<DiscogsSearchMastersArgs, 'pagination'>>;
  releases?: Resolver<ResolversTypes['SearchDiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsSearchReleasesArgs, 'pagination'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchPagination'] = ResolversParentTypes['DiscogsSearchPagination']> = ResolversObject<{
  items?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  per_page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  urls?: Resolver<ResolversTypes['DiscogsSearchPaginationUrls'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchPaginationUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchPaginationUrls'] = ResolversParentTypes['DiscogsSearchPaginationUrls']> = ResolversObject<{
  first?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchResultArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchResultArtist'] = ResolversParentTypes['DiscogsSearchResultArtist']> = ResolversObject<{
  cover_image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getReleases?: Resolver<ResolversTypes['DiscogsArtistReleases'], ParentType, ContextType, RequireFields<DiscogsSearchResultArtistGetReleasesArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_data?: Resolver<ResolversTypes['DiscogsMasterVersionStatsCommunity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchResultLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchResultLabel'] = ResolversParentTypes['DiscogsSearchResultLabel']> = ResolversObject<{
  cover_image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getReleases?: Resolver<ResolversTypes['DiscogsLabelReleases'], ParentType, ContextType, RequireFields<DiscogsSearchResultLabelGetReleasesArgs, 'pagination'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  master_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  master_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_data?: Resolver<ResolversTypes['DiscogsUserData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchResultMasterResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchResultMaster'] = ResolversParentTypes['DiscogsSearchResultMaster']> = ResolversObject<{
  barcode?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  catno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['DiscogsCommunity'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cover_image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  getVersions?: Resolver<ResolversTypes['GetDiscogsMasterVersions'], ParentType, ContextType, RequireFields<DiscogsSearchResultMasterGetVersionsArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  master?: Resolver<ResolversTypes['DiscogsMaster'], ParentType, ContextType>;
  master_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  master_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  style?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsSearchResultReleaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsSearchResultRelease'] = ResolversParentTypes['DiscogsSearchResultRelease']> = ResolversObject<{
  barcode?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  catno?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['DiscogsCommunity'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cover_image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  format_quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  formats?: Resolver<Maybe<Array<ResolversTypes['DiscogsReleaseFormat']>>, ParentType, ContextType>;
  genre?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  master?: Resolver<ResolversTypes['DiscogsMaster'], ParentType, ContextType>;
  master_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  master_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['DiscogsReleaseRatingWrapper'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release?: Resolver<ResolversTypes['DiscogsRelease'], ParentType, ContextType, RequireFields<DiscogsSearchResultReleaseReleaseArgs, never>>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  style?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsTrackShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsTrackShort'] = ResolversParentTypes['DiscogsTrackShort']> = ResolversObject<{
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsUserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsUserData'] = ResolversParentTypes['DiscogsUserData']> = ResolversObject<{
  in_collection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  in_wantlist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsVersionsFilterFacetsValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsVersionsFilterFacetsValues'] = ResolversParentTypes['DiscogsVersionsFilterFacetsValues']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DiscogsVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscogsVideo'] = ResolversParentTypes['DiscogsVideo']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  embed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetDiscogsMasterVersionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetDiscogsMasterVersions'] = ResolversParentTypes['GetDiscogsMasterVersions']> = ResolversObject<{
  filter_facets?: Resolver<Array<Maybe<ResolversTypes['DiscogsMasterVersionsFilterFacets']>>, ParentType, ContextType>;
  filters?: Resolver<ResolversTypes['DiscogsMasterVersionsFilters'], ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  versions?: Resolver<Array<Maybe<ResolversTypes['DiscogsMasterVersion']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lookup'] = ResolversParentTypes['Lookup']> = ResolversObject<{
  discogs?: Resolver<ResolversTypes['DiscogsLookup'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  lookup?: Resolver<ResolversTypes['Lookup'], ParentType, ContextType>;
  search?: Resolver<ResolversTypes['Search'], ParentType, ContextType>;
}>;

export type RelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']> = ResolversObject<{
  _relationData?: Resolver<ResolversTypes['RelationData'], ParentType, ContextType>;
  discogs?: Resolver<Maybe<ResolversTypes['DiscogsRelation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RelationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['RelationData'] = ResolversParentTypes['RelationData']> = ResolversObject<{
  album?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = ResolversObject<{
  discogs?: Resolver<ResolversTypes['DiscogsSearch'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchDiscogsArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchDiscogsArtist'] = ResolversParentTypes['SearchDiscogsArtist']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['DiscogsSearchResultArtist']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchDiscogsLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchDiscogsLabel'] = ResolversParentTypes['SearchDiscogsLabel']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['DiscogsSearchResultLabel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchDiscogsMasterResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchDiscogsMaster'] = ResolversParentTypes['SearchDiscogsMaster']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['DiscogsSearchResultMaster']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchDiscogsReleaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchDiscogsRelease'] = ResolversParentTypes['SearchDiscogsRelease']> = ResolversObject<{
  pagination?: Resolver<ResolversTypes['DiscogsSearchPagination'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['DiscogsSearchResultRelease']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AvailableFilters?: GraphQLScalarType;
  DiscogsArtist?: DiscogsArtistResolvers<ContextType>;
  DiscogsArtistMaster?: DiscogsArtistMasterResolvers<ContextType>;
  DiscogsArtistMembers?: DiscogsArtistMembersResolvers<ContextType>;
  DiscogsArtistRelease?: DiscogsArtistReleaseResolvers<ContextType>;
  DiscogsArtistReleaseResult?: DiscogsArtistReleaseResultResolvers<ContextType>;
  DiscogsArtistReleases?: DiscogsArtistReleasesResolvers<ContextType>;
  DiscogsArtistShort?: DiscogsArtistShortResolvers<ContextType>;
  DiscogsCommunity?: DiscogsCommunityResolvers<ContextType>;
  DiscogsImageShort?: DiscogsImageShortResolvers<ContextType>;
  DiscogsLabel?: DiscogsLabelResolvers<ContextType>;
  DiscogsLabelReleaseResult?: DiscogsLabelReleaseResultResolvers<ContextType>;
  DiscogsLabelReleases?: DiscogsLabelReleasesResolvers<ContextType>;
  DiscogsLookup?: DiscogsLookupResolvers<ContextType>;
  DiscogsMaster?: DiscogsMasterResolvers<ContextType>;
  DiscogsMasterVersion?: DiscogsMasterVersionResolvers<ContextType>;
  DiscogsMasterVersionStats?: DiscogsMasterVersionStatsResolvers<ContextType>;
  DiscogsMasterVersionStatsCommunity?: DiscogsMasterVersionStatsCommunityResolvers<ContextType>;
  DiscogsMasterVersionsFilterFacets?: DiscogsMasterVersionsFilterFacetsResolvers<ContextType>;
  DiscogsMasterVersionsFilters?: DiscogsMasterVersionsFiltersResolvers<ContextType>;
  DiscogsRelation?: DiscogsRelationResolvers<ContextType>;
  DiscogsRelease?: DiscogsReleaseResolvers<ContextType>;
  DiscogsReleaseCommunity?: DiscogsReleaseCommunityResolvers<ContextType>;
  DiscogsReleaseCommunityRating?: DiscogsReleaseCommunityRatingResolvers<ContextType>;
  DiscogsReleaseCommunityUser?: DiscogsReleaseCommunityUserResolvers<ContextType>;
  DiscogsReleaseFormat?: DiscogsReleaseFormatResolvers<ContextType>;
  DiscogsReleaseIdentifier?: DiscogsReleaseIdentifierResolvers<ContextType>;
  DiscogsReleaseLabel?: DiscogsReleaseLabelResolvers<ContextType>;
  DiscogsReleaseRating?: DiscogsReleaseRatingResolvers<ContextType>;
  DiscogsReleaseRatingWrapper?: DiscogsReleaseRatingWrapperResolvers<ContextType>;
  DiscogsSearch?: DiscogsSearchResolvers<ContextType>;
  DiscogsSearchPagination?: DiscogsSearchPaginationResolvers<ContextType>;
  DiscogsSearchPaginationUrls?: DiscogsSearchPaginationUrlsResolvers<ContextType>;
  DiscogsSearchResultArtist?: DiscogsSearchResultArtistResolvers<ContextType>;
  DiscogsSearchResultLabel?: DiscogsSearchResultLabelResolvers<ContextType>;
  DiscogsSearchResultMaster?: DiscogsSearchResultMasterResolvers<ContextType>;
  DiscogsSearchResultRelease?: DiscogsSearchResultReleaseResolvers<ContextType>;
  DiscogsTrackShort?: DiscogsTrackShortResolvers<ContextType>;
  DiscogsUserData?: DiscogsUserDataResolvers<ContextType>;
  DiscogsVersionsFilterFacetsValues?: DiscogsVersionsFilterFacetsValuesResolvers<ContextType>;
  DiscogsVideo?: DiscogsVideoResolvers<ContextType>;
  GetDiscogsMasterVersions?: GetDiscogsMasterVersionsResolvers<ContextType>;
  Lookup?: LookupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  RelationData?: RelationDataResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  SearchDiscogsArtist?: SearchDiscogsArtistResolvers<ContextType>;
  SearchDiscogsLabel?: SearchDiscogsLabelResolvers<ContextType>;
  SearchDiscogsMaster?: SearchDiscogsMasterResolvers<ContextType>;
  SearchDiscogsRelease?: SearchDiscogsReleaseResolvers<ContextType>;
}>;

