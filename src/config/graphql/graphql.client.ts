"use client";

import {ApolloLink, HttpLink} from "@apollo/client";
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// have a function to create a client for you
export const makeGraphQLClient = () => {
    const httpLink = new HttpLink({
        uri: "http://127.0.0.1:3000/graphql",
        fetchOptions: { cache: "no-store" },
        headers: {
            authorization: `Bearer 123456789`,
        }
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ])
                : httpLink,
    });
}
