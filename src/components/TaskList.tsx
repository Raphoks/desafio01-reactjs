import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';
import { match } from 'assert';
import { useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle !== '') {
      const task: Task = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks((tasks) => [...tasks, task]);
    }
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const index = newTasks.findIndex((task) => task.id === id);
      const task = newTasks[index];

      task.isComplete = !task.isComplete;

      newTasks[index] = task;

      return newTasks;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const index = newTasks.findIndex((task) => task.id === id);

      newTasks.splice(index, 1);

      return newTasks;
    });
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
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

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
