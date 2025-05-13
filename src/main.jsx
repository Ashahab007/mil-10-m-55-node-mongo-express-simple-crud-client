import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/layouts/Root.jsx";
import UserDetails from "./components/UserDetails.jsx";

// 7.0 My requirement is show the user details in another route i.e load a specific user. so setup the router first.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", Component: App },
      // 7.3 go to the dynamic route to show the details so used loader with server url with id
      {
        path: "/users/:id",
        Component: UserDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
