import { useTaskContext } from "../context/useTaskContext";

const TaskList = () => {
  const { tasks, filter, switchTaskStatus, removeTask } = useTaskContext();

  // Filtrar las tareas según el valor de filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;  
    } else if (filter === 'pending') {
      return !task.completed; 
    }
    return true; 
  });

  return (
    <div>
      {/* Render de tareas */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md sm:max-w-4xl w-full mx-auto"
          >
            <span
              className="flex-1 mr-4"
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.title}
            </span>
            <button
              onClick={() => switchTaskStatus(task.id)}
              className="w-6 h-6 flex items-center justify-center text-xl text-gray-600 bg-transparent border-2 border-gray-300 rounded-full hover:bg-green-100 hover:text-green-600 focus:outline-none"
            >
              ✓
            </button>
            <button
              onClick={() => removeTask(task.id)}  
              className="ml-2 text-gray-500 hover:text-red-600 hover:scale-110 transition-transform duration-150 text-base align-middle"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
