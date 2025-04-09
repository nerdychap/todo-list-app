import React from "react";

interface TodoTextItemProps {
  text: string;
  completed: boolean;
  styles: {
    todoText: React.CSSProperties;
    completedTodo: React.CSSProperties;
  };
}

const TodoTextItem: React.FC<TodoTextItemProps> = ({ text, completed, styles }) => {
  return (
    <span
      style={{
        ...styles.todoText,
        ...(completed ? styles.completedTodo : {}),
      }}
    >
      {text}
    </span>
  );
};

export default TodoTextItem;