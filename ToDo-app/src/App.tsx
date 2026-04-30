import { useCallback, useState } from 'react'
import './App.css'
import Task from './components/Task'

interface TodoTask {
  id: number
  text: string
}

function App() {
  const [tasks, setTasks] = useState<TodoTask[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [nextId, setNextId] = useState(1)

  const removeTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])

  const editTask = useCallback((id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }, [])

  const addTask = useCallback(() => {
    if (newTaskText.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { id: nextId, text: newTaskText.trim() }])
      setNextId((prevId) => prevId + 1)
      setNewTaskText('')
    }
  }, [newTaskText, nextId])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Todo App</h1>
      
      {/* Форма добавления новой задачи */}
      <div className="mb-8 flex gap-3 items-center">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Добавить новую задачу..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTask}
          className="px-6 py-3 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors font-medium"
        >
          Добавить
        </button>
      </div>

      {/* Список задач */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-lg">Нет задач. Добавьте первую задачу!</p>
      ) : (
        tasks.map((task) => (
          <Task 
            key={task.id}
            id={task.id}
            text={task.text}
            remove={removeTask}
            edit={editTask}
          />
        ))
      )}
    </div>
  )
}

export default App
