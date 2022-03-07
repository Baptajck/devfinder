import { useEffect } from 'react';
import s from './App.module.scss';

import { keepTheme } from '../../utils/theme';
import { ThemeProvider } from '../../context/ThemeContext';

import Header from '../../layouts/Header/Header';
import Home from '../../layouts/Home/Home';

function App() {
	useEffect(() => {
		keepTheme();
	}, []);

	return (
		<div className={s.app}>
			<ThemeProvider>
				<Header />
				<Home />
			</ThemeProvider>
		</div>
	);
}

export default App;
