
import { Navigate, Outlet } from 'react-router-dom';

const EmployeeProtected = () => {
  const user  = JSON.parse(localStorage.getItem("user"))?.role

  if (user !== "employee") {
    // user is not authenticated
    return <Navigate to="/" replace="true" />;
  }
  return <Outlet />;
};

export default EmployeeProtected;
