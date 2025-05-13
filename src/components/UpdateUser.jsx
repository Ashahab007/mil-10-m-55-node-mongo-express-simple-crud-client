import React from "react";
import { data, useLoaderData } from "react-router";

const UpdateUser = () => {
  const updateUser = useLoaderData();
  console.log(updateUser);

  //   8.5 creating handleUpdate to get the data
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updateUserData = { name, email };
    console.log(updateUserData);

    // 8.7  send the data to the data base
    fetch(`http://localhost:3000/users/${updateUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After update", data); //now go to edit a user and update a data u will see the updated data in the server terminal

        // 8.11 in console from the upper data  we found some object where we use modifiedCount
        if (data.modifiedCount) {
          console.log("After update in data.data.modifiedCount", data); //in ui the updated data will be show after reload
        }
      });
  };
  return (
    <div>
      {/* 8.3 creating a form to update user */}
      <form onSubmit={handleUpdateUser}>
        {/* 8.4 here dynamic defaultValue is set */}
        <input type="text" name="name" defaultValue={updateUser.name} />
        <br />
        <input type="text" name="email" defaultValue={updateUser.email} />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default UpdateUser;
