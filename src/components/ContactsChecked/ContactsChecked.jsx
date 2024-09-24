import { useContext, useState } from "react";
import Confirm from "../Confirm/Confirm";
import { ContactContext } from "../../context/ContactContext";
import { toast } from "react-toastify";

function ContactsChecked({
	checkedList,
	setCheckedList,
	setCheckButton,
	setDeleteCheckedButton,
}) {
	const { dispatch } = useContext(ContactContext);

	const confirmHandler = (confirm) => {
		if (confirm) {
			dispatch({ type: "DELETE_CHECKED", payload: checkedList });
			toast.success("عملیات با موفقیت انجام شد");
		}
		setCheckedList([]);
		setCheckButton(false);
		setDeleteCheckedButton(false);
	};

	return (
		<Confirm
			title={`آیا ${checkedList.length} مخاطب از لیست حذف شود؟`}
			confirmHandler={confirmHandler}
		/>
	);
}

export default ContactsChecked;
