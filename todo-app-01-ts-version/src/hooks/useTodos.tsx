import { useState, useEffect } from "react";
import { TodoArray, BASE_URL } from "types/utils";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoArray[]>([]);

  const getAllTodo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todo/getAllTodo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")!,
        },
      });
      if (response.status === 200) {
        const data = await response.json() as TodoArray[];
        setTodos(data);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);



  

  const handleNewTodo = async() => {
   
  }

  return { todos };
};
