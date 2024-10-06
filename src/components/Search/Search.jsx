import { useContext, useState } from "react";

import { ContactContext } from "../../context/ContactContext";

import styles from "./Search.module.scss";

function Search({ setDisplayed }) {
	const [search, setSearch] = useState("");
	const {
		state: { contacts },
	} = useContext(ContactContext);

	const searchHanlder = () => {
		const searchedContacts = contacts.filter(
			(contact) =>
				contact.name.toLowerCase().trim().includes(search) ||
				contact.email.toLowerCase().trim().includes(search)
		);

		setDisplayed(searchedContacts);
	};

	return (
		<input
			type="search"
			onKeyUp={searchHanlder}
			placeholder="جستجو ..."
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			className={styles.search}
		/>
	);
}

export default Search;
