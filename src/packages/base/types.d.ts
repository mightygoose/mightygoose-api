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
};

export type Query = {
  __typename?: 'Query';
  lookup: Lookup;
  search: Search;
};

export type Relation = {
  __typename?: 'Relation';
  _relationData: RelationData;
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
  Query: ResolverTypeWrapper<{}>;
  Relation: ResolverTypeWrapper<Relation>;
  RelationData: ResolverTypeWrapper<RelationData>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Search: ResolverTypeWrapper<Search>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Lookup: Lookup;
  ID: Scalars['ID'];
  Query: {};
  Relation: Relation;
  RelationData: RelationData;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Search: Search;
  Boolean: Scalars['Boolean'];
}>;

export type LookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lookup'] = ResolversParentTypes['Lookup']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Lookup']>, { __typename: 'Lookup' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  lookup?: Resolver<ResolversTypes['Lookup'], ParentType, ContextType>;
  search?: Resolver<ResolversTypes['Search'], ParentType, ContextType>;
}>;

export type RelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Relation']>, { __typename: 'Relation' } & GraphQLRecursivePick<ParentType, {"_relationData":true}>, ContextType>;
  _relationData?: Resolver<ResolversTypes['RelationData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RelationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['RelationData'] = ResolversParentTypes['RelationData']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['RelationData']>, { __typename: 'RelationData' } & (GraphQLRecursivePick<ParentType, {"title":true}> | GraphQLRecursivePick<ParentType, {"type":true}> | GraphQLRecursivePick<ParentType, {"album":true}> | GraphQLRecursivePick<ParentType, {"artist":true}> | GraphQLRecursivePick<ParentType, {"artists":true}> | GraphQLRecursivePick<ParentType, {"country":true}> | GraphQLRecursivePick<ParentType, {"genre":true}> | GraphQLRecursivePick<ParentType, {"year":true}>), ContextType>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Lookup?: LookupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  RelationData?: RelationDataResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
}>;

