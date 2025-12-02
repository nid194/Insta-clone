import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { store } from './component/Redux/Store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <Provider store = {store}>
       <App />
     </Provider>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);


