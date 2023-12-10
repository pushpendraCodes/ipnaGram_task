import React, { useState } from "react";
import { ChakraProvider, Box, Button, Stack, Text } from "@chakra-ui/react";

const Pagination = ({
  page,
  handelpagination,
  itemPerPage,
  totalItems,
  handelprev,
  handelnext,
}) => {
  return (
    <Stack mt={5} direction="row" justifyContent={"space-between"} spacing={2}>
      <Button
        onClick={() => {
          handelprev();
        }}
        ml={5}
        colorScheme="facebook"
      >
        Prev
      </Button>

      <Box>

      {
        totalItems &&<Text>
          Showing <span>{itemPerPage * (page - 1) + 1}</span> to{" "}
          <span>
            {itemPerPage > totalItems ? totalItems : page * itemPerPage}
          </span>{" "}
          of <span>{totalItems}</span> results
        </Text>
      }

      </Box>
      <Button
       onClick={handelnext}
        colorScheme="facebook"
        mr={5}
        // disabled={true}

      >
        Next
      </Button>
    </Stack>
  );
};
export default Pagination;
