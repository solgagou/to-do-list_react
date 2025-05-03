import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Task } from "../types/task";

export interface TaskContextType {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  switchTaskStatus: (id: number) => void;
  removeTask: (id: number) => void;  // Función para eliminar tarea
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>(() => {
    const storedFilter = localStorage.getItem("filter");
    return storedFilter ? JSON.parse(storedFilter) : 'all';
  });

  useEffect(() => {
    // Cargar estado inicial
    const storedTasks = localStorage.getItem("tasks");
    const storedFilter = localStorage.getItem("filter");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then(res => res.json())
        .then(data => {
          setTasks(data);
          localStorage.setItem("tasks", JSON.stringify(data));
        });
    }
    if (storedFilter) {
      setFilter(JSON.parse(storedFilter));
    } else {
      setFilter('all');
    }
  }, []);

  useEffect(() => {
    // Guardar tareas y filtro en localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [tasks, filter]);

  const switchTaskStatus = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const value: TaskContextType = {
    tasks,
    filter,
    setFilter,
    switchTaskStatus,
    removeTask,  
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
