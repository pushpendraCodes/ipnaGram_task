
import { Navigate, Outlet } from 'react-router-dom';

const ManagerProtected = () => {
  const user  = JSON.parse(localStorage.getItem("user"))?.role

  if (user !== "manager") {
    // user is not authenticated
    return <Navigate to="/" replace="true" />;
  }
  return <Outlet />;
};

export default ManagerProtected;
