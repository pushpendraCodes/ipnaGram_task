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
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Department from "../Department";

const Departments = () => {
  const [isOpen, setopen] = useState(false);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  let toast = useToast();

  const [name, setname] = useState();
  const [depts, setdept] = useState();
  const [isloading, setloading] = useState(false);

  console.log(name, "name");

  const [updateId, setId] = useState();

  async function getDepartment() {
    try {
      let response = await fetch(`${apiUrl}/api/department/getAll`);
      let data = await response.json();
      if (data.status) {
        console.log(data, "data");
        setdept(data.depts);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  useEffect(() => {
    getDepartment();
  }, []);

  async function handelsubmit() {
    if (updateId && name) {
      setloading(true);
      try {
        let response = await fetch(
          `${apiUrl}/api/department/update/${updateId}`,
          {
            method: "PUT",
            body: JSON.stringify({ name }),
            headers: {
              "Content-Type": "application/json",
              // Add other headers if needed
            },
          }
        );

        let resdata = await response.json();
        console.log(resdata);
        if (resdata.status) {
          setloading(false);
          getDepartment();
          toast({
            title: "department updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          // resetForm(data);
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
    } else {
      try {
        let body = {
          name: name,
          createdBy: "65730581162894725f567088",
        };
        setloading(true);
        let response = await fetch(`${apiUrl}/api/department/create`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            // Add other headers if needed
          },
        });

        let resdata = await response.json();
        console.log(resdata);
        if (resdata.status) {
          setloading(false);
          getDepartment();
          toast({
            title: "department created.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setname(null);
        } else {
          // resetForm(data);

          toast({
            title: resdata.message || "something wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handelDelete(id) {
    console.log(id, "id");
    try {
      setloading(true);
      let response = await fetch(`${apiUrl}/api/department/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add other headers if needed
        },
      });
      let data = await response.json();
      console.log(data, "data");
      if (data.status) {
        setloading(false);
        getDepartment();
        toast({
          title: "department deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        setloading(false);
        toast({
          title: data.message || "something wrong.",
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

  async function handelEdit(name, id) {
    setopen(true);
    setId(id);
    setname(name);
  }


  const [employeesDept ,setEmployees] = useState()

  const  getEmployeesDeptwise = async(id)=> {

    try {
      let response = await fetch(
        `${apiUrl}/api/employee/getEmployeeDeptWise/${id}`
      );
      let data = await response.json();
      console.log(data, "data");
      if (data.status) {
        setEmployees(data.employees)

      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div>
      <Box p={5}>
        <Stack>
          <Button
            onClick={() => {
              setopen(true);
            }}
            w={200}
            colorScheme="teal"
          >
            Create Department
          </Button>
          {isOpen && (
            <Box w="50%" mt={4}>
              <HStack
                spacing={5}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FormControl>
                  <FormLabel color={"#002A53"}>Deaprtment Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    placeholder="Department name"
                    type="text"
                    width={"350px"}
                    height={"50px"}
                    border={"1px solid black"}
                  />
                </FormControl>
                {!isloading ? (
                  <Button
                    className="btn"
                    color={"white"}
                    onClick={handelsubmit}
                    colorScheme="linkedin"
                    marginTop={"50px"}
                    spinner={<BeatLoader size={8} color="white" />}
                  >
                    submit
                  </Button>
                ) : (
                  <Button
                    className="btn"
                    color={"white"}
                    onClick={handelsubmit}
                    colorScheme="linkedin"
                    marginTop={"50px"}
                    spinner={<BeatLoader size={8} color="white" />}
                    isLoading
                  >
                    submit
                  </Button>
                )}
              </HStack>
            </Box>
          )}

          <Box mt={5}>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Department Name</Th>
                    <Th>Total Employees</Th>
                    <Th> Action </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {depts
                    ? depts.map((item) => {
                        return (
                          <Tr>
                            <Td>{item.name}</Td>
                            <Td> <ViewIcon onClick={()=>{getEmployeesDeptwise(item.id)}} cursor={"pointer"}  /> </Td>
                            <Td>
                              <EditIcon
                                onClick={() => {
                                  handelEdit(item.name, item.id);
                                }}
                                cursor={"pointer"}
                                mx={4}
                                color={"green"}
                              />
                              <DeleteIcon
                                onClick={() => {
                                  handelDelete(item.id);
                                }}
                                cursor={"pointer"}
                                color={"red"}
                              />
                            </Td>
                          </Tr>
                        );
                      })
                    : "no data"}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

<Text as={"b"}  >Employees Department Wise</Text>
          <Box mt={5}>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th> Name</Th>
                    <Th>email</Th>
                    <Th>mobile</Th>
                    <Th>address</Th>

                  </Tr>
                </Thead>
                <Tbody>
                  {employeesDept
                    ? employeesDept.map((item) => {
                        return (
                          <Tr>
                            <Td>{item.name}</Td>
                            <Td> {item.email}</Td>
                            <Td> {item.mobile}</Td>
                            <Td> {item.addresses}</Td>



                          </Tr>
                        );
                      })
                    : "no data"}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

        </Stack>
      </Box>
    </div>
  );
};

export default Departments;
