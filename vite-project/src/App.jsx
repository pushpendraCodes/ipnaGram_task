import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./component/Login";
import RootLayout from "./layout/RootLayout";
import Employee from "./component/Admin/Employee";
import EmployeeDashboard from "./component/Employee/Employee";
import Departments from "./component/Admin/Departments";
import Signup from "./component/Signup";
import ManagerProtected from "./component/Protecetd/ManagerProtected";
import EmployeeProtected from "./component/Protecetd/EmployeeProtected";
import Dashboard from "./component/Dashboard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<RootLayout />}>
        <Route
          path="dashboard"
          element={<ManagerProtected element={<Dashboard />} />}
        >
          <Route path="employee" element={<Employee />} />
          <Route path="department" element={<Departments />} />
        </Route>

        <Route
          path="dashboard"
          element={<EmployeeProtected element={<EmployeeDashboard />} />}
        >
          <Route
            path="employeeDashboard"
            element={<EmployeeDashboard />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
