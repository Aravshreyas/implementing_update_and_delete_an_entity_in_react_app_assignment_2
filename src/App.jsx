import ItemList from "./components/ItemList";

// use the following link to get the data
// `/doors` will give you all the doors.
const API_URI = `http://localhost:8000/doors`;

function App() {
  return <ItemList apiUri={API_URI} />;
}

export default App;
