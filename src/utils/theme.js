export function setTheme(themeName) {
	localStorage.setItem('devFinder-baptjack-theme', themeName);
	document.documentElement.className = themeName;
}

export function keepTheme() {
	if (localStorage.getItem('devFinder-baptjack-theme')) {
		localStorage.getItem('devFinder-baptjack-theme') === 'theme-light'
			? setTheme('theme-light')
			: setTheme('theme-dark');
	} else {
		setTheme('theme-light');
	}
}
