import { useState, useEffect } from 'react';
import s from './Home.module.scss';

import SearchIcon from '../../assets/svg/icon-search.svg?component';
import LocationIcon from '../../assets/svg/icon-location.svg?component';
import WebsiteIcon from '../../assets/svg/icon-website.svg?component';
import TwitterIcon from '../../assets/svg/icon-twitter.svg?component';
import AnonymeIcon from '../../assets/svg/icon-anonyme.svg?component';
import CompanyIcon from '../../assets/svg/icon-company.svg?component';

const Home = () => {
	const [search, setSearch] = useState('octocat');
	const [user, setUser] = useState({ created_at: new Date() });

	const networks = [
		{
			name: 'location',
			Icon: LocationIcon,
		},
		{
			name: 'blog',
			Icon: WebsiteIcon,
		},
		{
			name: 'twitter_username',
			Icon: TwitterIcon,
		},
		{
			name: 'company',
			Icon: CompanyIcon,
		},
	];

	useEffect(() => {
		handleSubmit();
	}, []);

	const handleSubmit = async () => {
		try {
			const data = await fetch(`https://api.github.com/users/${search}`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
				},
			});
			console.log(data);
			if (data.status === 200) {
				const user = await data.json();
				setUser(user);
				setSearch('');
			} else {
				setUser({});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const dataFormat = date => {
		return new Intl.DateTimeFormat('en', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		})
			.format(new Date(date))
			.split(',')
			.join('');
	};

	return (
		<div className={s.home}>
			<form
				className={s.search}
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<span className={s.searchIcon}>
					<SearchIcon />
				</span>
				<input
					type='search'
					placeholder='Search Github username...'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className={s.searchInput}
				/>
				<button type='submit' className={s.searchButton}>
					Search
				</button>
			</form>

			<div className={s.card}>
				<div className={s.cardHeader}>
					{user.avatar_url ? (
						<img src={user.avatar_url} alt='avatar' className={s.avatar} />
					) : (
						<span className={s.anonymeIcon}>
							<AnonymeIcon />
						</span>
					)}
					<div className={s.info}>
						<h2 className={s.name}>
							{user.name ? (
								user.name
							) : (
								<span className={s.notAvailable}>Not Available</span>
							)}
						</h2>
						<p className={s.username}>
							<a href={`https://github.com/${user.login}`} className={s.link}>
								{user.login ? `@${user.login}` : 'Not Available'}
							</a>
						</p>
						{user.created_at && (
							<p>
								Joined{' '}
								<time dateTime={user?.created_at} className={s.date}>
									{user?.created_at && dataFormat(user?.created_at)}
								</time>
							</p>
						)}
					</div>
				</div>
				<div className={s.infosDesktop}>
					<div className={s.infos}>
						<p className={s.bio}>
							{user.bio ? (
								user.bio
							) : (
								<span className={s.notAvailable}>This profile has no bio</span>
							)}
						</p>
					</div>
					<div className={s.accountDetails}>
						<p className={s.info}>
							repos <span>{user.public_repos ? user.public_repos : 0}</span>
						</p>
						<p className={s.info}>
							followers <span>{user.followers ? user.followers : 0}</span>
						</p>
						<p className={s.info}>
							following <span>{user.following ? user.following : 0}</span>
						</p>
					</div>
					<div className={s.networks}>
						{networks.map(({ name, Icon }, i) => {
							return (
								<p
									key={i}
									className={`${s.network} ${
										!user[name] ? s.notAvailable : null
									}`}
								>
									<span className={s.networkIcon}>
										<Icon />
									</span>
									{name === 'blog' ? (
										<a href={user[name]} className={s.link}>
											{user[name] ? user[name] : 'Not Available'}
										</a>
									) : user[name] ? (
										user[name]
									) : (
										'Not Available'
									)}
								</p>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
