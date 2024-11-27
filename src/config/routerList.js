
import Home from '../layout/home/index'
import ProductDetail from '../layout/productDetail';


export const routeList = [
    {
        path: "/",
        Element: Home,
      },
      {
        path: "/product/:id",
        Element: ProductDetail,
      }
];

// import Home from "../layout/home/index";


// export const routeList = [
//   {
//     path: "/",
//     Element: Home,
//   },
// ];