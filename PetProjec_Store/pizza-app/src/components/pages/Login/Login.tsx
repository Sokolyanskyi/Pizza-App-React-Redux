import Headling from '../../Headling/Headling.tsx';
import Input from '../../Input/Input.tsx';
import Button from '../../Button/Button.tsx';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import {FormEvent} from 'react';

export function Login() {
	const submit = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
	};
	return <div className={styles['login']} onSubmit={submit}>
		<Headling> Login </Headling>
		<form className={styles['form']}>
			<div className={styles['field']}>
				<label htmlFor="email">Email</label>
				<Input id='email' type='email' placeholder={'Email'}/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<Input id='password' type='password' placeholder={'password'}/>
			</div>
			<Button appearance='big'>Login</Button>
		</form>
		<div className={styles['links']}>
			<div>No registration?</div>
			<Link to={'/auth/register'}>Registration</Link>
		</div>

	</div>;
}