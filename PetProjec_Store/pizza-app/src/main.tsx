import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, defer, RouterProvider} from 'react-router-dom';
import {Cart} from './components/pages/Cart/Cart.tsx';
import {Error} from './components/pages/Error/ErrorPage.tsx';
import {Layout} from './layout/layout/Layout.tsx';
import {Product} from './components/pages/Product/Product.tsx';
import axios from 'axios';
import {PREFIX} from './helpers/API.ts';
import {AuthLayout} from './layout/Auth/AuthLayout.tsx';
import {Login} from './components/pages/Login/Login.tsx';
import {Register} from './components/pages/Register/Register.tsx';

const Menu = lazy(() => import('./components/pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Download...</>}><Menu/></Suspense>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Error</>,
				loader: async ({params}) => {
					return defer({data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)});

				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
			}
		]

	},

	{
		path: '*',
		element: <Error/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>


		<RouterProvider router={router}/>
	</React.StrictMode>
);

export default Menu;