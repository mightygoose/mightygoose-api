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

export enum Services {
  Base = 'BASE'
}
