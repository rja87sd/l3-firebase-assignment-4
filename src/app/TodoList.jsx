// Credit to ChatGPT for detailed explanations of firebase, assistance with code implementation, and code comments.
// Indicates that this component should only be used on the client-side.
"use client";

// Import necessary Firestore functions to interact with Firestore data.
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
// Import React hooks for managing state and side effects in the component.
import { useEffect, useState } from "react";
// Import the Firestore database configuration from the firebaseConfig module.
import { db } from "./firebaseConfig";
// Import the UpdateTodoForm component, used for editing todos.
import UpdateTodoForm from "./UpdateTodoForm";

// Define and export the TodoList component as the default export of this module.
export default function TodoList() {
  // useState to maintain the list of todos retrieved from Firestore.
  const [todos, setTodos] = useState([]);
  // useState to toggle the editing state to show or hide the UpdateTodoForm.
  const [editing, setEditing] = useState(false);

  // useEffect to handle the real-time subscription to the 'todos' collection in Firestore.
  useEffect(() => {
    // Subscribe to the todos collection and listen for real-time updates.
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      // Map over the snapshot docs to create an array of todo objects.
      const todosArray = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID in the todo object.
        ...doc.data(), // Spread all fields from the document into the todo object.
      }));
      // Update the state with the new todos array.
      setTodos(todosArray);
    });

    // Cleanup function to unsubscribe from the collection when the component unmounts.
    return () => unsubscribe();
  }, []);

  // Function to handle the deletion of a todo document.
  async function handleDelete(id) {
    try {
      // Reference the document to delete using its ID.
      const todoRef = doc(db, "todos", id);
      // Call deleteDoc to delete the document.
      await deleteDoc(todoRef);
    } catch (error) {
      // Log any errors encountered during deletion.
      console.error("Error deleting document:", error);
    }
  }

  // Render the TodoList component.
  return (
    <div>
      <h2>Todos:</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3> {/* Display the todo title. */}
            <p>{todo.info}</p> {/* Display the todo info. */}
            {/* Conditionally render the UpdateTodoForm if editing is true. */}
            {editing && <UpdateTodoForm todo={todo} />}
            {/* Button to toggle editing. */}
            <button onClick={() => setEditing(!editing)}>Edit</button>
            {/* Button to delete a todo. */}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            {/* Horizontal rule for visual separation. */}
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
}
