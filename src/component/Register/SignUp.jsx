import { Box, Button, FormControl, FormErrorMessage,Input, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAction  } from '../Redux/Auth/Action'

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address/mobile number").required("this field is required"),
  password: Yup.string().min(8,"password must be at least of 8 characters").required("password is required")
})

const SignUp = () => {

  const initialValues = {email:"",password:"",username:"",name:""};
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const toast = useToast()
  
    const handleSubmit = (values,actions) =>{
          dispatch(signupAction(values));
          actions.isSubmitting(false);
      }

    useEffect(()=>{  
      if(auth.signup?.username){
         navigate("/login")
         toast({
            description: `Account created. ${auth.signup?.username}`,
            status: "success",
            duration: 5000,
            isClosable: true
          })
         }
     },[auth.signup,navigate,toast])
    
    const handleNavigate = () => {
        navigate("/login")
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
                          
                          <Input classname='w-full' {...field} id='email' placeholder='Mobile Number or Email'/> 
                          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                       </FormControl>
                       )}
                    </Field>
                    <Field name = "password">
                       {({field,form}) => (<FormControl isInvalid = {form.errors.password && form.touched.password}>
                          
                          <Input classname='w-full' {...field} id='password' placeholder='Password'/> 
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                       </FormControl>
                       )}
                    </Field>
                    <Field name = "name">
                       {({field,form}) => (<FormControl isInvalid = {form.errors.name && form.touched.name}>
                          
                          <Input classname='w-full' {...field} id='name' placeholder='Full Name'/> 
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                       </FormControl>
                       )}
                    </Field>
                    <Field name = "username">
                       {({field,form}) => (<FormControl isInvalid = {form.errors.username && form.touched.username}>
                          
                          <Input classname='w-full' {...field} id='username' placeholder='Username'/> 
                          <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                       </FormControl>
                       )}
                    </Field> 
                    <p classname='text-center text-sm'>People who use our service may have uploaded your contact information to Instagram.<span className='text-purple-700 cursor-pointer'>Learn more</span></p>
                    
                    <p classname='text-center text-sm'>By signing up, you agree to our <span className='text-purple-700 cursor-pointer'>Terms, Privacy policy and Cookies Policy</span></p>

                    <Button className='w-full' mt={4} colorScheme="purple" type='submit' isLoading={formikProps.isSubmitting}>
                       Sign up
                    </Button>
                  </Form>
                 )}
    
               </Formik>
            </Box>
          </div>
          <div className='border w-full border-slate-50 mt-3'>
            <p className='text-center py-2'>
               Have an account? <span onClick={handleNavigate} className='ml-0.2 text-purple-700 cursor-pointer'>Sign in</span>
            </p>
          </div>
        </div>
  )
}

export default SignUp