import { FaCheck, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import styles from "./ContactItem.module.scss";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import ContactForm from "../ContactForm/ContactForm";
import Confirm from "../Confirm/Confirm";

function ContactItem({
	contact: { id, name, email },
	checkedList,
	setCheckedList,
	checkButton,
}) {
	const { dispatch } = useContext(ContactContext);
	const [checked, setChecked] = useState(false);
	const [addButton, setAddButton] = useState(false);
	const [deleteButton, setDeleteButton] = useState(false);

	const changeHandler = (e, id) => {
		if (e.target.checked) {
			setCheckedList([...checkedList, id]);
		} else {
			const newList = checkedList.filter((c) => c !== id);
			setCheckedList(newList);
		}
		setChecked(e.target.checked);
	};

	const confirmHandler = (confirm) => {
		confirm && dispatch({ type: "DELETE", payload: id });
		setDeleteButton(false);
	};

	useEffect(() => {
		!checkButton && setChecked(false);
	}, [checkButton]);

	return (
		<>
			<div className={styles.checkboxWrapper}>
				<div className={`${styles.checkbox} ${checkButton ? styles.show : null}`}>
					<input
						type="checkbox"
						onChange={(e) => changeHandler(e, id)}
						checked={checked}
					/>
					<div>
						<FaCheck />
					</div>
				</div>
				<div className={styles.oneItem}>
					<div className={styles.rightBox}>
						<div className={styles.userInfo}>
							<figure>{name.split("")[0]}</figure>
							<div>
								<h3>{name}</h3>
								<div className={`ubuntu ${styles.email}`}>{email}</div>
							</div>
						</div>
					</div>
					{
						<div className={styles.buttons}>
							<button onClick={() => setAddButton(true)}>
								<FaRegPenToSquare />
							</button>
							<button
								style={{ color: "#e40012" }}
								// onClick={() => dispatch({ type: "DELETE", payload: id })}
								onClick={() => setDeleteButton(true)}
							>
								<FaRegTrashCan />
							</button>
						</div>
					}
				</div>
			</div>

			{addButton && (
				<ContactForm type="edit" setAddButton={setAddButton} id={id} />
			)}

			{deleteButton && (
				<Confirm title="آیا مخاطب حذف شود؟" confirmHandler={confirmHandler} />
			)}
		</>
	);
}

export default ContactItem;
