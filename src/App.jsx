import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import From from './components/From'
import Template1 from './components/Template1'
import Template2 from './components/Template2'
import Template3 from './components/Template3'
import TemplatePreview from './components/TemplatePreview'
import Template4 from './components/Template4'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <From />,
    },
    {
      path: "/template1",
      element: <Template1 />,
    },
    {
      path: "/template2",
      element: <Template2 />,
    },
    {
      path: "/template3",
      element: <Template3 />,
    },
    {
      path: "/template4",
      element: <Template4 />,
    },
    {
      path: "/resumePreview",
      element: <TemplatePreview />,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
