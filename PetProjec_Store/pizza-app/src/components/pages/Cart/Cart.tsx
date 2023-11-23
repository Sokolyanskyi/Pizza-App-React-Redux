import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import {PREFIX} from "../../../helpers/API.ts";
import {cartActions} from "../../../../store/cart.slice.ts";
import Button from "../../Button/Button.tsx";
import Headling from "../../Headling/Headling.tsx";
import {AppDispatch, RootState} from "../../../../store/store.ts";
import CartItem from "../../CartItem/CartItem.tsx";
import {Product} from "../../../interfaces/product.interface.ts";

const DELIVERY_FEE = 70;

export function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const total = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);


	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return <>
		<Headling className={styles['headling']}>Cart</Headling>
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
		<div className={styles['line']}>
			<div className={styles['text']}>Total</div>
			<div className={styles['price']}>{total}&nbsp;<span>₴</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Delivery</div>
			<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₴</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Total <span className={styles['total-count']}>({items.length})</span></div>
			<div className={styles['price']}>{total + DELIVERY_FEE}&nbsp;<span>₴</span></div>
		</div>
		<div className={styles['checkout']}>
			<Button appearance="big" onClick={checkout}>Check out</Button>
		</div>
	</>;
}