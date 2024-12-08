
import './App.css';
import {AppRouter} from './config/appRouter';
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Provider } from 'react-redux';
import store from './redux/redux';

function App() {
 return(

   <Provider store={store}>
    <PrimeReactProvider >
    <AppRouter />
  </PrimeReactProvider>
   </Provider>
 
)
}


export default App;
