import "./App.css";
import Users from "./components/Users";

// 5.2 fetching the data from the server using this url 'http://localhost:3000/users'
const userPromise = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);

function App() {
  return (
    <>
      <h1>Simple CRUD Operation</h1>
      {/* 5.3 pass the promise */}
      <Users userPromise={userPromise}></Users>
    </>
  );
}

export default App;
