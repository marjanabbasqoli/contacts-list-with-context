import styles from "./Confirm.module.scss";

function Confirm({ confirmHandler, title }) {
	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div>{title}</div>
					<div className={styles.buttonsWrap}>
						<button onClick={() => confirmHandler(true)}>بله</button>
						<button onClick={() => confirmHandler(false)}>خیر</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Confirm;
