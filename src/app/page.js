// Credit to ChatGPT for detailed explanations of firebase, assistance with code implementation, and code comments.
// Import the TodoForm and TodoList components from their respective files.
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

// Define the default export of this module as the Home component.
// This is a functional component that serves as the main page of the app.
export default function Home() {
  return (
    //  Return the main HTML structure of the Home component.
    // It uses a <main> HTML element to wrap its content for semantic correctness.
    <main>
      <h1>Todo App!</h1> {/* Display the title of the app in an <h1> tag. */}
      <TodoForm />{" "}
      {/* // Include the TodoForm component, which handles adding new todos. */}
      <TodoList />{" "}
      {/* // Include the TodoList component, which displays the list of todos. */}
    </main>
  );
}
