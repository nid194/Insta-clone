import { Box, Button, FormControl, FormErrorMessage,Input, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from '../Redux/Auth/Action';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address/mobile number").required("this field is required"),
  password: Yup.string().min(8,"password must be at least of 8 characters").required("password is required")
})

const SignIn = () => {
  const initialValues = {email:"",password:""};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  // const token = localStorage.getItem("token");
  const toast = useToast()


  const handleSubmit = (values,actions) =>{
      dispatch(signinAction(values));
      actions.setSubmitting(false);
  }


 useEffect(() => {
  if (auth.login?.token) {
    toast({
      description: "Login success",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/");
  }
 }, [auth.login?.token, auth.login?.username, navigate, toast]);

 
 console.log(localStorage.getItem("authToken"));
  
  const handleNavigate = () => {
      navigate("/signup")
  }
  
  return (
    <div>
      <div className='border'>
        <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
           <img className='mb-5' src='https://i.imgur.com/zqpwkLQ.png/' alt='insta'/>
           <Formik initialValues ={initialValues} onSubmit ={handleSubmit} validationSchema = {validationSchema}>
            {(formikProps) => (
              <Form className='space-y-6'>
                <Field name = "email">
                   {({field,form}) => (<FormControl isInvalid = {form.errors.email && form.touched.email}>
                      
                      <Input className='w-full' {...field} id='email' placeholder='mobile number or email'/> 
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                   </FormControl>
                   )}
                </Field>
                <Field name = "password">
                   {({field,form}) => (<FormControl isInvalid = {form.errors.password && form.touched.password}>
                      
                      <Input className='w-full' {...field} id='password' placeholder='password'/> 
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                   </FormControl>
                   )}
                </Field>

                <Button className='w-full' mt={4} colorScheme='purple' type='submit' isLoading={formikProps.isSubmitting}>
                   Sign In
                </Button>
              </Form>
             )}

           </Formik>
        </Box>
      </div>
      <div className='border w-full border-slate-50 mt-3'>
        <p className='text-center py-2'>
          Don't have an account? <span onClick={handleNavigate} className='ml-0.2 text-purple-700 cursor-pointer'>Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn