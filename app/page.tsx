"use client";
import { useState } from "react";
import { FaPlus, FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import IconButton from "./IconButton";
import TodoTextItem from "./TodoTextItem";

export default function Home() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (currentTodo.trim() === "") return;
    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex].text = currentTodo;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: currentTodo, completed: false }]);
    }
    setCurrentTodo("");
  };

  const handleEditTodo = (index: number) => {
    setCurrentTodo(todos[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title as React.CSSProperties}>Todo List</h1>
      <div style={styles.form}>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a todo"
          style={styles.input}
        />
        <button
          onClick={handleAddTodo}
          style={{ ...styles.iconButton, ...styles.addButton }}
        >
          <FaPlus />
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            <TodoTextItem
              text={todo.text}
              completed={todo.completed}
              styles={{
                todoText: styles.todoText,
                completedTodo: styles.completedTodo,
              }}
            />
            <div>
              <IconButton
                icon={<FaCheck />}
                onClick={() => handleToggleComplete(index)}
                style={{
                  color: todo.completed ? "#28a745" : "#888",
                }}
              />
              <IconButton
                icon={<FaEdit />}
                onClick={() => handleEditTodo(index)}
                style={{ color: "#ffc107" }}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTodo(index)}
                style={{ color: "#dc3545" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#333",
  },
  iconButton: {
    padding: "8px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  iconButtonHover: {
    color: "#0056b3",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "4px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  todoText: {
    fontSize: "16px",
    color: "#333",
  },
  addButton: {
    color: "#0070f3",
  },
  completedTodo: {
    textDecoration: "line-through",
    color: "#888",
  },
};
