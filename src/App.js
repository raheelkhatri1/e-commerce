import logo from './logo.svg';
import './App.css';
import { Route,RouterProvider } from 'react-router-dom';
import Router from './config/appRouter';
import {AppRouter} from './config/appRouter';
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
 return(

   <PrimeReactProvider >
    <AppRouter />
  </PrimeReactProvider>
 
)
}


export default App;

// import { AppRouter } from "./config/appRouter";
// import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import './App.css'

// function App() {
//   return (
//     <PrimeReactProvider>
//       <AppRouter />
//     </PrimeReactProvider>
//   );
// }

// export default App;
