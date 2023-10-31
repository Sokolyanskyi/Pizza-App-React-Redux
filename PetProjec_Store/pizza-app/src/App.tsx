import './App.css'
import Button from "./components/Button/Button.tsx";
import {useState} from "react";

function App() {
	const [counter, setCounter] = useState(0)
	setCounter(counter + 1)
	console.log(counter)
	return (
		<>
			<Button onClick={() => console.log('Hi')}>Button</Button>
		</>
	)
}

export default App
