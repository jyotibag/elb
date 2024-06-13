import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Elb from "./pages";
import { store } from "./store";
import Landing from "./pages/Landing";

// Actions ------
import { action as loginAction } from "./pages/auth/Login";
import { action as registerAction } from "./pages/auth/Register";
import { action as forgotPasswordAction } from "./pages/auth/ForgotPassword";

// Loaders ------
import { loader as layoutLoader } from "./pages/Layout";
import { loader as adminLoader } from "./pages/LayoutAdmin";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "/sign-in",
    element: <Elb.Login />,
    errorElement: <Elb.Error />,
    action: loginAction,
  },
  {
    path: "/sign-up",
    element: <Elb.Register />,
    errorElement: <Elb.Error />,
    action: registerAction,
  },
  {
    path: "/forgot-password",
    element: <Elb.ForgotPassword />,
    errorElement: <Elb.Error />,
    action: forgotPasswordAction,
  },
  {
    path: "/reset-password/:email/:token",
    element: <Elb.ResetPassword />,
    errorElement: <Elb.Error />,
  },
  {
    element: <Elb.Layout />,
    errorElement: <Elb.Error />,
    loader: layoutLoader(store),
    children: [
      {
        path: "admin",
        element: <Elb.LayoutAdmin />,
        loader: adminLoader(store),
        children: [
          { path: "dashboard", element: <Elb.AdminDashboard /> },
          { path: "users", element: <Elb.UserList /> },
          { path: "users/:uuid", element: <Elb.UserView /> },
          { path: "masters/categories", element: <Elb.Categories /> },
          { path: "masters/brands", element: <Elb.Brands /> },
        ],
      },
      {
        path: ":slug",
        element: <Elb.LayoutUser />,
        children: [
          { path: "dashboard", element: <Elb.UserDashboard /> }
        ],
      },
      { path: "change-password", element: <Elb.ChangePassword /> },
      { path: "profile", element: <Elb.Profile /> },
      { path: "forbidden", element: <Elb.Forbidden /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
