import { Routes, Route, Navigate } from "react-router-dom";

import ProductItem from "../pages/ProductItem";
import ProductList from "../pages/ProductList";
import ErrorNotFound from "../pages/ErrorNotFound";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProductsAdmin from "../pages/ProductsAdmin";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  isAuth: boolean;
  redirectPath: string;
  children: JSX.Element;
}

interface ProtectedRouteForAdminProps {
  isAuth: boolean;
  isAdmin: boolean;
  redirectPath: string;
  children: JSX.Element;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { isAuth, redirectPath, children } = props;

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const ProtectedRouteForAdmin = (props: ProtectedRouteForAdminProps) => {
  const { isAuth, isAdmin, redirectPath, children } = props;

  if (!isAuth || !isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const Navigation = () => {
  const { isAuth, isAdmin } = useAppSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductItem />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute isAuth={isAuth} redirectPath="/login">
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRouteForAdmin
            isAuth={isAuth}
            isAdmin={isAdmin}
            redirectPath="/"
          >
            <ProductsAdmin />
          </ProtectedRouteForAdmin>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute isAuth={!isAuth} redirectPath="/">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isAuth={!isAuth} redirectPath="/">
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
};

export default Navigation;
