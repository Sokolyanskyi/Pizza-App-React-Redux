import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';
import Button from "../../Button/Button.tsx";

export function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="pizza-img" />
			<div className={styles['text']}>Your order is success!</div>
			<Button appearance="big" onClick={() => navigate('/')}>Create new order</Button>
		</div>
	);
}