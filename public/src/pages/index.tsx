import React from "react";
import {useMeQuery} from "../generated/graphql";

const Index : React.FC<{}> = () => {
    const {data, loading} = useMeQuery();

    let response;
    if (loading) {
        response = null;
    } else if (!data?.me) {
        response = `You are not logged in :(`;
    } else if (data.me) {
        response = `Hello ${data.me.first_name}!`
    }
    console.log(data?.me);

    return (

        <div>{response}</div>
    );
}

export default Index;
