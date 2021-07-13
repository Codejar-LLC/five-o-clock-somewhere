import React from 'react';
import "formik";
import {Form, Formik} from "formik";
import {Wrapper} from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useLoginMutation} from "../generated/graphql";
import {setErrorMap} from "../utils/setErrorMap";
import {useRouter} from "next/router";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();
    return (
        <Wrapper>
            <Formik initialValues={{first_name: "", last_name: "", email: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login({
                            variables: {
                                email: values.email,
                                pass: values.password,
                            }
                        });
                        if (response.data?.login?.errors) {
                            setErrors(setErrorMap(response.data.login.errors));
                            return;
                        }
                        router.push("/");
                    }}>
                {({isSubmitting}) =>
                    <Form>
                        <Box mt={4}>
                            <InputField name='email' label='Email' placeholder='email'/>
                        </Box>
                        <Box mt={4}>
                            <InputField name='password' label='Password' type='password' placeholder='password'/>
                        </Box>
                        <Box>
                            <Button size="md" isLoading={isSubmitting} mt={4} type="submit"
                                    colorScheme="green">Login</Button>
                            <Button size="md" mt={4} colorScheme="linkedin" float="right">Register</Button>
                        </Box>
                    </Form>
                }
            </Formik>
        </Wrapper>
    );
}

export default Login;
