import {Link, Outlet, useLocation} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import {useEffect} from 'react';
import cn from 'classnames';

cn;

export function Layout() {
	const location = useLocation();
	useEffect(() => {
		console.log(location);
	}, [location]);

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="avatar"/>

				<div className={styles['name']}>Yaroslav Sokolianskiy</div>
				<div className={styles['email']}>9riksok@gmail.com</div>
			</div>
			<div className={styles['menu']}>

				<Link to="/" className={cn(styles['link'], {
					[styles.active]: location.pathname === '/'
				})}>
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