import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import axios from "axios";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactsList.module.scss";
import Header from "../Header/Header";

function ContactsList() {
	const { state } = useContext(ContactContext);
	const { isLoading, contacts, error } = state;
	const [displayed, setDisplayed] = useState([]);

	const [checkedList, setCheckedList] = useState([]);
	const [checkButton, setCheckButton] = useState(false);
	const [deleteCheckedButton, setDeleteCheckedButton] = useState(false);

	useEffect(() => {
		setDisplayed(contacts);
	}, [contacts]);

	return (
		<div>
			<Header
				checkedList={checkedList}
				setCheckedList={setCheckedList}
				checkButton={checkButton}
				setCheckButton={setCheckButton}
				deleteCheckedButton={deleteCheckedButton}
				setDeleteCheckedButton={setDeleteCheckedButton}
				setDisplayed={setDisplayed}
			/>
			<div className="container">
				<div className={styles.contactsList}>
					{isLoading ? (
						<div className={styles.loading}>...loading</div>
					) : error ? (
						<div className={styles.error}>{error}</div>
					) : (
						<div>
							{!displayed.length ? (
								<div className={styles.noItem}>مخاطبی یافت نشد</div>
							) : (
								displayed.map((contact) => (
									<ContactItem
										key={contact.id}
										contact={contact}
										checkedList={checkedList}
										setCheckedList={setCheckedList}
										checkButton={checkButton}
									/>
								))
							)}
						</div>
					)}
				</div>

				{!!checkedList.length && checkButton && (
					<button
						onClick={() => setDeleteCheckedButton(true)}
						className={styles.deleteAll}
					>
						حذف همه
					</button>
				)}
			</div>
		</div>
	);
}

export default ContactsList;
