import Headling from '../../Headling/Headling.tsx';
import Search from '../../Search/Search.tsx';
import styles from './Menu.module.css';
import ProductCard from '../../ProductCard/ProductCard.tsx';

export function Menu() {
	return <>
		<div className={styles['head']}>
			<Headling>Menu</Headling>
			<Search placeholder='
Enter the name of the dish or the ingredient'></Search>
		</div>
		<div>
			<ProductCard id={1}
						 title={'Enjoy'}
						 price={300}
						 description={'Salyami, rukkola, tomato, olivia'}
						 image='/product-demo.png'
						 rating={4.5}/>
		</div>
	</>;
}