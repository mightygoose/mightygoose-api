import { GraphQLResolveInfo } from 'graphql';
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
};

export enum AlbumType {
  Album = 'album'
}

/**
 * type SpotifyArtistMembers {
 *   id: Int
 *   name: String
 *   resource_url: String
 *   active: Boolean
 *   thumbnail_url: String
 * }
 *
 * type SpotifySearchResultArtist {
 *   id: ID!
 *   type: String!
 *   uri: String!
 *   title: String!
 *   thumb: String!
 *   cover_image: String!
 *   resource_url: String!
 *   user_data: SpotifyMasterVersionStatsCommunity!
 *   relation: Relation!
 * }
 *
 * type SpotifyArtistShort {
 *   id: ID!
 *   name: String!
 *   anv: String!
 *   join: String!
 *   role: String!
 *   tracks: String!
 *   resource_url: String!
 *   thumbnail_url: String!
 *   relation: Relation!
 *   artist: SpotifyArtist!
 * }
 *
 * type SearchSpotifyArtist {
 *   pagination: SpotifySearchPagination!
 *   results: [SpotifySearchResultArtist!]!
 * }
 *
 * extend type SpotifySearch {
 *   artists(
 *     search: String
 *     filter: SearchSpotifyFilter
 *     pagination: SpotifyPaginationParameters = { page: 1, per_page: 1 }
 *   ): SearchSpotifyArtist!
 * }
 */
export enum AlbumTypes {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single'
}

export type Lookup = {
  __typename?: 'Lookup';
  id: Scalars['ID'];
  spotify: SpotifyLookup;
};

export type Relation = {
  __typename?: 'Relation';
  _relationData: RelationData;
  spotify?: Maybe<SpotifyRelation>;
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

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export type Search = {
  __typename?: 'Search';
  id: Scalars['ID'];
  spotify: SpotifySearch;
};

/** spotify general search parameters */
export type SearchSpotifyFilter = {
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

export type SpotifyAlbum = {
  __typename?: 'SpotifyAlbum';
  /** The type of the album. */
  album_type: AlbumTypes;
  /**
   * The markets in which the album is available: ISO 3166-1 alpha-2 country codes.
   * NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market.
   */
  available_markets: Array<Scalars['String']>;
  /** Known external URLs for this album. */
  external_urls: SpotifyExternalUrls;
  /** A link to the Web API endpoint providing full details of the album. */
  href: Scalars['String'];
  /** The Spotify ID for the album. */
  id: Scalars['ID'];
  /** The cover art for the album in various sizes, widest first. */
  images: Array<SpotifyImage>;
  /** The name of the album. In case of an album takedown, the value may be an empty string. */
  name: Scalars['String'];
  relation: Relation;
  /** The date the album was first released. */
  release_date: Scalars['String'];
  /** The precision with which release_date value is known. */
  release_date_precision: ReleaseDatePrecision;
  /** Included in the response when a content restriction is applied. */
  restrictions: SpotifyRestrictions;
  /** The number of tracks in the album. */
  total_tracks: Scalars['Int'];
  /** The object type. */
  type: AlbumType;
  /** The Spotify URI for the album. */
  uri: Scalars['String'];
};

export type SpotifyCommunity = {
  __typename?: 'SpotifyCommunity';
  have: Scalars['Int'];
  want: Scalars['Int'];
};

export enum SpotifyCurrencies {
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

export type SpotifyExternalUrls = {
  __typename?: 'SpotifyExternalUrls';
  /** The Spotify URL for the object. */
  spotify: Scalars['String'];
};

export type SpotifyImage = {
  __typename?: 'SpotifyImage';
  /** The image height in pixels. */
  height: Scalars['Int'];
  /** The source URL of the image */
  url: Scalars['String'];
  /** The image width in pixels. */
  width: Scalars['Int'];
};

export type SpotifyImageShort = {
  __typename?: 'SpotifyImageShort';
  height: Scalars['Int'];
  resource_url: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
  uri150: Scalars['String'];
  width: Scalars['Int'];
};

export type SpotifyLookup = {
  __typename?: 'SpotifyLookup';
  /**
   * Get Spotify catalog information for a single album
   * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album
   */
  album?: Maybe<SpotifyAlbum>;
  id: Scalars['ID'];
};


export type SpotifyLookupAlbumArgs = {
  id: Scalars['ID'];
  market?: InputMaybe<Scalars['String']>;
};

/** spotify pagination parameters */
export type SpotifyPaginationParameters = {
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

export type SpotifyRelation = {
  __typename?: 'SpotifyRelation';
  _relationData: RelationData;
};

export enum SpotifyRestrictionReason {
  Explicit = 'explicit',
  Market = 'market',
  Product = 'product'
}

export type SpotifyRestrictions = {
  __typename?: 'SpotifyRestrictions';
  /**
   * The reason for the restriction. Albums may be restricted if the content is not available in a given market,
   * to the user's subscription type, or when the user's account is set to not play explicit content.
   * Additional reasons may be added in the future.
   */
  reason: SpotifyRestrictionReason;
};

export type SpotifySearch = {
  __typename?: 'SpotifySearch';
  id: Scalars['ID'];
};

export type SpotifySearchPagination = {
  __typename?: 'SpotifySearchPagination';
  items: Scalars['Int'];
  page: Scalars['Int'];
  pages: Scalars['Int'];
  per_page: Scalars['Int'];
  urls: SpotifySearchPaginationUrls;
};

export type SpotifySearchPaginationUrls = {
  __typename?: 'SpotifySearchPaginationUrls';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
  prev?: Maybe<Scalars['String']>;
};

export enum SpotifySortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SpotifyTrackShort = {
  __typename?: 'SpotifyTrackShort';
  duration: Scalars['String'];
  position: Scalars['String'];
  title: Scalars['String'];
  type_: Scalars['String'];
};

export type SpotifyUserData = {
  __typename?: 'SpotifyUserData';
  in_collection: Scalars['Boolean'];
  in_wantlist: Scalars['Boolean'];
};

export type SpotifyVideo = {
  __typename?: 'SpotifyVideo';
  description: Scalars['String'];
  duration: Scalars['Int'];
  embed: Scalars['Boolean'];
  title: Scalars['String'];
  uri: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

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
  AlbumType: AlbumType;
  AlbumTypes: AlbumTypes;
  Lookup: ResolverTypeWrapper<Lookup>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Relation: ResolverTypeWrapper<Relation>;
  RelationData: ResolverTypeWrapper<RelationData>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ReleaseDatePrecision: ReleaseDatePrecision;
  Search: ResolverTypeWrapper<Search>;
  SearchSpotifyFilter: SearchSpotifyFilter;
  SpotifyAlbum: ResolverTypeWrapper<SpotifyAlbum>;
  SpotifyCommunity: ResolverTypeWrapper<SpotifyCommunity>;
  SpotifyCurrencies: SpotifyCurrencies;
  SpotifyExternalUrls: ResolverTypeWrapper<SpotifyExternalUrls>;
  SpotifyImage: ResolverTypeWrapper<SpotifyImage>;
  SpotifyImageShort: ResolverTypeWrapper<SpotifyImageShort>;
  SpotifyLookup: ResolverTypeWrapper<SpotifyLookup>;
  SpotifyPaginationParameters: SpotifyPaginationParameters;
  SpotifyRelation: ResolverTypeWrapper<SpotifyRelation>;
  SpotifyRestrictionReason: SpotifyRestrictionReason;
  SpotifyRestrictions: ResolverTypeWrapper<SpotifyRestrictions>;
  SpotifySearch: ResolverTypeWrapper<SpotifySearch>;
  SpotifySearchPagination: ResolverTypeWrapper<SpotifySearchPagination>;
  SpotifySearchPaginationUrls: ResolverTypeWrapper<SpotifySearchPaginationUrls>;
  SpotifySortOrder: SpotifySortOrder;
  SpotifyTrackShort: ResolverTypeWrapper<SpotifyTrackShort>;
  SpotifyUserData: ResolverTypeWrapper<SpotifyUserData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SpotifyVideo: ResolverTypeWrapper<SpotifyVideo>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Lookup: Lookup;
  ID: Scalars['ID'];
  Relation: Relation;
  RelationData: RelationData;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Search: Search;
  SearchSpotifyFilter: SearchSpotifyFilter;
  SpotifyAlbum: SpotifyAlbum;
  SpotifyCommunity: SpotifyCommunity;
  SpotifyExternalUrls: SpotifyExternalUrls;
  SpotifyImage: SpotifyImage;
  SpotifyImageShort: SpotifyImageShort;
  SpotifyLookup: SpotifyLookup;
  SpotifyPaginationParameters: SpotifyPaginationParameters;
  SpotifyRelation: SpotifyRelation;
  SpotifyRestrictions: SpotifyRestrictions;
  SpotifySearch: SpotifySearch;
  SpotifySearchPagination: SpotifySearchPagination;
  SpotifySearchPaginationUrls: SpotifySearchPaginationUrls;
  SpotifyTrackShort: SpotifyTrackShort;
  SpotifyUserData: SpotifyUserData;
  Boolean: Scalars['Boolean'];
  SpotifyVideo: SpotifyVideo;
}>;

export type LookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lookup'] = ResolversParentTypes['Lookup']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Lookup']>, { __typename: 'Lookup' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;

  spotify?: Resolver<ResolversTypes['SpotifyLookup'], { __typename: 'Lookup' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Relation']>, { __typename: 'Relation' } & GraphQLRecursivePick<ParentType, {"_relationData":true}>, ContextType>;

  spotify?: Resolver<Maybe<ResolversTypes['SpotifyRelation']>, { __typename: 'Relation' } & GraphQLRecursivePick<ParentType, {"_relationData":true}> & GraphQLRecursivePick<ParentType, {"_relationData":true}>, ContextType>;
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
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Search']>, { __typename: 'Search' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;

  spotify?: Resolver<ResolversTypes['SpotifySearch'], { __typename: 'Search' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyAlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyAlbum'] = ResolversParentTypes['SpotifyAlbum']> = ResolversObject<{
  album_type?: Resolver<ResolversTypes['AlbumTypes'], ParentType, ContextType>;
  available_markets?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  external_urls?: Resolver<ResolversTypes['SpotifyExternalUrls'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['SpotifyImage']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relation?: Resolver<ResolversTypes['Relation'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date_precision?: Resolver<ResolversTypes['ReleaseDatePrecision'], ParentType, ContextType>;
  restrictions?: Resolver<ResolversTypes['SpotifyRestrictions'], ParentType, ContextType>;
  total_tracks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AlbumType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyCommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyCommunity'] = ResolversParentTypes['SpotifyCommunity']> = ResolversObject<{
  have?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  want?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyExternalUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyExternalUrls'] = ResolversParentTypes['SpotifyExternalUrls']> = ResolversObject<{
  spotify?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyImage'] = ResolversParentTypes['SpotifyImage']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyImageShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyImageShort'] = ResolversParentTypes['SpotifyImageShort']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resource_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri150?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyLookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyLookup'] = ResolversParentTypes['SpotifyLookup']> = ResolversObject<{
  album?: Resolver<Maybe<ResolversTypes['SpotifyAlbum']>, ParentType, ContextType, RequireFields<SpotifyLookupAlbumArgs, 'id'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyRelation'] = ResolversParentTypes['SpotifyRelation']> = ResolversObject<{
  _relationData?: Resolver<ResolversTypes['RelationData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyRestrictionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyRestrictions'] = ResolversParentTypes['SpotifyRestrictions']> = ResolversObject<{
  reason?: Resolver<ResolversTypes['SpotifyRestrictionReason'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifySearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifySearch'] = ResolversParentTypes['SpotifySearch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifySearchPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifySearchPagination'] = ResolversParentTypes['SpotifySearchPagination']> = ResolversObject<{
  items?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  per_page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  urls?: Resolver<ResolversTypes['SpotifySearchPaginationUrls'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifySearchPaginationUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifySearchPaginationUrls'] = ResolversParentTypes['SpotifySearchPaginationUrls']> = ResolversObject<{
  first?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyTrackShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyTrackShort'] = ResolversParentTypes['SpotifyTrackShort']> = ResolversObject<{
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyUserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyUserData'] = ResolversParentTypes['SpotifyUserData']> = ResolversObject<{
  in_collection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  in_wantlist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyVideo'] = ResolversParentTypes['SpotifyVideo']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  embed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Lookup?: LookupResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  RelationData?: RelationDataResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  SpotifyAlbum?: SpotifyAlbumResolvers<ContextType>;
  SpotifyCommunity?: SpotifyCommunityResolvers<ContextType>;
  SpotifyExternalUrls?: SpotifyExternalUrlsResolvers<ContextType>;
  SpotifyImage?: SpotifyImageResolvers<ContextType>;
  SpotifyImageShort?: SpotifyImageShortResolvers<ContextType>;
  SpotifyLookup?: SpotifyLookupResolvers<ContextType>;
  SpotifyRelation?: SpotifyRelationResolvers<ContextType>;
  SpotifyRestrictions?: SpotifyRestrictionsResolvers<ContextType>;
  SpotifySearch?: SpotifySearchResolvers<ContextType>;
  SpotifySearchPagination?: SpotifySearchPaginationResolvers<ContextType>;
  SpotifySearchPaginationUrls?: SpotifySearchPaginationUrlsResolvers<ContextType>;
  SpotifyTrackShort?: SpotifyTrackShortResolvers<ContextType>;
  SpotifyUserData?: SpotifyUserDataResolvers<ContextType>;
  SpotifyVideo?: SpotifyVideoResolvers<ContextType>;
}>;

