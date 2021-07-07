import React from 'react';
import "formik";
import {Form, Formik} from "formik";
import {Wrapper} from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

interface registerProps {
}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper>
            <Formik initialValues={{email: "", password: ""}} onSubmit={(values) => {
                        console.log(values);}}>
                {({isSubmitting}) =>
                    <Form>
                        <InputField name='first name' label='First Name'/>
                        <Box mt={4}>
                            <InputField name='last name' label='Last Name'/>
                        </Box>
                        <Box mt={4}>
                            <InputField name='email' label='Email'/>
                        </Box>
                        <Box mt={4}>
                            <InputField name='password' label='Password'/>
                        </Box>
                        <Box>
                            <Button size="md" isLoading={isSubmitting} mt={4} type="submit" colorScheme="linkedin">Submit</Button>
                        </Box>
                    </Form>
                }
            </Formik>
        </Wrapper>
    );
}

export default Register;
