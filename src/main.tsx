import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './App'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
// @ts-ignore
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
