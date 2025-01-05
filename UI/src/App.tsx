import './App.css'
import { createBrowserRouter, /*RouterProvider,*/ Outlet, RouterProvider } from 'react-router-dom';

import NAV from './components/nav/nav-component';
import RegisterForm from './components/register_form/registerform_component';
import GetTokenForm from './components/get_token/get_token_form';
import LookMyUser from './components/lookmyuser/look_my_user';
import LookAllUsers from './components/look_all_users/look_all_users';

const router_one = createBrowserRouter([
  {
    path:"/",
    element:(
      <>
        <NAV />
        <Outlet/>
      </>),
    errorElement: <h1>Error 404</h1>,
    children:[
      {path:"/", element: <RegisterForm/>},
      {path:"/get_token", element: <GetTokenForm />},
      {path:"/look_my_user", element: <LookMyUser />},
      {path:"/look_all_users", element: <LookAllUsers />},
    ]
  }
]);

function App() {
  return <RouterProvider router={router_one}/>;
}

export default App
