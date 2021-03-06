import React from 'react';
import "formik";
import {Form, Formik} from "formik";
import {Wrapper} from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useRegisterMutation} from "../generated/graphql";
import {setErrorMap} from "../utils/setErrorMap";
import {useRouter} from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();
    return (
        <Wrapper>
            <Formik initialValues={{first_name: "", last_name: "", email: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await register({
                            variables: {
                                email: values.email,
                                pass: values.password,
                                fname: values.first_name,
                                lname: values.last_name
                            }
                        });
                        if (response.data?.createUser?.errors) {
                            setErrors(setErrorMap(response.data.createUser.errors));
                            return;
                        }
                        router.push("/");
                    }}>
                {({isSubmitting}) =>
                    <Form>
                        <InputField name='first_name' label='First Name' placeholder='first name'/>
                        <Box mt={4}>
                            <InputField name='last_name' label='Last Name' placeholder='last name'/>
                        </Box>
                        <Box mt={4}>
                            <InputField name='email' label='Email' placeholder='email'/>
                        </Box>
                        <Box mt={4}>
                            <InputField name='password' label='Password' type='password' placeholder='password'/>
                        </Box>
                        <Box>
                            <Button size="md" isLoading={isSubmitting} mt={4} type="submit"
                                    colorScheme="linkedin">Register</Button>
                            <Button size="md" mt={4} colorScheme="green" float="right">Login</Button>
                        </Box>
                    </Form>
                }
            </Formik>
        </Wrapper>
    );
}

export default Register;
