import React from "react";
import { useEffect, useState } from "react";
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
import { Tooltip } from "@chakra-ui/react";
import { MdAssignmentAdd } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Controller, useForm } from "react-hook-form";
import Pagination from "../Pagination";
const Employee = () => {
  // Pagination
  const itemPerPage = 5;

  const [page, setpage] = useState(1);
  const [totalItems, settotalItems] = useState();

  console.log(page, "page");
  console.log(totalItems, "total");
  const handelnext = () => {
    console.log("wokring");
    if (page < totalItems / itemPerPage) {
      setpage(page + 1);
    } else {
      setpage(page);
    }
  };
  // next button

  const handelprev = () => {
    if (page > 1) {
      setpage(page - 1);
    } else {
      setpage(page);
    }
  };
  const handelpagination = (page) => {
    // console.log(page);
    setpage(page);
  };

  let toast = useToast();
  const [employess, setemployees] = useState();
  const [filter, setFilter] = useState();
  const [employes, setemployee] = useState();
  console.log(employess, "employess");
  const [isloading, setloading] = useState(false);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [isOpen, setOpen] = useState(false);

  console.log(filter, "filter");

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

  async function onSubmit(value) {
    console.log(value, "value");
    setloading(true);

    let data = {
      name: value.name,
      email: value.email,

      addresses: value.addresses,
      mobile: value.mobile,
      department: {
        id: depts[value.department].id,
        name: depts[value.department].name,
      },
    };
    try {
      let response = await fetch(
        `${apiUrl}/api/employee/update/${employes.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );

      let resdata = await response.json();
      console.log(resdata);
      if (resdata.status) {
        setloading(false);
        getEmployees();
        setOpen(false);
        toast({
          title: "employee updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
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

  const [depts, setdept] = useState();
  async function getDepartment() {
    try {
      let response = await fetch(`${apiUrl}/api/department/getAll`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      }

      );
      let data = await response.json();
      if (data.status) {
        console.log(data, "data");
        setdept(data.depts);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function getEmployee(id) {
    try {
      console.log(id, "id");
      let response = await fetch(`${apiUrl}/api/employee/getEmployee/${id}`,

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
        setValue("department", data.department?.id);
        setemployee(data.employee);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  async function getEmployees() {
    try {
      let pagination = { _limit: itemPerPage, _page: page };
      let Filter = { filter: filter };
      console.log(pagination, "pagination");

      let queryString = "";
      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }
      for (let key in Filter) {
        queryString += `${key}=${Filter[key]}&`;
      }

      let response = await fetch(
        `${apiUrl}/api/employee/getAllEmployees?${queryString}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      let data = await response.json();
      console.log(data, "data");
      if (data.status) {
        setemployees(data.data);
        settotalItems(data.totalDocs);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }



  async function handelDelete(id) {
    try {
      console.log(id, "id");
      let response = await fetch(`${apiUrl}/api/employee/deleteEmployee/${id}` ,{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      });
      let data = await response.json();
      console.log(data, "data1");
      if (data.status) {
        getEmployees();
        toast({
          title: "employee deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }else{
        toast({
          title: data.message||"employee deleted.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  useEffect(() => {
    getEmployees();
    getDepartment();
  }, [filter, page]);

  return (
    <div>
      <Box p={5}>
        <Stack>
          <HStack justifyContent={"space-between"}>
            <Button
              onClick={() => {
                setopen(true);
              }}
              w={200}
              colorScheme="teal"
            >
              EMPLOYEE
            </Button>
          </HStack>

          <Box mt={5}>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>
                      {" "}
                      Name{" "}
                      <ArrowDownIcon
                        onClick={() => {
                          setFilter("name_descending");
                        }}
                        cursor={"pointer"}
                        mx={2}
                      />
                      <ArrowUpIcon
                        onClick={() => {
                          setFilter("name_ascending");
                        }}
                        cursor={"pointer"}
                      />{" "}
                    </Th>
                    <Th>email</Th>
                    <Th> mobile </Th>
                    <Th>
                      {" "}
                      address{" "}
                      <ArrowDownIcon
                        onClick={() => {
                          setFilter("location_descending");
                        }}
                        cursor={"pointer"}
                        mx={2}
                      />
                      <ArrowUpIcon
                        onClick={() => {
                          setFilter("location_ascending");
                        }}
                        cursor={"pointer"}
                      />{" "}
                    </Th>
                    <Th> Department </Th>
                    <Th> Action </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employess
                    ? employess.map((item) => {
                        return (
                          <Tr>
                            <Td>{item.name}</Td>
                            <Td>{item.email}</Td>
                            <Td>{item.mobile}</Td>
                            <Td>{item.addresses}</Td>
                            <Td>{item.department?.name || "not assigned "}</Td>
                            <Td display={"flex"}>
                              <ViewIcon
                                onClick={() => {
                                  getEmployee(item.id);
                                }}
                                cursor={"pointer"}
                                mx={2}
                                color={"black"}
                              />
                              <DeleteIcon
                                onClick={() => {
                                  handelDelete(item.id);
                                }}
                                cursor={"pointer"}
                                color={"red"}
                                mx={2}
                              />

                              {/* <MdAssignmentAdd
                                cursor={"pointer"}
                                color={"blue"}
                                mx={2}
                              /> */}
                            </Td>
                          </Tr>
                        );
                      })
                    : "no data"}
                </Tbody>
              </Table>
            </TableContainer>

            <Pagination
              handelpagination={handelpagination}
              itemPerPage={itemPerPage}
              page={page}
              totalItems={totalItems}
              handelprev={handelprev}
              handelnext={handelnext}
            />
          </Box>
        </Stack>
      </Box>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
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
              <Select
                {...register("department", {})}
                w={400}
                h={12}
                border="1px solid black"
                placeholder="Select department"
                isRequired
                name="department" // Use "subgroupId" as the name
                id="department"
              >
                {depts?.map((item, i) => (
                  <option key={item.id} value={i}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.department && (
                <Text color="red.500">{errors.department.message}</Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {!isloading ? (
              <Button
                className="btn"
                color={"white"}
                onClick={handleSubmit(onSubmit)}
                colorScheme="linkedin"
                marginTop={"50px"}
                spinner={<BeatLoader size={8} color="white" />}
              >
                update
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
                update
              </Button>
            )}

            {/* <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Employee;
