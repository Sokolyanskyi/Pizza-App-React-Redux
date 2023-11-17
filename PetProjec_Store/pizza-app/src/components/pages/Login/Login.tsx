import Headling from '../../Headling/Headling.tsx';
import Input from '../../Input/Input.tsx';
import Button from '../../Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import {FormEvent, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../../helpers/API.ts';
import {LoginResponse} from '../../../interfaces/auth.interface.ts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store/store.ts';
import {userActions} from '../../../../store/user.slice.ts';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string
	}
}

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const sendLogin = async (email: string, password: string) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email, password
			});
			console.log(data);
			localStorage.setItem('jwt', data.access_token);
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		await sendLogin(email.value, password.value);
	};
	return <div className={styles['login']}>
		<Headling> Login </Headling>
		{error && <div className={styles['error']}>{error}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Email</label>
				<Input id='email' name='email' type='email' placeholder={'Email'}/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<Input id='password' name='password' type='password' placeholder={'password'}/>
			</div>
			<Button appearance='big'>Login</Button>
		</form>
		<div className={styles['links']}>
			<div>No registration?</div>
			<Link to={'/auth/register'}>Registration</Link>
		</div>

	</div>;
}