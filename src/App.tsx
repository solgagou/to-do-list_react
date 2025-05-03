import { useState, useEffect } from "react";
import { useTaskContext } from "./context/useTaskContext";
import TaskList from "./components/TaskList";

function App() {
  const { setFilter } = useTaskContext(); 
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Establecer el tema inicial desde localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); 
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300 pb-20">
      <header className="p-4"></header>
      <button
        onClick={toggleTheme}
        className="p-3 bg-blue-500 dark:bg-gray-700 text-white rounded-full text-lg hover:bg-blue-600 dark:hover:bg-gray-800 fixed bottom-8 right-8 z-10"
      >
        🌙
      </button>

      <main className="max-w-4xl mx-auto px-8 sm:px-6 md:px-4">
        {/* Filtros de tareas */}
        <div className="mb-4 flex justify-center sm:justify-start space-x-2">
          <button
            onClick={() => setFilter("all")}
            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
          >
            Pendientes
          </button>
        </div>

        {/* Lista de tareas */}
        <TaskList />
      </main>
    </div>
  );
}

export default App;
