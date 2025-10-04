'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Clock, Calculator, BookOpen, X, Play, Pause, RefreshCw, GraduationCap, Timer, Trash2, MinusCircle, PlusCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link'; // Used for the back button in the individual tools

// --- Tool Component Logic ---

// 1. Weighted Grade Calculator
export const GradeCalculator = () => {
  const [assignments, setAssignments] = useState([{ id: 1, name: 'Homework 1', weight: 10, score: 95 }]);
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

  const removeAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const totalWeight = useMemo(() => assignments.reduce((sum, a) => sum + a.weight, 0), [assignments]);

  const calculateGrade = useMemo(() => {
    if (totalWeight === 0) return { grade: 'N/A', weightedSum: 0 };

    const weightedScoreSum = assignments.reduce((sum, a) => sum + (a.score * a.weight), 0);
    return {
        grade: (weightedScoreSum / totalWeight).toFixed(2),
        weightedSum: weightedScoreSum
    };
  }, [assignments, totalWeight]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-3 text-indigo-700">Overall Course Grade:</h3>
        <p className="text-5xl font-extrabold text-indigo-600">
          {calculateGrade.grade}%
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Total Weight Accounted For: <span className="font-bold">{totalWeight.toFixed(0)}%</span>
          {totalWeight > 100 && <span className="text-red-500 ml-2">(Weight Over 100%)</span>}
        </p>
      </div>

      {/* Add Assignment Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Add Assignment</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Assignment Name"
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
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
          disabled={!newAssignment.name || !newAssignment.weight || !newAssignment.score}
        >
          Add to Calculation
        </button>
      </div>
      
      {/* Assignment List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Assignment Breakdown ({assignments.length})</h3>
        <ul className="divide-y divide-gray-100">
          {assignments.map((a) => (
            <li key={a.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800">{a.name}</span>
                <span className="text-sm text-gray-500 block">Weight: {a.weight}% | Score: {a.score}%</span>
              </div>
              <button
                onClick={() => removeAssignment(a.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors"
                aria-label={`Remove ${a.name}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
        {assignments.length === 0 && <p className="text-gray-500 italic">No assignments added yet.</p>}
      </div>
    </div>
  );
};

// 2. Pomodoro Timer Component (Enhanced)
export const PomodoroTimer = () => {
  const DEFAULT_WORK = 25 * 60; 
  const DEFAULT_BREAK = 5 * 60; 

  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [time, setTime] = useState(DEFAULT_WORK);
  const [cycles, setCycles] = useState(0);
  const [workDuration, setWorkDuration] = useState(DEFAULT_WORK);
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK);

  // Sync state when work/break duration changes
  useEffect(() => {
    if (isWorkMode) setTime(workDuration);
    else setTime(breakDuration);
    setIsRunning(false);
  }, [workDuration, breakDuration]);


  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    } else if (time === 0) {
      // Time is up, switch mode
      if (isWorkMode) {
        setCycles(c => c + 1);
      }
      setIsWorkMode(m => !m);
      setTime(isWorkMode ? breakDuration : workDuration); // set time for the next mode
      setIsRunning(false); // Pause when switching modes, prompt user to continue
    }
    return () => clearInterval(interval);
  }, [isRunning, time, isWorkMode, workDuration, breakDuration]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkMode(true);
    setTime(workDuration);
    setCycles(0);
  };

  const skipMode = () => {
    setIsWorkMode(m => !m);
    setTime(isWorkMode ? breakDuration : workDuration);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const modeText = isWorkMode ? 'FOCUS' : 'BREAK';
  const modeColor = isWorkMode ? 'text-red-600' : 'text-green-600';
  const bgColor = isWorkMode ? 'bg-red-50' : 'bg-green-50';
  const ringColor = isWorkMode ? 'ring-red-400' : 'ring-green-400';

  return (
    <div className="space-y-6 text-center">
      <div className={`p-8 rounded-full shadow-2xl mx-auto w-72 h-72 flex flex-col items-center justify-center transition-all duration-500 ${bgColor} ring-8 ${ringColor} ring-opacity-20`}>
        <p className={`text-xl font-semibold mb-2 ${modeColor}`}>{modeText}</p>
        <p className={`text-7xl font-extrabold ${modeColor}`}>{formatTime(time)}</p>
        <p className="text-sm text-gray-500 mt-2">Cycle: {cycles}</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center ${
            isRunning 
              ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isRunning ? <><Pause className="w-5 h-5 mr-2"/> Pause</> : <><Play className="w-5 h-5 mr-2"/> Start</>}
        </button>
        <button
          onClick={skipMode}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors shadow-md flex items-center"
        >
          <RefreshCw className="w-5 h-5 mr-2"/> Skip
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors shadow-md"
        >
          Reset
        </button>
      </div>
      
      {/* Duration Settings */}
      <div className="max-w-xs mx-auto pt-4 space-y-3">
        <p className="font-semibold text-sm text-gray-700">Set Durations (Minutes):</p>
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
          <label className="text-gray-600">Work</label>
          <input
            type="number"
            value={workDuration / 60}
            onChange={(e) => setWorkDuration(parseInt(e.target.value) * 60 || 0)}
            className="w-20 text-center p-1 border rounded-md"
          />
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
          <label className="text-gray-600">Break</label>
          <input
            type="number"
            value={breakDuration / 60}
            onChange={(e) => setBreakDuration(parseInt(e.target.value) * 60 || 0)}
            className="w-20 text-center p-1 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

// 3. Simple Study Planner Component (Enhanced)
export const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', subject: '', date: '' });
  const subjects = ['Math', 'Science', 'History', 'English', 'Art', 'CS', 'Other'];

  const addTask = () => {
    if (newTask.name && newTask.subject && newTask.date) {
      setTasks([...tasks, { ...newTask, id: Date.now(), isDone: false }]);
      setNewTask({ name: '', subject: '', date: '' });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const sortedTasks = useMemo(() => {
    // Sort by completion status (incomplete first) then by date
    return tasks.sort((a, b) => {
        if (a.isDone !== b.isDone) {
            return a.isDone ? 1 : -1; // Incomplete tasks first
        }
        return new Date(a.date) - new Date(b.date);
    });
  }, [tasks]);

  return (
    <div className="space-y-6">
      {/* Schedule Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Schedule New Task/Assignment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Task Description (e.g., Chapter 5 Quiz)"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:col-span-2"
          />
          <select
            value={newTask.subject}
            onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
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
          className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
          disabled={!newTask.name || !newTask.subject || !newTask.date}
        >
          Add Task to Planner
        </button>
      </div>

      {/* Task List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">My Study Tasks ({tasks.filter(t => !t.isDone).length} Incomplete)</h3>
        <ul className="divide-y divide-gray-200">
          {sortedTasks.map((t) => (
            <li key={t.id} className={`py-3 flex items-center justify-between transition-opacity ${t.isDone ? 'opacity-70' : ''}`}>
              <div className="flex items-center flex-grow" onClick={() => toggleTask(t.id)}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  readOnly // Use readOnly since onClick is on the parent div
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-3 cursor-pointer"
                />
                <div>
                  <span className={`font-medium text-gray-700 block ${t.isDone ? 'line-through' : ''}`}>{t.name}</span>
                  <span className="text-xs text-gray-500">{t.subject} &middot; Due: {t.date}</span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(t.id)}
                className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors ml-4"
                aria-label={`Delete ${t.name}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <p className="text-gray-500 italic">No tasks scheduled. Get started!</p>}
      </div>
    </div>
  );
};

// 4. GPA Converter (New Tool)
export const GpaConverter = () => {
  const [gradeType, setGradeType] = useState('percentage'); // 'percentage' or 'letter'
  const [percentage, setPercentage] = useState(85);
  const [letterGrade, setLetterGrade] = useState('B');
  const [gpaScale, setGpaScale] = useState(4.0); // Simple 4.0 scale

  const conversionTable = useMemo(() => ({
    // Simple 4.0 Scale Conversion (common in US schools)
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0,
  }), []);

  const calculateGpa = useMemo(() => {
    if (gradeType === 'percentage') {
      const p = parseFloat(percentage);
      if (isNaN(p)) return '0.00';
      
      // Simple percentage to 4.0 mapping
      if (p >= 93) return conversionTable['A+'].toFixed(2);
      if (p >= 90) return conversionTable['A'].toFixed(2);
      if (p >= 87) return conversionTable['A-'].toFixed(2);
      if (p >= 83) return conversionTable['B+'].toFixed(2);
      if (p >= 80) return conversionTable['B'].toFixed(2);
      if (p >= 77) return conversionTable['B-'].toFixed(2);
      if (p >= 73) return conversionTable['C+'].toFixed(2);
      if (p >= 70) return conversionTable['C'].toFixed(2);
      if (p >= 67) return conversionTable['C-'].toFixed(2);
      if (p >= 60) return conversionTable['D'].toFixed(2);
      return conversionTable['F'].toFixed(2);

    } else if (gradeType === 'letter') {
      const gpa = conversionTable[letterGrade.toUpperCase()];
      return gpa !== undefined ? gpa.toFixed(2) : '0.00';
    }
    return '0.00';
  }, [percentage, letterGrade, gradeType, conversionTable]);


  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-3 text-green-700">Converted GPA:</h3>
        <p className="text-5xl font-extrabold text-green-600">
          {calculateGpa}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Based on a standard US 4.0 scale.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Input Grade</h3>
        
        {/* Type Selector */}
        <div className="flex mb-4 border rounded-lg overflow-hidden">
          <button 
            onClick={() => setGradeType('percentage')}
            className={`flex-1 p-3 font-semibold transition-colors ${gradeType === 'percentage' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Percentage (%)
          </button>
          <button 
            onClick={() => setGradeType('letter')}
            className={`flex-1 p-3 font-semibold transition-colors ${gradeType === 'letter' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Letter Grade
          </button>
        </div>

        {/* Dynamic Input Field */}
        {gradeType === 'percentage' ? (
          <input
            type="number"
            placeholder="Enter Percentage (e.g., 85)"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        ) : (
          <select
            value={letterGrade}
            onChange={(e) => setLetterGrade(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
          >
            {Object.keys(conversionTable).map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

// 5. Reading Time Estimator (New Tool)
export const ReadingTimeEstimator = () => {
  const [wordCount, setWordCount] = useState(1500);
  const [readingSpeed, setReadingSpeed] = useState(250); // words per minute (WPM)

  const readingTime = useMemo(() => {
    const wc = parseFloat(wordCount);
    const rs = parseFloat(readingSpeed);
    
    if (isNaN(wc) || isNaN(rs) || wc <= 0 || rs <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
    }

    const totalMinutes = wc / rs;
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const minutes = Math.floor(remainingMinutes);
    const seconds = Math.round((remainingMinutes - minutes) * 60);

    return { hours, minutes, seconds };
  }, [wordCount, readingSpeed]);

  const { hours, minutes, seconds } = readingTime;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
        <h3 className="text-xl font-semibold mb-3 text-orange-700">Estimated Reading Time:</h3>
        <p className="text-5xl font-extrabold text-orange-600">
          {hours > 0 ? `${hours}h ` : ''}
          {minutes}m {seconds}s
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Estimate assumes continuous reading.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Reading Parameters</h3>
        
        {/* Word Count Input */}
        <div className="space-y-1">
          <label htmlFor="wordCount" className="text-gray-600 font-medium flex justify-between items-center">
            Total Word Count
            <span className="text-sm text-orange-600 font-bold">{wordCount} words</span>
          </label>
          <input
            id="wordCount"
            type="number"
            placeholder="Enter word count"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Reading Speed Input */}
        <div className="space-y-1">
          <label htmlFor="readingSpeed" className="text-gray-600 font-medium flex justify-between items-center">
            Your Reading Speed (WPM)
            <span className="text-sm text-orange-600 font-bold">{readingSpeed} WPM</span>
          </label>
          <input
            id="readingSpeed"
            type="range"
            min="100"
            max="500"
            step="10"
            value={readingSpeed}
            onChange={(e) => setReadingSpeed(e.target.value)}
            className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer range-lg"
            style={{accentColor: '#f97316'}}
          />
          <p className="text-xs text-gray-400 text-right">Standard speed is ~250 WPM</p>
        </div>
      </div>
    </div>
  );
};

