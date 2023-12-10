import {
  Box,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  Avatar,
  Icon,
  Image,
} from "@chakra-ui/react";
import { BsBell } from "react-icons/bs";
// import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Navbar() {
  return (
    <div  style={{height: "14vh"
}}>
      <Flex
        gap={{ base: "1rem", sm: "2rem", md: "4rem", lg: "5.5rem" }}
        justifyContent="space-between"
      >
        <Box boxSize="100px" mt="1rem" ml="2rem" bg="white">
          <Image src="vite.svg" alt="Logo" />
        </Box>
        {/* <Spacer w="2rem"/> */}
        <Flex
          as="nav"
          p="10px"
          bg="blue.900"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          w={{ base: "100%" }}
        >
          <Heading as="h1" color="white">
            Dashboard
          </Heading>
          {/* <Spacer/> */}

        </Flex>
      </Flex>
    </div>
  );
}
{
  /* <Icon as={ChevronDownIcon} /> */
}
