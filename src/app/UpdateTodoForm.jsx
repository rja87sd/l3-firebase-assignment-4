// Credit to ChatGPT for detailed explanations of firebase, assistance with code implementation, and code comments.
// Import necessary Firestore functions for updating documents.
import { doc, updateDoc } from "firebase/firestore";
// Import the useState hook from React to manage state.
import { useState } from "react";
// Import the Firestore database configuration from the firebaseConfig module.
import { db } from "./firebaseConfig";

// Define and export the UpdateTodoForm component. It receives a 'todo' object as a prop.
export default function UpdateTodoForm({ todo }) {
  // useState to hold and update the title of the todo. Initialized with the current title.
  const [title, setTitle] = useState(todo.title);
  // useState to hold and update the info of the todo. Initialized with the current info.
  const [info, setInfo] = useState(todo.info);

  // Define an asynchronous function to handle form submission.
  async function handleSubmit(e) {
    // Prevent the default form submission action.
    e.preventDefault();
    try {
      // Reference the specific document in the 'todos' collection by ID.
      const todoRef = doc(db, "todos", todo.id);
      // Update the document at todoRef with the new title and info.
      await updateDoc(todoRef, { title, info });
    } catch (error) {
      // Log any errors that occur during the update process.
      console.error("Error updating todo:", error);
    }
  }

  // Render the form for updating a todo.
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          onChange={(e) => setTitle(e.target.value)} // Update title state on change.
          type="text"
          name="title"
          id="title"
          value={title} // Bind input to the title state.
        />
      </label>
      <label>
        Info:
        <input
          onChange={(e) => setInfo(e.target.value)} // Update info state on change.
          type="text"
          name="info"
          id="info"
          value={info} // Bind input to the info state.
        />
      </label>
      {/* Button to submit the form. The label might need updating. */}
      <button>Add Todo</button>
    </form>
  );
}
