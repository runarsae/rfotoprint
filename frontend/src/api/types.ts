export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type User = {
    __typename?: 'User';
    _id: Scalars['ID'];
    username: Scalars['String'];
};

export type Product = {
    __typename?: 'Product';
    _id: Scalars['ID'];
    name: Scalars['String'];
    category: Scalars['String'];
    image: Scalars['String'];
    inventory?: Maybe<Scalars['Int']>;
    description?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};

export type Products = {
    __typename?: 'Products';
    products?: Maybe<Array<Maybe<Product>>>;
    pageCount?: Maybe<Scalars['Int']>;
};

export type FilterInput = {
    category?: InputMaybe<Scalars['String']>;
};

export type ProductInput = {
    name: Scalars['String'];
    category: Scalars['String'];
    image: Scalars['String'];
    inventory?: InputMaybe<Scalars['Int']>;
    description?: InputMaybe<Scalars['String']>;
    url?: InputMaybe<Scalars['String']>;
};

export type Result = {
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
};

export type DefaultResult = Result & {
    __typename?: 'DefaultResult';
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
};

export type AuthResult = Result & {
    __typename?: 'AuthResult';
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    data?: Maybe<Scalars['String']>;
};

export type IdResult = Result & {
    __typename?: 'IdResult';
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    data?: Maybe<Scalars['ID']>;
};

export type ProductsResult = Result & {
    __typename?: 'ProductsResult';
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    data?: Maybe<Products>;
};

export type ProductResult = Result & {
    __typename?: 'ProductResult';
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    data?: Maybe<Product>;
};

export type Query = {
    __typename?: 'Query';
    verifyAuth: DefaultResult;
    products: ProductsResult;
    product: ProductResult;
};

export type QueryProductsArgs = {
    filter: FilterInput;
    page?: InputMaybe<Scalars['Int']>;
    pageSize?: InputMaybe<Scalars['Int']>;
};

export type QueryProductArgs = {
    id: Scalars['ID'];
};

export type Mutation = {
    __typename?: 'Mutation';
    signUp: AuthResult;
    signIn: AuthResult;
    createProduct: IdResult;
    editProduct: IdResult;
    editProductInventory: IdResult;
    deleteProduct: IdResult;
    editProductsOrder: DefaultResult;
};

export type MutationSignUpArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
};

export type MutationSignInArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
};

export type MutationCreateProductArgs = {
    product: ProductInput;
};

export type MutationEditProductArgs = {
    _id: Scalars['ID'];
    product: ProductInput;
};

export type MutationEditProductInventoryArgs = {
    _id: Scalars['ID'];
    inventory: Scalars['Int'];
};

export type MutationDeleteProductArgs = {
    _id: Scalars['ID'];
};

export type MutationEditProductsOrderArgs = {
    category: Scalars['String'];
    order: Array<InputMaybe<Scalars['ID']>>;
};

export type VerifyAuthQueryVariables = Exact<{ [key: string]: never }>;

export type VerifyAuthQuery = {
    __typename?: 'Query';
    verifyAuth: { __typename?: 'DefaultResult'; success: boolean };
};

export type ProductsQueryVariables = Exact<{
    filter: FilterInput;
    page?: InputMaybe<Scalars['Int']>;
    pageSize?: InputMaybe<Scalars['Int']>;
}>;

export type ProductsQuery = {
    __typename?: 'Query';
    products: {
        __typename?: 'ProductsResult';
        success: boolean;
        message?: string | null | undefined;
        data?:
            | {
                  __typename?: 'Products';
                  pageCount?: number | null | undefined;
                  products?:
                      | Array<
                            | {
                                  __typename?: 'Product';
                                  _id: string;
                                  name: string;
                                  image: string;
                                  category: string;
                              }
                            | null
                            | undefined
                        >
                      | null
                      | undefined;
              }
            | null
            | undefined;
    };
};

export type ProductQueryVariables = Exact<{
    id: Scalars['ID'];
}>;

export type ProductQuery = {
    __typename?: 'Query';
    product: {
        __typename?: 'ProductResult';
        success: boolean;
        message?: string | null | undefined;
        data?:
            | { __typename?: 'Product'; _id: string; name: string; image: string; category: string }
            | null
            | undefined;
    };
};
