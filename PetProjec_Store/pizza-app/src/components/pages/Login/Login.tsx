import Headling from '../../Headling/Headling.tsx';
import Input from '../../Input/Input.tsx';
import Button from '../../Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import {FormEvent, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store.ts';
import {login, userActions} from '../../../../store/user.slice.ts';


export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string
	}
}

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState)=> s.user)


	useEffect(() => {
		if(jwt) {
			navigate('/')
		}

	}, [jwt, navigate])
	const sendLogin = async (email: string, password: string) => {
		dispatch(login({email, password}));

	};
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		await sendLogin(email.value, password.value);
	};
	return <div className={styles['login']}>
		<Headling> Login </Headling>
		{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
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