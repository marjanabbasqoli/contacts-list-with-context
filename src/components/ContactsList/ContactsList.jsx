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

	useEffect(() => {
		axios
			.get("http://localhost:3000/contacts")
			.then((res) => dispatch({ type: "SUCCESS", payload: res.data }))
			.catch((error) => dispatch({ type: "FAILED", payload: error.message }));
	}, []);

	// console.log(contacts);

	return (
		<div>
			<Header />
			<div className="container">
				<div className={styles.contactsList}>
					{isLoading ? (
						<div>...loading</div>
					) : error ? (
						<div>{error}</div>
					) : (
						<div>
							{!contacts.length ? (
								<div className={styles.noItem}>مخاطبی یافت نشد</div>
							) : (
								contacts.map((contact) => (
									<ContactItem key={contact.id} contact={contact} />
								))
							)}
						</div>
					)}
				</div>
			</div>

			<button
				onClick={() =>
					dispatch({ type: "DELETE_CHECKED", payload: ["101220", "111507"] })
				}
			>
				delete checked
			</button>
		</div>
	);
}

export default ContactsList;
