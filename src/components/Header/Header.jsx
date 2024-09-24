import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./Header.module.scss";
import ContactsChecked from "../ContactsChecked/ContactsChecked";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";

function Header({
	checkedList,
	setCheckedList,
	setCheckButton,
	deleteCheckedButton,
	setDeleteCheckedButton,
}) {
	const [addButton, setAddButton] = useState(false);

	return (
		<>
			<div className={styles.bg}>
				<div className="container">
					<div className={styles.flexBox}>
						<h1>لیست مخاطبین</h1>

						<div className={styles.leftBox}>
							{/* <Search /> */}

							<div className={styles.buttonsWrap}>
								<button onClick={() => setAddButton(true)}>
									<FaUserPlus />
								</button>

								<button onClick={() => setCheckButton((checkButton) => !checkButton)}>
									<FaUserMinus />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <button onClick={() => setAddButton(true)}>add</button>
			<button
				// onClick={() =>
				// 	dispatch({ type: "DELETE_CHECKED", payload: ["101220", "111507"] })
				// }
				onClick={() => setCheckButton((checkButton) => !checkButton)}
			>
				delete checked
			</button> */}

			{addButton && <ContactForm type="add" setAddButton={setAddButton} />}
			{deleteCheckedButton && (
				<ContactsChecked
					checkedList={checkedList}
					setCheckedList={setCheckedList}
					setCheckButton={setCheckButton}
					setDeleteCheckedButton={setDeleteCheckedButton}
				/>
			)}
		</>
	);
}

export default Header;
