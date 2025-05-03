import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  return context;
};
