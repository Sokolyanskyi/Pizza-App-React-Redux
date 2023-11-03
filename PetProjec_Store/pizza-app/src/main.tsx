import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Menu} from './components/pages/Menu/Menu.tsx';
import {Cart} from './components/pages/Cart/Cart.tsx';
import {Error} from './components/pages/Error/ErrorPage.tsx';
import {Layout} from './layout/layout/Layout.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/cart',
				element: <Cart/>
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
