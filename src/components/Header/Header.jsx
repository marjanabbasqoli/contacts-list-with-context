import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./Header.module.scss";

function Header() {
	const { dispatch } = useContext(ContactContext);
	const [addButton, setAddButton] = useState(false);
	return (
		<>
			<button
				// onClick={() =>
				// 	dispatch({
				// 		type: "ADD",
				// 		payload: {
				// 			id: Math.ceil(Math.random() * 10000 * (Math.random() * 24)).toFixed(),
				// 			name: "test",
				// 			email: "twew@nn.co",
				// 		},
				// 	})
				// }
				onClick={() => setAddButton(true)}
			>
				add
			</button>

			{addButton && <ContactForm type="add" setAddButton={setAddButton} />}
		</>
	);
}

export default Header;
