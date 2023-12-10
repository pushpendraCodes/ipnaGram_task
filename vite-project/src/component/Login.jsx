// Login.js
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
const[email ,setEmail]=useState()
const[password ,setPassword]=useState()
const toast = useToast();
const apiUrl = import.meta.env.VITE_APP_API_URL;
const [isloading, setloading] = useState(false);

let navigate = useNavigate()

function navigateUser(role) {
  if (role == "employee") {
    return navigate("/dashboard/employeeDashboard");

  } else if (role =="manager") {
    return navigate("/dashboard/employee");

  }

  return;
}


async function submit (e){

  e.preventDefault()
  try {
    setloading(false);
   const value = {
      email:email,
      password:password
    }
    console.log(value ,"value")

    let response = await fetch(`${apiUrl}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
        // Add other headers if needed
      },
    });

    let resdata = await response.json();
    console.log(resdata);
    if (resdata.status) {
      setloading(false);
      localStorage.setItem("user" , JSON.stringify(resdata))
      toast({
        title: "login successfull.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });


      navigateUser(resdata.role);
    } else {
      setloading(false);
      toast({
        title: resdata.msg || "something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  } catch (error) {}
}

  return (
    <ChakraProvider>
      <Flex align="center" justify="center" minH="100vh">
        <Box w="sm" p={4} boxShadow="md" rounded="md" bg="white">
          <Heading mb={6}  textAlign={"center"}>Log In</Heading>
          <form>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                isRequired
                onChange={(e)=>{setEmail(e.target.value)}}
                 type="email" placeholder="Enter your email" />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                isRequired
                  onChange={(e)=>{setPassword(e.target.value)}}
                 type="password" placeholder="Enter your password" />
              </FormControl>

              <Button  onClick={submit} colorScheme="teal" type="submit">
                Log In
              </Button>
            </Stack>
          </form>
          <Box mt={4} textAlign="center">
            <Link as={RouterLink} to="/signup" color="teal.500">
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
