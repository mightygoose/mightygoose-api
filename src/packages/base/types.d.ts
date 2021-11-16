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
  id: Scalars['ID'];
};
