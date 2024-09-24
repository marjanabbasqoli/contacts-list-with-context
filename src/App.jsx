import ContactsList from "./components/ContactsList/ContactsList";
import ContactProvider from "./context/ContactContext";

function App() {
	return (
		<ContactProvider>
			<ContactsList />
		</ContactProvider>
	);
}

export default App;
