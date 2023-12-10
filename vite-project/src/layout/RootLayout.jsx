import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Grid, GridItem, Flex, Box } from "@chakra-ui/react";
import Sidebar from "../component/Admin/Sidebar";

import "./layout.css"
function RootLayout() {
  //   const user_type = JSON.parse(localStorage.getItem("user"))?.user_type;
  // console.log(user_type, "user_type");
  return (
    <Grid templateColumns="1fr" templateRows="1fr auto">
      <GridItem as="main" colSpan={1}>
        <Navbar />
      </GridItem>
      <GridItem as="aside" colSpan={1}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 5fr" }}>
          <GridItem as="aside" colSpan={1}>
            {/* {user_type === "admin" && <SideBar />}
            {user_type === "teamMember" && <EmployeeSideBar />}
            {user_type === "teamLead" && <LeadSideBar />}
            {user_type === "teamHead" && <HeadSideBar />} */}
            <Sidebar />
          </GridItem>
          <GridItem

            style={{ maxHeight: "80VH",marginTop:"3rem", overflowY: "scroll" }}
            className="scrollbar"
            as="main"
            colSpan={1}
          >
            <Outlet />
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default RootLayout;
