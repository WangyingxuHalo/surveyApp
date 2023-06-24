import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import "antd/dist/reset.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routerConfig}></RouterProvider>;
    </Suspense>
  );
}

export default App;
