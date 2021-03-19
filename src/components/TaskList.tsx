import { useState } from "react"
import { useToasts } from 'react-toast-notifications'


import "../styles/tasklist.scss"

import { FiTrash, FiCheckSquare } from "react-icons/fi"
// import { ConfirmationModal } from "./ConfirmationModal";



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { addToast } = useToasts()

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        isComplete: false
      }

      setTasks([...tasks, newTask]);

      setNewTaskTitle("");

      addToast("Nova tarefa adicionada com sucesso", {
        appearance: 'success',
        autoDismiss: true,
      })
    } else {
      addToast("Por favor, coloque um título na tarefa para adicioná-la à lista.", {
        appearance: 'warning',
        autoDismiss: true,
      })
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskIndex = tasks.findIndex(task => task.id === id);
    const updatedTasks = [...tasks]

    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], isComplete: !updatedTasks[taskIndex].isComplete }
    setTasks(updatedTasks)

    const msg = updatedTasks[taskIndex].isComplete ? "Tarefa concluída" : "Tarefa pendente";

    addToast(msg, {
      appearance: updatedTasks[taskIndex].isComplete ? 'success' : 'info',
      autoDismiss: true
    })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // setIsConfirmationModalOpen(true);

    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)

    addToast("Tarefa apagada com sucesso", {
      appearance: 'error', //appearance of error, but meaning of deletion.
      autoDismiss: true
    })
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            id="new-task-input"
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            id="new-task-button"
            type="submit"
            data-testid="add-task-button"
            onClick={() => {
              document.getElementById("new-task-input")?.focus();
              handleCreateNewTask();
            }}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? "completed" : ""} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>

      {/* {
        isConfirmationModalOpen &&
        <ConfirmationModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      } */}

    </section>

  )
}