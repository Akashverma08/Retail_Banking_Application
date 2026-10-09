
import { createRoot } from 'react-dom/client'
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer/>

    </Provider>

  </BrowserRouter>

)
