import styles from "./Search.module.scss";

function Search() {
	const [search, setSearch] = useState("");
	const { dispatch } = useContext(ContactsContext);

	return (
		<input
			type="search"
			// onKeyUp={() =>
			// 	dispatch({ type: "SEARCH", payload: search.toLowerCase().trim() })
			// }
			placeholder="جستجو ..."
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			className={styles.search}
		/>
	);
}

export default Search;
