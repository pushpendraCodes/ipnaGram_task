import {
  List,
  ListItem,
  Box,
  Image,
  Container,
  ListIcon,
  Icon,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import { CiLogout,  } from "react-icons/ci";
import { FaUserInjured } from "react-icons/fa";
import "./sidebar.css";
import { FcDepartment } from "react-icons/fc";
export default function Sidebar() {
  const toast = useToast();
  const navigate = useNavigate();


  const handlelogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "You are logged out",
      description: "See you soon.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    navigate("/", { replace: true });
  };
  const user  = JSON.parse(localStorage.getItem("user"))?.role
  return (
    <div className="sidebar">
      {/* <Container> */}

      <List fontSize="1.2em" spacing={4} p="10px" mx="0.5rem">
        <ListItem
          className="listItem"
          p="10px"
          borderRadius="10px"

        >
          Dashboard
        </ListItem>

        <div className="sidebar-hideshow">
          <Divider borderWidth="1px" borderColor={"gray"} />

          {user=="manager" &&<>
          <ListItem className="listItem" p="10px" borderRadius="10px">
            <NavLink to="/dashboard/employee">
              <Button bg="gray.200" w="5px" mr="5px">
                <FaUserInjured />
              </Button>
              <Text as="span" pl="10px" fontSize="14px">
                Employee
              </Text>
            </NavLink>
          </ListItem>
          <ListItem className="listItem" p="10px" borderRadius="10px">
            <NavLink to="/dashboard/department">
              <Button bg="gray.200" w="5px" mr="5px">
                <FcDepartment />
              </Button>
              <Text as="span" pl="10px" fontSize="14px">
                Departments
              </Text>
            </NavLink>
          </ListItem>
          </>
          }


            {user=="employee" &&  <ListItem className="listItem" p="10px" borderRadius="10px">
            <NavLink to="dashboard/employeeDashboard">
              <Button bg="gray.200" w="5px" mr="5px">
                <FcDepartment />
              </Button>
              <Text as="span" pl="10px" fontSize="14px">
                Employee
              </Text>
            </NavLink>
          </ListItem>}


        </div>

        {/* code visible end */}
        <Divider borderWidth="1px" borderColor={"gray"} />

        <ListItem
          cursor={"pointer"}
          className="listItem"
          p="10px"
          borderRadius="10px"
          onClick={handlelogout}
        >
          <Button bg="gray.200" w="10px" mr="10px">
            <ListIcon as={CiLogout} ml="10px" />
          </Button>

          <Text as="span" pl="10px" fontSize="15px">
            Logout
          </Text>
        </ListItem>
      </List>

      {/* </Container> */}
    </div>
  );
}
