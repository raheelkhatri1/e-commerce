// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   createRoutesFromElements,
//   Route,
//   Link,
// } from "react-router-dom";
// import { routerList } from "./routerList";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       {routerList.map(({Path,Element},i)=>{
//           return<Route path={Path} element={<Element />} />
//         })
//       }
//     </Route>
//     )
// );
// const AppRouter = () => {
//   return(
//     <div><RouterProvider router={router} /> </div>
//   )
// }
// export default AppRouter

import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import  {routeList}  from "./routerList";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {routeList.map(({path,Element},i)=>{
        return <Route path={path} element={<Element />} />
      })}
    </Route>
  )
);
export const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};