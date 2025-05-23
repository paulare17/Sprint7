import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './stores/store.ts';



createRoot(document.getElementById('root')!).render(
<StrictMode>
  {/* <Provider store={store}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  {/* </Provider> */}
</StrictMode>

)
