import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorkEvent: WorkEvent;
  createUser?: Maybe<Response>;
  login: Response;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  work_events?: Maybe<Array<WorkEventInput>>;
  paid_work_time?: Maybe<Scalars['Float']>;
  total_time_working?: Maybe<Scalars['Float']>;
  password: Scalars['String'];
  email: Scalars['String'];
  last_name: Scalars['String'];
  first_name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  workEvents: Array<WorkEvent>;
  me?: Maybe<User>;
  findUser: Response;
  users?: Maybe<Array<User>>;
};


export type QueryFindUserArgs = {
  id: Scalars['Int'];
};

export type Response = {
  __typename?: 'Response';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  total_time_working: Scalars['Float'];
  paid_work_time: Scalars['Float'];
  work_events?: Maybe<Array<WorkEvent>>;
};

export type WorkEvent = {
  __typename?: 'WorkEvent';
  id: Scalars['Int'];
  clock_in: Scalars['String'];
  clock_out: Scalars['String'];
  user: User;
};

export type WorkEventInput = {
  clock_in?: Maybe<Scalars['DateTime']>;
  clock_out?: Maybe<Scalars['DateTime']>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  pass: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name'>
    )> }
  )> }
);


export const RegisterDocument = gql`
    mutation Register($email: String!, $pass: String!, $fname: String!, $lname: String!) {
  createUser(
    password: $pass
    email: $email
    first_name: $fname
    last_name: $lname
  ) {
    errors {
      field
      message
    }
    user {
      id
      email
      first_name
      last_name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      pass: // value for 'pass'
 *      fname: // value for 'fname'
 *      lname: // value for 'lname'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
