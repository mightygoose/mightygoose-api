import { GraphQLResolveInfo } from 'graphql';
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
  _FieldSet: any;
};

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
  id: Scalars['ID'];
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
  Lookup: ResolverTypeWrapper<Lookup>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Relation: ResolverTypeWrapper<Relation>;
  RelationData: ResolverTypeWrapper<RelationData>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Search: ResolverTypeWrapper<Search>;
  SearchSpotifyFilter: SearchSpotifyFilter;
  SpotifyCommunity: ResolverTypeWrapper<SpotifyCommunity>;
  SpotifyCurrencies: SpotifyCurrencies;
  SpotifyImageShort: ResolverTypeWrapper<SpotifyImageShort>;
  SpotifyLookup: ResolverTypeWrapper<SpotifyLookup>;
  SpotifyPaginationParameters: SpotifyPaginationParameters;
  SpotifyRelation: ResolverTypeWrapper<SpotifyRelation>;
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
  SpotifyCommunity: SpotifyCommunity;
  SpotifyImageShort: SpotifyImageShort;
  SpotifyLookup: SpotifyLookup;
  SpotifyPaginationParameters: SpotifyPaginationParameters;
  SpotifyRelation: SpotifyRelation;
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

export type SpotifyCommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyCommunity'] = ResolversParentTypes['SpotifyCommunity']> = ResolversObject<{
  have?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  want?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotifyRelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotifyRelation'] = ResolversParentTypes['SpotifyRelation']> = ResolversObject<{
  _relationData?: Resolver<ResolversTypes['RelationData'], ParentType, ContextType>;
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
  SpotifyCommunity?: SpotifyCommunityResolvers<ContextType>;
  SpotifyImageShort?: SpotifyImageShortResolvers<ContextType>;
  SpotifyLookup?: SpotifyLookupResolvers<ContextType>;
  SpotifyRelation?: SpotifyRelationResolvers<ContextType>;
  SpotifySearch?: SpotifySearchResolvers<ContextType>;
  SpotifySearchPagination?: SpotifySearchPaginationResolvers<ContextType>;
  SpotifySearchPaginationUrls?: SpotifySearchPaginationUrlsResolvers<ContextType>;
  SpotifyTrackShort?: SpotifyTrackShortResolvers<ContextType>;
  SpotifyUserData?: SpotifyUserDataResolvers<ContextType>;
  SpotifyVideo?: SpotifyVideoResolvers<ContextType>;
}>;

