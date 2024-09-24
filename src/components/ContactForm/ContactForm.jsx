import { FaCircleXmark } from "react-icons/fa6";
import { Inputs } from "../../constansts/Inputs";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import styles from "./ContactForm.module.scss";
import Confirm from "../Confirm/Confirm";
import { toast } from "react-toastify";

const validEmailRegex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const validPhoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
const formField = {
	name: "",
	email: "",
	phone: "",
	job: "",
};

function ContactForm({ type, id, setAddButton }) {
	const {
		state: { contacts },
		dispatch,
	} = useContext(ContactContext);

	const [form, setForm] = useState(
		type === "add"
			? { ...formField, isChecked: false }
			: contacts.find((contact) => contact.id === id)
	);

	const [message, setMessage] = useState({ ...formField });
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirm, setConfrim] = useState(false);
	const [isValidate, setIsValidate] = useState(false);

	useEffect(() => {
		checkFormValidation();
	}, [form]);

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm((form) => ({ ...form, [name]: value }));
		inputValidation(name, value, message, setMessage);
	};

	const inputValidation = (name, value, message, setMessage) => {
		name !== "job" &&
			setMessage({
				...message,
				[name]: !value ? "این فیلد نباید خالی باشد" : "",
			});

		const isExist =
			name === "name" && value && contacts.find((c) => c.name === value);
		isExist && setMessage({ ...message, name: "این نام قبلا اضافه شده است" });

		const validEmail = name === "email" && value && !value.match(validEmailRegex);
		validEmail &&
			setMessage({ ...message, email: "لطفا یک ایمیل معتبر وارد کنید" });

		const validPhone = name === "phone" && value && !value.match(validPhoneRegex);
		validPhone &&
			setMessage({ ...message, phone: "لطفا یک شماره تلفن معتبر وارد نمایید" });
	};

	const checkFormValidation = () => {
		const isEmpty = Object.values(form).splice(0, 3).includes("");
		const isExist = contacts.find((c) => c.name === form.name);
		setIsValidate(
			!(
				isExist ||
				isEmpty ||
				!form.email.match(validEmailRegex) ||
				!form.phone.match(validPhoneRegex)
			)
				? true
				: false
		);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setShowConfirm(true);
	};

	const confirmHandler = (confirm) => {
		confirm && CUList(type);
		setShowConfirm(false);
		setAddButton(false);
	};

	const CUList = (type) => {
		if (isValidate) {
			if (type === "add") {
				dispatch({
					type: "ADD",
					payload: {
						id: Math.ceil(Math.random() * 10000 * (Math.random() * 24)).toFixed(),
						...form,
					},
				});
				toast.success("مخاطب با موفقیت افزوده شد");
			} else {
				dispatch({
					type: "EDIT",
					payload: form,
				});
				toast.success("مخاطب با موفقیت ویرایش شد");
			}
		}
	};

	return (
		<div className={styles.modal}>
			<div className={styles.container}>
				<button className={styles.close} onClick={() => setAddButton(false)}>
					<FaCircleXmark />
				</button>

				<form onSubmit={submitHandler}>
					{Inputs.map((input, index) => (
						<div className={styles.inputWrap} key={index}>
							<input
								type={input.type}
								name={input.name}
								placeholder={input.placeholder}
								value={form[input.name]}
								onChange={changeHandler}
								className={styles.input}
							/>
							<div className={styles.message}>{message[input.name]}</div>
						</div>
					))}

					<button
						type="submit"
						className={`${styles.submit} ${!isValidate ? styles.disabled : null}`}
					>
						افزودن
					</button>
				</form>
			</div>

			{showConfirm && (
				<Confirm
					confirmHandler={confirmHandler}
					title={
						type === "add"
							? "مخاطب به لیست اضافه شود؟"
							: "آیا اطلاعات مخاطب ویرایش شود؟"
					}
				/>
			)}
		</div>
	);
}

export default ContactForm;
