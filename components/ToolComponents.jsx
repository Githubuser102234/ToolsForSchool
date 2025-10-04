'use client';

import React, { useState, useMemo, useEffect } from 'react';
// The icons are still imported here for use in the components below
import { Clock, Calculator, BookOpen } from 'lucide-react';

// --- Tool Component Logic ---

// 1. Grade Calculator Component
export const GradeCalculator = () => {
  const [assignments, setAssignments] = useState([{ id: 1, name: 'Initial', weight: 50, score: 85 }]);
  const [newAssignment, setNewAssignment] = useState({ name: '', weight: '', score: '' });

  const addAssignment = () => {
    if (newAssignment.name && newAssignment.weight && newAssignment.score) {
      setAssignments([...assignments, { 
        ...newAssignment, 
        id: Date.now(), 
        weight: parseFloat(newAssignment.weight), 
        score: parseFloat(newAssignment.score) 
      }]);
      setNewAssignment({ name: '', weight: '', score: '' });
    }
  };

  const calculateGrade = useMemo(() => {
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    if (totalWeight === 0) return 0;

    const weightedScoreSum = assignments.reduce((sum, a) => sum + (a.score * a.weight), 0);
    return (weightedScoreSum / totalWeight).toFixed(2);
  }, [assignments]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-3">Current Weighted Grade:</h3>
        <p className="text-5xl font-extrabold text-indigo-600">
          {calculateGrade}%
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Total Weight Used: {assignments.reduce((sum, a) => sum + a.weight, 0).toFixed(0)}%
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Add Assignment</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newAssignment.name}
            onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 col-span-3 sm:col-span-1"
          />
          <input
            type="number"
            placeholder="Weight (%)"
            value={newAssignment.weight}
            onChange={(e) => setNewAssignment({ ...newAssignment, weight: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Score (%)"
            value={newAssignment.score}
            onChange={(e) => setNewAssignment({ ...newAssignment, score: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={addAssignment}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          Add to List
        </button>
      </div>
    </div>
  );
};

// 2. Pomodoro Timer Component
export const PomodoroTimer = () => {
  const WORK_TIME = 25 * 60; 
  const BREAK_TIME = 5 * 60; 

  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [time, setTime] = useState(WORK_TIME);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    } else if (time === 0) {
      setIsWorkMode(m => !m);
      setTime(isWorkMode ? BREAK_TIME : WORK_TIME);
      setIsRunning(false); 
    }
    return () => clearInterval(interval);
  }, [isRunning, time, isWorkMode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkMode(true);
    setTime(WORK_TIME);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const modeText = isWorkMode ? 'Focus Time' : 'Short Break';
  const modeColor = isWorkMode ? 'text-red-600' : 'text-green-600';
  const ringColor = isWorkMode ? 'ring-red-300' : 'ring-green-300';
  const bgColor = isWorkMode ? 'bg-red-50' : 'bg-green-50';

  return (
    <div className="space-y-8 text-center">
      <div className={`p-8 rounded-full shadow-2xl mx-auto w-64 h-64 flex flex-col items-center justify-center transition-all duration-300 ${bgColor} ring-4 ${ringColor}`}>
        <p className={`text-xl font-semibold mb-1 ${modeColor}`}>{modeText}</p>
        <p className={`text-6xl font-extrabold ${modeColor}`}>{formatTime(time)}</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            isRunning 
              ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isRunning ? 'Pause' : (time === WORK_TIME && isWorkMode ? 'Start Focus' : 'Resume')}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors shadow-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// 3. Simple Study Planner Component
export const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', subject: '', date: '' });
  const subjects = ['Math', 'Science', 'History', 'English', 'Art', 'Other'];

  const addTask = () => {
    if (newTask.name && newTask.subject && newTask.date) {
      setTasks([...tasks, { ...newTask, id: Date.now(), isDone: false }]);
      setNewTask({ name: '', subject: '', date: '' });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };
  
  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Schedule New Task</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:col-span-2"
          />
          <select
            value={newTask.subject}
            onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Upcoming Tasks ({tasks.filter(t => !t.isDone).length})</h3>
        <ul className="divide-y divide-gray-200">
          {sortedTasks.map((t) => (
            <li key={t.id} className={`py-3 flex items-center justify-between transition-opacity`}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={() => toggleTask(t.id)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-3"
                />
                <div>
                  <span className={`font-medium text-gray-700 block ${t.isDone ? 'line-through opacity-60' : ''}`}>{t.name}</span>
                  <span className="text-xs text-gray-500">{t.subject} &middot; Due: {t.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <p className="text-gray-500 italic">No tasks scheduled.</p>}
      </div>
    </div>
  );
};

