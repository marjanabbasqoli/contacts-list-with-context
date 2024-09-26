import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import axios from "axios";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactsList.module.scss";
import Header from "../Header/Header";

function ContactsList() {
	const {
		state: { isLoading, contacts, error },
		dispatch,
	} = useContext(ContactContext);

	const [checkedList, setCheckedList] = useState([]);
	const [checkButton, setCheckButton] = useState(false);
	const [deleteCheckedButton, setDeleteCheckedButton] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:3000/contacts")
			.then((res) => dispatch({ type: "SUCCESS", payload: res.data }))
			.catch((error) => dispatch({ type: "FAILED", payload: error.message }));
	}, []);

	return (
		<div>
			<Header
				checkedList={checkedList}
				setCheckedList={setCheckedList}
				checkButton={checkButton}
				setCheckButton={setCheckButton}
				deleteCheckedButton={deleteCheckedButton}
				setDeleteCheckedButton={setDeleteCheckedButton}
			/>
			<div className="container">
				<div className={styles.contactsList}>
					{isLoading ? (
						<div className={styles.loading}>...loading</div>
					) : error ? (
						<div className={styles.error}>{error}</div>
					) : (
						<div>
							{!contacts.length ? (
								<div className={styles.noItem}>مخاطبی یافت نشد</div>
							) : (
								contacts.map((contact) => (
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
