import Headling from '../../Headling/Headling.tsx';
import Search from '../../Search/Search.tsx';
import styles from './Menu.module.css';
import {Product} from '../../../interfaces/product.interface.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../../helpers/API.ts';
import {MenuList} from './MenuList/MenuList.tsx';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const getMenu = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);

		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}

			console.error(e);
			setIsLoading(false);
			return;
		}

	};
	useEffect(() => {
		getMenu();
	}, []);

	return <>
		<div className={styles['head']}>
			<Headling>Menu</Headling>
			<Search placeholder='
Enter the name of the dish or the ingredient'></Search>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products}/>}
			{isLoading && <>Loader</>}
		</div>
	</>;
}

export default Menu;
