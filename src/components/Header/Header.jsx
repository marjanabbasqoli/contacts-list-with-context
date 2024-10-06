import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./Header.module.scss";
import ContactsChecked from "../ContactsChecked/ContactsChecked";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";
import Search from "../Search/Search";

function Header({
	checkedList,
	setCheckedList,
	setCheckButton,
	checkButton,
	deleteCheckedButton,
	setDeleteCheckedButton,
	setDisplayed,
}) {
	const [addButton, setAddButton] = useState(false);

	return (
		<>
			<div className={styles.bg}>
				<div className="container">
					<div className={styles.flexBox}>
						<h1>لیست مخاطبین</h1>

						<div className={styles.leftBox}>
							<Search setDisplayed={setDisplayed} />

							<div className={styles.buttonsWrap}>
								<button onClick={() => setAddButton(true)}>
									<FaUserPlus />
								</button>

								<button
									onClick={() => {
										setCheckButton((checkButton) => !checkButton);
										!checkButton && setCheckedList([]);
									}}
								>
									<FaUserMinus />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

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
