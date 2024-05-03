// Credit to ChatGPT for detailed explanations of firebase, assistance with code implementation, and code comments.
// Indicates that this component should only be used on the client-side.
"use client";

// Import necessary functions from the Firebase Firestore SDK to interact with the database.
import { addDoc, collection } from "firebase/firestore";
// Import useState hook from React to manage local state in the component.
import { useState } from "react";
// Import the Firestore database configuration from the firebaseConfig module.
import { db } from "./firebaseConfig";

// Define and export the TodoForm component as the default export of this module.
export default function TodoForm() {
  // useState hook to keep track of the title input by the user.
  const [title, setTitle] = useState("");
  // useState hook to keep track of the info input by the user.
  const [info, setInfo] = useState("");

  // Define an asynchronous function to add a new todo to the Firestore database.
  const addTodo = async (todo) => {
    // addDoc function to create a new document in the 'todos' collection of the Firestore.
    // Passes the todo object as data for the new document.
    const docRef = await addDoc(collection(db, "todos"), todo);
    // Log the document ID of the newly created todo.
    console.log("Document written with ID:", docRef.id);
  };

  // Define an asynchronous function to handle form submission.
  async function handleSubmit(e) {
    // Prevent the default form submission behavior.
    e.preventDefault();
    try {
      // Log the current title and info values to the console.
      console.log(title, info);
      // Call addTodo function with the current title and info as an object.
      await addTodo({ title, info });
      // Log successful addition to the console.
      console.log("Todo added successfully");
      // Reset the info and title states to empty strings to clear the form.
      setInfo("");
      setTitle("");
    } catch (error) {
      // Log any errors encountered during the form submission.
      console.error("Error on submit:", error);
    }
  }

  // Render the form component.
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          onChange={(e) => setTitle(e.target.value)} // Update the title state on each change.
          type="text"
          name="title"
          id="title"
          value={title} // Bind the input to the title state.
        />
      </label>
      <label>
        Info:
        <input
          onChange={(e) => setInfo(e.target.value)} // Update the info state on each change.
          type="text"
          name="info"
          id="info"
          value={info} // Bind the input to the info state.
        />
      </label>
       <button>Add Todo</button> {/* Button to submit the form. */}
    </form>
  );
}
