import Headling from '../../Headling/Headling.tsx';
import Search from '../../Search/Search.tsx';
import styles from './Menu.module.css';
import {Product} from '../../../interfaces/product.interface.ts';
import {ChangeEvent, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../../helpers/API.ts';
import {MenuList} from './MenuList/MenuList.tsx';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>()

	useEffect(() => {
		getMenu(filter)
	}, [filter]);


	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
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
	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
setFilter(e.target.value)
	}



	return <>
		<div className={styles['head']}>
			<Headling>Menu</Headling>
			<Search placeholder='
Enter the name of the dish or the ingredient' onChange={updateFilter}></Search>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length>0 && <MenuList products={products}/>}
			{isLoading && <>Loader</>}
			{!isLoading && products.length===0 && <h1>Not found!</h1>}
		</div>
	</>;
}

export default Menu;
