import Button from './components/Button/Button.tsx';
import Input from './components/Input/Input.tsx';
import {Route, Routes} from 'react-router-dom';
import {Menu} from './components/pages/Menu/Menu.tsx';
import {Cart} from './components/pages/Cart/Cart.tsx';
import {Error} from './components/pages/Error/ErrorPage.tsx';

function App() {

	return (
		<>
			<Button>Button</Button>
			<Button appearance='big'>Button</Button>
			<Input placeholder='Email'/>
			<div>
				<a href="/">Menu</a>
				<a href="/cart">Bin</a>
			</div>
			<Routes>
				<Route path='/' element={<Menu/>}/>
				<Route path='/cart' element={<Cart/>}/>
				<Route path='*' element={<Error/>}/>
			</Routes>
		</>
	);
}

export default App;
