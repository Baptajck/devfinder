import s from './Header.module.scss';

import SwitchTheme from '../../components/SwitchTheme/SwitchTheme';

const Header = () => {
	return (
		<div className={s.header}>
			<h1 className={s.title}>devfinder</h1>
			<SwitchTheme />
		</div>
	);
};

export default Header;
