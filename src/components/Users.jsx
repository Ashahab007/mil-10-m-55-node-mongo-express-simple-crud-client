import React, { use, useState } from "react";
import { data, Link } from "react-router";

const Users = ({ userPromise }) => {
  // 5.4 get the data
  const initialUsers = use(userPromise);
  console.log(initialUsers);

  //   5.5 To show the data in ui take useState and set the initial value "initialUsers" because we want to hold the previous data
  const [users, setUsers] = useState(initialUsers);

  const handleAddUsers = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = {
      name,
      email,
    };
    console.log(newUser);

    // 4.0 After creating the form and handleAddUsers now sending the form data to the server
    fetch(
      "http://localhost:3000/users", //4.2 as we created the api path "/users" on 3000 port so we add the path to localhost:3000
      // 4.3 Created the object post method to send the data to server which is from the documentation "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch". Now from here initially if we fill the form we will get the data to the server terminal that the data is receiving from the client.
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data from the client", data);
        // 5.7 To solve 5.6 problem first we add insertedId to every newUser. This insertedId is comes from data.insertedId and set the data.insertedId in newUser._id because server by default set an id. Then copy the users with newUser. Now fill the form and see the added users.
        if (data.insertedId) {
          newUser._id = data.insertedId; //here _id is used because this is the server id pattern.
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          e.target.reset();
        }
      });
  };

  // 6.1 Delete an user, get the id
  const handleUserDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // 6.6 now to show the remaining users in ui apply deleteCount from the documentation
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }

        console.log("after delete data", data);
      });
  };
  return (
    <div>
      <div>Users: {users.length}</div>
      <form onSubmit={handleAddUsers}>
        <input type="text" name="name" />
        <br />
        <input type="text" name="email" />
        <br />
        <input type="submit" value="Add Users" />
      </form>
      {/* 5.6 showing data in the ui. but it shows the previous added data from the database. Now if u want to fill the form the data added to the server but not showing in the ui.*/}
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            {/* 7.2 created the details link in ui */}
            <Link to={`/users/${user._id}`}>Details</Link>
            {/* 8.0  my requirement is update the user information using put method. First created an edit button and update the user data using dynamic id*/}
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleUserDelete(user._id)}>X</button>
            {/*6.0 My requirement is delete an user upon delete*/}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
