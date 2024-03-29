import React from 'react';
import { useWindowWidth } from '@react-hook/window-size'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Card } from 'semantic-ui-react';
import chatImage from '../../assets/chat.png';
import setsImage from '../../assets/sets.png';
import companiesImage from '../../assets/companies.jpg';
import styles from './styles.module.sass';

const HomePage = () => {
	const screenWidth = useWindowWidth();

	const getCardsPerRow = () => {
		if (screenWidth <= 650) {
			return 1;
		}
		if (screenWidth <= 1000) {
			return 2;
		}
		return 3;
	}

	return (
		<div className={styles.home_container}>
			<Link to="/companies">
				<div className={styles.main_options}>
					<div className={`${styles.glow_on_hover} ${styles.search_btn}`}>Search Companies</div>
				</div>
			</Link>
			<Card.Group itemsPerRow={getCardsPerRow()}>
				<Card color='red' href="/chats">
					<img src={chatImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Chats</Card.Header>
						<Card.Description>
							<ul className={styles.card_desctiption}>
								<li>Respond to user requests</li>
								<li>Communicate with company representatives</li>
								<li>View shared portfolios</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
				<Card color='orange' href="/projects">
					<img src={setsImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Projects</Card.Header>
						<Card.Description>
							<ul className={styles.card_desctiption}>
								<li>Explore numerous projects</li>
								<li>Look for inspiration or contact companies for details</li>
								<li>All projects gathered in one place</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
				<Card color='yellow' href="/user/companies">
					<img src={companiesImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Own Companies</Card.Header>
						<Card.Description>
							<ul className={styles.card_desctiption}>
								<li>Manage your companies</li>
								<li>Group company&apos;s projects and share them</li>
								<li>Communicate with potential customers</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
			</Card.Group>
		</div>
	);
}


export default HomePage;