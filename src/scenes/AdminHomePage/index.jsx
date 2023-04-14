import React from 'react';
import { useWindowWidth } from '@react-hook/window-size'
import { Card } from 'semantic-ui-react';
import chatImage from '../../assets/chat.png';
import setsImage from '../../assets/sets.png';
import companiesImage from '../../assets/companies.jpg';
import styles from './styles.module.sass';

const AdminHomePage = () => {
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
			<Card.Group itemsPerRow={getCardsPerRow()}>
				<Card color='red' href="/admin/companies">
					<img src={companiesImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Companies</Card.Header>
					</Card.Content>
				</Card>
				<Card color='orange' href="/admin/requests">
					<img src={setsImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Requests</Card.Header>
					</Card.Content>
				</Card>
				<Card color='yellow' href="/admin/users">
					<img src={chatImage} className={styles.card_image} />
					<Card.Content>
						<Card.Header>Users</Card.Header>
					</Card.Content>
				</Card>
			</Card.Group>
		</div>
	);
}


export default AdminHomePage;