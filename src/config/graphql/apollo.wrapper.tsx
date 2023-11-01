import {ApolloNextAppProvider} from '@apollo/experimental-nextjs-app-support/ssr';
import React from 'react';
import {makeGraphQLClient} from "@/config/graphql/graphql.client";

const ApolloWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <ApolloNextAppProvider makeClient={makeGraphQLClient}>
            {children}
        </ApolloNextAppProvider>
    );
};

export default ApolloWrapper;
