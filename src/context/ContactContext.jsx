import { createContext, useReducer } from "react";
import axios from "axios";

import { BASE_URL } from "../constansts/Inputs";

export const ContactContext = createContext();

const initialState = {
	isLoading: true,
	contacts: [],
	error: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SUCCESS": {
			return { isLoading: false, contacts: action.payload, error: "" };
		}

		case "FAILED":
			return { isLoading: false, contacts: [], error: action.payload };

		case "ADD":
			axios
				.post(BASE_URL, action.payload)
				.catch((error) => console.log(error.message));
			return { ...state, contacts: [...state.contacts, action.payload] };

		case "EDIT":
			axios
				.put(`${BASE_URL}/${action.payload.id}`, action.payload)
				.catch((error) => console.log(error.message));
			const newContacts = state.contacts.map((contact) =>
				contact.id === action.payload.id ? action.payload : contact
			);
			return { ...state, contacts: [...newContacts] };

		case "DELETE":
			axios
				.delete(`${BASE_URL}/${action.payload}`)
				.catch((error) => console.log(error.message));
			const deletedContact = state.contacts.filter(
				(contact) => contact.id !== action.payload
			);
			return { ...state, contacts: [...deletedContact] };

		case "DELETE_CHECKED":
			axios
				.all(
					action.payload.map((endpoint) => axios.delete(`${BASE_URL}/${endpoint}`))
				)
				.catch((error) => console.log(error.message));

			const checkedContacts = state.contacts.filter(
				(c) => !action.payload.includes(c.id) && c
			);

			return { ...state, contacts: [...checkedContacts] };
		case "SEARCH":
			const { search, data } = action.payload;
			const searchedContacts = data.filter(
				(contact) =>
					contact.name.toLowerCase().trim().includes(search) ||
					contact.email.toLowerCase().trim().includes(search)
			);
			return {
				...state,
				contacts: [...searchedContacts],
			};
	}
};

function ContactProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ContactContext.Provider value={{ state, dispatch }}>
			{children}
		</ContactContext.Provider>
	);
}

export default ContactProvider;
