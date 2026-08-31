import React, { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

export default function SmartIssueTracker() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [priority, setPriority] = useState('Medium');
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: 'Todo', title: '📋 Todo', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
    { id: 'In Progress', title: '🚀 In Progress', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
    { id: 'Done', title: '✅ Done', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' }
  ];

  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500'
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      priority,
      createdAt: new Date().toLocaleDateString()
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setStatus('Todo');
    setPriority('Medium');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnId) => {
    if (draggedTask) {
      setTasks(tasks.map(t =>
        t.id === draggedTask.id ? { ...t, status: columnId } : t
      ));
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Smart Issue Tracker developed by parikshit
          </h1>
          <p className="text-gray-600">Organize your tasks with style ✨</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 max-w-2xl mx-auto border-4 border-purple-200 hover:border-purple-400 transition-all duration-300">
          <form onSubmit={addTask} className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="✍️ Task Title"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-lg"
                required
              />
            </div>

            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="📝 Task Description"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all resize-none h-24"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Add Task
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className={`${column.bg} rounded-2xl p-4 min-h-[500px] shadow-xl border-4 border-white transition-all duration-300 hover:shadow-2xl`}
            >
              <div className={`bg-gradient-to-r ${column.color} text-white rounded-xl p-4 mb-4 shadow-lg`}>
                <h2 className="text-2xl font-bold text-center">{column.title}</h2>
                <p className="text-center text-sm mt-1 opacity-90">
                  {tasks.filter(t => t.status === column.id).length} tasks
                </p>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="bg-white rounded-xl p-4 shadow-lg cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-purple-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800 flex-1">{task.title}</h3>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`${priorityColors[task.priority]} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar size={14} />
                          <span>{task.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        

        {/* Stats Footer */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'Todo').length}</div>
              <div className="text-sm opacity-90">Todo</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'In Progress').length}</div>
              <div className="text-sm opacity-90">In Progress</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{tasks.filter(t => t.status === 'Done').length}</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// umesh hlo bhai kaise ho 