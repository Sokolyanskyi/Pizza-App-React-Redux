import {Link, Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';

export function Layout() {
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="avatar"/>

				<div className={styles['name']}>Yaroslav Sokolianskiy</div>
				<div className={styles['email']}>9riksok@gmail.com</div>
			</div>
			<div className={styles['menu']}>

				<Link to="/" className={styles['link']}>
					<img src="/menu-icon.svg" alt="menu-icon"/>
					Menu</Link>
				<Link to="/cart" className={styles['link']}>
					<img src="/cart-icon.svg" alt="cart-icon"/>
					Bin</Link>
			</div>
			<Button className={styles['exit']}>
				<img src="/exit-icon.svg" alt="exit-icon"/>
				Exit
			</Button>
		</div>
		<div>
			<Outlet/>
		</div>
	</div>;
}