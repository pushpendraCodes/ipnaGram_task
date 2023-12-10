import React, { useState } from "react";
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
  Select,
  Text,
  useToast
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  let toast = useToast()
  let navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [isloading, setloading] = useState(false);




  async function onSubmit(value) {
    console.log(value, "value");
    try {
      let response = await fetch(`${apiUrl}/api/user/signup`, {
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

        toast({
          title: "signup successfull.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTimeout(()=>{
          navigate("/");
        },3000)
      } else {
        setloading(false);
        toast({
          title: resdata.message || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {}
  }

  return (
    <div>
      <ChakraProvider>
        <Flex align="center" justify="center" minH="100vh">
          <Box w="lg" p={4} boxShadow="md" rounded="md" bg="white">
            <Heading mb={6} textAlign={"center"}>
              Sign Up
            </Heading>
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder=" name"
                    {...register("name", {
                      required: "name is required",
                    })}
                    name="name"
                    id="name"
                  />
                  {errors.name && (
                    <Text color="red.500">{errors.name.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder=" Email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                      message: "Invalid email address",
                    },
                    })}
                    name="email"
                    id="email"
                  />
                  {errors.email && (
                    <Text color="red.500">{errors.email.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="password"
                    {...register("password", {
                      required: "password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                    name="password"
                    id="password"
                  />
                  {errors.password && (
                    <Text color="red.500">{errors.password.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    placeholder=" Mobile"
                    {...register("mobile", {
                      required: "mobile is required",
                      pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                    })}
                    name="mobile"
                    id="mobile"
                  />
                  {errors.mobile && (
                    <Text color="red.500">{errors.mobile.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    placeholder=" addresses"
                    {...register("addresses", {
                      required: "addresses is required",
                    })}
                    name="addresses"
                    id="addresses"
                  />
                  {errors.addresses && (
                    <Text color="red.500">{errors.addresses.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>user type</FormLabel>
                  <Select
                  {...register("role", {
                      required: "role is required",
                    })}
                    w={400}
                    h={12}
                    border="1px solid black"
                    placeholder="Select role"
                    isRequired
                    name="role" // Use "subgroupId" as the name
                    id="role"
                  >
                    <option value={"employee"}>employee</option>
                    <option value={"manager"}>manager</option>
                  </Select>
                  {errors.role && (
                    <Text color="red.500">{errors.role.message}</Text>
                  )}
                </FormControl>

                {!isloading ? (
                  <Button
                    className="btn"
                    color={"white"}
                    onClick={handleSubmit(onSubmit)}
                    colorScheme="linkedin"
                    marginTop={"50px"}
                    spinner={<BeatLoader size={8} color="white" />}
                  >
                    signup
                  </Button>
                ) : (
                  <Button
                    className="btn"
                    color={"white"}
                    onClick={handleSubmit(onSubmit)}
                    colorScheme="linkedin"
                    marginTop={"50px"}
                    spinner={<BeatLoader size={8} color="white" />}
                    isLoading
                  >
                    signup
                  </Button>
                )}
              </Stack>
            </form>
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Signup;
