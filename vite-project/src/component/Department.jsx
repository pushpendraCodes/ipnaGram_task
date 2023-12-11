import React from "react";
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
  TableCaption,
  TableContainer,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const Department = ({ item }) => {

async function getEmployees (id){
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
        let response = await fetch(`${apiUrl}/api/employee/getEmployeeDeptWise/${id}`,{

          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        });
        let data = await response.json();
        console.log(data,"data")
        if (data.status) {

        }
      } catch (error) {
        console.log(error, "error");
      }

}


  return (
    <>
      <Tr>
        <Td>{item.name}</Td>
        <Td>{getEmployees(item.id)}</Td>
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
    </>
  );
};

export default Department;
