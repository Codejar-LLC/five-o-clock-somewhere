import React from "react";
import {CSSReset, ThemeProvider} from "@chakra-ui/react";
import theme from "../theme"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

function MyApp({Component, pageProps}: any) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CSSReset/>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
