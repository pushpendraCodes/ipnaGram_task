import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
  Toast,
  useToast,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
const Employee = () => {
  const [isOpen, setOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
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

  const [isloading, setloading] = useState(false);
  const user  = JSON.parse(localStorage.getItem("user"))?.user
  const [employes, setemployee] = useState();
  async function getEmployee(id) {
    try {
      console.log(id, "id");
      let response = await fetch(`${apiUrl}/api/employee/getEmployee/${user}`,


      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      });
      let data = await response.json();
      console.log(data, "data1");
      if (data.status) {
        setOpen(true);
        setValue("name", data.employee.name);
        setValue("email", data.employee.email);
        setValue("addresses", data.employee.addresses);
        setValue("mobile", data.employee.mobile);
        setValue("department", data.employee.department.name);
        setemployee(data.employee);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }



  return (
    <div>
      <HStack p={5} justifyContent={"space-between"}>
        <Button
          onClick={() => {
            getEmployee(user)

          }}
          w={200}
          colorScheme="teal"
        >
          click to show details
        </Button>
      </HStack>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel> Name</FormLabel>
              <Input
                placeholder="First name"
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

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Last name"
                {...register("email", {
                  required: "email is required",
                })}
                name="email"
                id="email"
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile</FormLabel>
              <Input
                placeholder=" Mobile"
                {...register("mobile", {
                  required: "mobile is required",
                })}
                name="mobile"
                id="mobile"
              />
              {errors.mobile && (
                <Text color="red.500">{errors.mobile.message}</Text>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Last name"
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
            <FormControl mt={4}>
              <FormLabel>Department</FormLabel>
              <Input
                placeholder=""
                {...register("department", {
                  required: "department is required",
                })}
                name="department"
                id="department"
              />
            </FormControl>
          </ModalBody>

          {/*  */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Employee;
