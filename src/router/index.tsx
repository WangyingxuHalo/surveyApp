import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
// import Edit from "../pages/question/Edit";
// import Stat from "../pages/question/Stat";

const Edit = lazy(
  () => import(/* webpackChunkName: "editPage" */ "../pages/question/Edit")
);
const Stat = lazy(
  () => import(/* webpackChunkName: "statPage" */ "../pages/question/Stat")
);

const router = createBrowserRouter([
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      // 404 page
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

// ---------------- const ------------------

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const LIST_PATHNAME = "/manage/list";
export const STAR_PATHNAME = "/manage/star";
export const TRASH_PATHNAME = "/manage/trash";
export const QUESTION_EDIT_PATHNAME = "/question/edit";
export const QUESTION_STAT_PATHNAME = "/question/stat";

// is login page or register page
export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}

// can access without login
export function noNeedLogin(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
