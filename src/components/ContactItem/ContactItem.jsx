import { FaCheck, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import styles from "./ContactItem.module.scss";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

function ContactItem({ contact: { id, name, email } }) {
	const { dispatch } = useContext(ContactContext);
	return (
		<>
			<div className={styles.checkboxWrapper}>
				<div className={`${styles.checkbox}`}>
					{/* <input
						type="checkbox"
						onChange={(e) => {
							dispatch({ type: "CHECKED", payload: { id, e } });
							// setChecked((checked) => !checked);
							// checked = e.target.checked;
							setCheckedCount((checkedCount) =>
								e.target.checked ? checkedCount + 1 : checkedCount - 1
							);
						}}
					/> */}

					{/* <div>
						<FaCheck />
					</div> */}
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
							<button
								onClick={() =>
									dispatch({
										type: "EDIT",
										payload: {
											id: "2358",
											name: "مرجان",
											email: "marjan@hdsd.com",
										},
									})
								}
							>
								<FaRegPenToSquare />
							</button>
							<button
								style={{ color: "#e40012" }}
								onClick={() => dispatch({ type: "DELETE", payload: id })}
							>
								<FaRegTrashCan />
							</button>
						</div>
					}
				</div>
			</div>
		</>
	);
}

export default ContactItem;
