import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { ContactContext } from "../../context/ContactContext";
import { BASE_URL } from "../../constansts/Inputs";

import styles from "./Search.module.scss";

function Search() {
	const [search, setSearch] = useState("");
	const [contactsData, setContactsData] = useState([]);

	const {
		state: { contacts },
		dispatch,
	} = useContext(ContactContext);

	useEffect(() => {
		axios
			.get(BASE_URL)
			.then((res) => setContactsData(res.data))
			.catch((error) => console.log(error));
	}, [contacts]);

	return (
		<input
			type="search"
			onKeyUp={() =>
				dispatch({
					type: "SEARCH",
					payload: { search: search.toLowerCase().trim(), data: contactsData },
				})
			}
			placeholder="جستجو ..."
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			className={styles.search}
		/>
	);
}

export default Search;
