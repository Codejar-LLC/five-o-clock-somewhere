import React from 'react';
import {Formik, Form} from "formik";
import {Wrapper} from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

interface registerProps {}

const Register : React.FC<registerProps> = ({}) => {
    return (
        <Wrapper>
            <Formik initialValues={{ email:"", password:""}} onSubmit={(values) => {console.log(values);}}>
                {() => ({}) => (
                    <Form>
                        <InputField name='email' label='Email'/>
                        <Box mt={4}>
                            <InputField name='password' label='Password'/>
                        </Box>
                        <Button mt={4} type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
            <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
            </FormControl>
        </Wrapper>
    );
}

export default Register;
