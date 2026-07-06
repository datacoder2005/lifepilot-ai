'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  Calendar, 
  Map, 
  CheckSquare, 
  Activity, 
  Brain, 
  Mail, 
  Scale, 
  ShieldAlert, 
  Settings as SettingsIcon,
  Plus, 
  Trash2, 
  Check, 
  Clipboard, 
  TrendingUp, 
  Clock, 
  Coffee, 
  User, 
  Moon, 
  Sun,
  AlertTriangle,
  Lightbulb,
  Droplet,
  BookOpen
} from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

// TS Interfaces
interface Task {
  id: string;
  title: string;
  duration: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  status: 'todo' | 'done';
  date: string;
}

interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  status: 'todo' | 'done';
}

interface Reminder {
  id: string;
  title: string;
  deadline: string;
  type: 'meeting' | 'medicine' | 'bill' | 'birthday' | 'interview';
}

interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  actionItems: string[];
}

export default function Dashboard() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [emergencyMode, setEmergencyMode] = useLocalStorage<boolean>('lp_emergency_mode', false);
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('lp_theme', 'dark');

  // Profile
  const [profile, setProfile] = useLocalStorage<{name: string; apiKey: string}>('lp_profile', {
    name: 'Developer Partner',
    apiKey: ''
  });

  // State management using local storage
  const [tasks, setTasks] = useLocalStorage<Task[]>('lp_tasks', [
    { id: '1', title: 'Plan Kaggle Intensive capstone submission structure', duration: '2h', priority: 'high', category: 'Capstone', status: 'todo', date: 'Today' },
    { id: '2', title: 'Refactor Tailwind configurations for glassmorphic dark themes', duration: '1h', priority: 'high', category: 'Styling', status: 'done', date: 'Today' },
    { id: '3', title: 'Prepare documentation guides and installation checklists', duration: '1.5h', priority: 'medium', category: 'Docs', status: 'todo', date: 'Tomorrow' },
    { id: '4', title: 'Write unit tests for the local storage synchronization hooks', duration: '3h', priority: 'low', category: 'Testing', status: 'todo', date: 'Tomorrow' }
  ]);

  const [goals, setGoals] = useLocalStorage<Goal[]>('lp_goals', [
    { id: 'g1', title: 'Drink 8 glasses of water today', type: 'daily', status: 'todo' },
    { id: 'g2', title: 'Complete Next.js routing structures', type: 'daily', status: 'done' },
    { id: 'g3', title: 'Integrate Framer Motion animations in dashboards', type: 'weekly', status: 'todo' },
    { id: 'g4', title: 'Submit capstone prototype to Kaggle showcase', type: 'monthly', status: 'todo' }
  ]);

  const [reminders, setReminders] = useLocalStorage<Reminder[]>('lp_reminders', [
    { id: 'r1', title: 'Submit Capstone Phase 1 artifacts', deadline: '2026-07-09T23:59', type: 'meeting' },
    { id: 'r2', title: 'Take Vitamins', deadline: '2026-07-07T09:00', type: 'medicine' },
    { id: 'r3', title: 'Vercel hosting configuration check', deadline: '2026-07-08T15:30', type: 'interview' }
  ]);

  const [notes, setNotes] = useLocalStorage<Note[]>('lp_notes', [
    {
      id: 'n1',
      title: 'Brainstorming Wellness Integration',
      content: 'We should include micro-stretching steps in the wellness module. Keep visual cues minimal, and suggest water breaks every 60 minutes when user tasks exceed 4 hours.',
      summary: 'Wellness module brainstorm emphasizing micro-breaks, hydration alerts, and adaptive UI layouts.',
      actionItems: ['Implement water glass incrementer', 'Add shoulder stretching guide', 'Set up stress indicator UI']
    }
  ]);

  // Wellness States
  const [waterGlasses, setWaterGlasses] = useLocalStorage<number>('lp_water_glasses', 3);
  const [sleepHours, setSleepHours] = useLocalStorage<number>('lp_sleep_hours', 7.5);

  // Forms Input States
  const [newGoalInput, setNewGoalInput] = useState('');
  const [newGoalType, setNewGoalType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDeadline, setNewReminderDeadline] = useState('');
  const [newReminderType, setNewReminderType] = useState<'meeting' | 'medicine' | 'bill' | 'birthday' | 'interview'>('meeting');

  // AI Forms State
  const [plannerGoal, setPlannerGoal] = useState('');
  const [plannerResult, setPlannerResult] = useState<any>(null);
  const [researchTopic, setResearchTopic] = useState('');
  const [researchResult, setResearchResult] = useState<any>(null);
  const [decisionInput, setDecisionInput] = useState('React vs Next.js');
  const [decisionResult, setDecisionResult] = useState<any>(null);
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Workspace Session Notes');
  const [emailForm, setEmailForm] = useState({
    type: 'leave',
    recipient: 'Lead Manager',
    sender: 'Dev Partner',
    tone: 'professional',
    details: 'medical checkup'
  });
  const [emailResult, setEmailResult] = useState<any>(null);

  // Loading States
  const [loadingPlanner, setLoadingPlanner] = useState(false);
  const [loadingResearch, setLoadingResearch] = useState(false);
  const [loadingDecision, setLoadingDecision] = useState(false);
  const [loadingNotesAI, setLoadingNotesAI] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Success Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Run initial state loading details
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Emergency Mode triggers
  const handleToggleEmergency = () => {
    const newState = !emergencyMode;
    setEmergencyMode(newState);
    if (newState) {
      triggerToast("Emergency Mode Enabled. Cognitive load reduced.");
    } else {
      triggerToast("Emergency Mode Disabled. Full dashboard restored.");
    }
  };

  // Helper functions
  const handleAddTask = (title: string, duration = '1h', priority: 'high'|'medium'|'low' = 'medium', category = 'Inbox') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      duration,
      priority,
      category,
      status: 'todo',
      date: 'Today'
    };
    setTasks([newTask, ...tasks]);
    triggerToast("Task added successfully!");
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'todo' ? 'done' : 'todo' } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalInput,
      type: newGoalType,
      status: 'todo'
    };
    setGoals([...goals, newGoal]);
    setNewGoalInput('');
    triggerToast("Goal created!");
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, status: g.status === 'todo' ? 'done' : 'todo' } : g));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim() || !newReminderDeadline) return;
    const newRem: Reminder = {
      id: Date.now().toString(),
      title: newReminderTitle,
      deadline: newReminderDeadline,
      type: newReminderType
    };
    setReminders([...reminders, newRem]);
    setNewReminderTitle('');
    setNewReminderDeadline('');
    triggerToast("Reminder set!");
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // API Call handlers
  const handleGeneratePlan = async () => {
    if (!plannerGoal.trim()) return;
    setLoadingPlanner(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentType: 'planner', inputData: plannerGoal })
      });
      const json = await res.json();
      if (json.success) {
        setPlannerResult(json.data);
        // Automatically inject tasks to main list
        if (json.data.tasks) {
          const generated: Task[] = json.data.tasks.map((t: any) => ({
            id: 'ai-' + Math.random().toString(36).substring(2),
            title: t.title,
            duration: t.duration,
            priority: t.priority,
            category: t.category || 'Planner',
            status: 'todo',
            date: 'Today'
          }));
          setTasks([...generated, ...tasks]);
          triggerToast("Schedule generated. High-priority tasks added to your board!");
        }
      }
    } catch (err) {
      triggerToast("AI Generation error.");
    } finally {
      setLoadingPlanner(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!researchTopic.trim()) return;
    setLoadingResearch(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentType: 'researcher', inputData: researchTopic })
      });
      const json = await res.json();
      if (json.success) {
        setResearchResult(json.data);
        triggerToast("Research Roadmap generated!");
      }
    } catch (err) {
      triggerToast("AI Generation error.");
    } finally {
      setLoadingResearch(false);
    }
  };

  const handleGenerateDecision = async () => {
    if (!decisionInput.trim()) return;
    setLoadingDecision(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentType: 'decision', inputData: decisionInput })
      });
      const json = await res.json();
      if (json.success) {
        setDecisionResult(json.data);
        triggerToast("Matrix analysis calculated!");
      }
    } catch (err) {
      triggerToast("AI Generation error.");
    } finally {
      setLoadingDecision(false);
    }
  };

  const handleSummarizeNotes = async () => {
    if (!noteContent.trim()) return;
    setLoadingNotesAI(true);
    try {
      // Simulate notes synthesis
      await new Promise(resolve => setTimeout(resolve, 900));
      const extractedActionItems = [
        "Update repository structure documentation",
        "Perform deployment check on sandbox env",
        "Refine navigation layout transitions"
      ];
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteTitle || 'Session Notes',
        content: noteContent,
        summary: "Synthetic breakdown outlines next routing structures, repository packaging rules, and manual test checklists.",
        actionItems: extractedActionItems
      };
      setNotes([newNote, ...notes]);
      setNoteContent('');
      triggerToast("Notes processed! Action items ready to be added as tasks.");
    } catch (err) {
      triggerToast("AI Notes synthesis error.");
    } finally {
      setLoadingNotesAI(false);
    }
  };

  const handleGenerateEmail = async () => {
    setLoadingEmail(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentType: 'email', inputData: emailForm })
      });
      const json = await res.json();
      if (json.success) {
        setEmailResult(json.data);
        triggerToast("Email draft created!");
      }
    } catch (err) {
      triggerToast("Email AI Generation error.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // Filtration for Emergency Mode
  const displayedTasks = emergencyMode 
    ? tasks.filter(t => t.priority === 'high' && t.status === 'todo')
    : tasks;

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const taskProgressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#06041c] text-white' : 'bg-slate-50 text-slate-900'} transition-all duration-300`}>
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl glass-card border border-brand-500/30 text-brand-300 shadow-2xl flex items-center gap-2 text-sm font-medium"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <aside className="hidden lg:flex flex-col w-72 glass-panel border-r border-white/10 p-6 space-y-8 relative overflow-hidden bg-black/40">
        {/* Glow behind logo */}
        <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg shadow-brand-500/20">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">LifePilot <span className="text-brand-400 font-normal">AI</span></h1>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Self-Driving Ops</p>
          </div>
        </div>

        {/* Dynamic Navigation */}
        <nav className="flex-1 space-y-1.5 relative z-10">
          {[
            { id: 'overview', label: 'Console Overview', icon: <TrendingUp className="w-4.5 h-4.5" /> },
            { id: 'planner', label: 'AI Schedule Planner', icon: <Calendar className="w-4.5 h-4.5" /> },
            { id: 'research', label: 'Roadmap Research', icon: <Map className="w-4.5 h-4.5" /> },
            { id: 'reminders', label: 'Alerts & Reminders', icon: <Clock className="w-4.5 h-4.5" /> },
            { id: 'goals', label: 'Goal Tracker', icon: <CheckSquare className="w-4.5 h-4.5" /> },
            { id: 'notes', label: 'Smart Notes', icon: <Brain className="w-4.5 h-4.5" /> },
            { id: 'email', label: 'Email Generator', icon: <Mail className="w-4.5 h-4.5" /> },
            { id: 'decision', label: 'Decision Assistant', icon: <Scale className="w-4.5 h-4.5" /> },
            { id: 'wellness', label: 'Wellness Coach', icon: <Activity className="w-4.5 h-4.5" /> },
            { id: 'settings', label: 'Preferences', icon: <SettingsIcon className="w-4.5 h-4.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-brand-600/30 to-indigo-600/10 border border-brand-500/40 text-brand-200 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Emergency stress trigger */}
        <div className="pt-4 border-t border-white/5 relative z-10">
          <button
            onClick={handleToggleEmergency}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-xl ${
              emergencyMode 
                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/40 shadow-emerald-500/10' 
                : 'bg-rose-950/40 border border-rose-500/50 text-rose-400 hover:bg-rose-900/40 shadow-rose-500/10'
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${emergencyMode ? 'animate-pulse' : ''}`} />
            {emergencyMode ? 'Emergency Active' : 'Trigger Stress mode'}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Dynamic header background gradient depending on emergency mode */}
        <div className={`absolute top-0 inset-x-0 h-80 pointer-events-none transition-all duration-1000 ${
          emergencyMode 
            ? 'bg-gradient-to-b from-emerald-900/15 via-emerald-950/0 to-transparent' 
            : 'bg-gradient-to-b from-brand-900/10 via-[#06041c]/0 to-transparent'
        }`} />

        {/* TOP NAVBAR */}
        <header className="relative z-10 h-20 px-6 sm:px-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-0">
            {/* Mobile menu logo backup */}
            <div className="lg:hidden p-1.5 rounded-lg bg-brand-600">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight capitalize font-outfit">
                {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-xs text-gray-500">
                {emergencyMode ? 'Calm and focused mode active' : 'All systems clear. AI co-pilot online.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-gray-400">{profile.name}</span>
              <span className="text-[10px] text-gray-600 font-mono">Sandbox Mode</span>
            </div>
            
            {/* Quick action profile modal or quick settings */}
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-300 font-bold text-sm shadow">
              {profile.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* TAB WORKSPACE */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Analytics Header Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Task completion</span>
                    <h3 className="text-2xl font-bold font-outfit">{taskProgressPercent}%</h3>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-brand-500" style={{ width: `${taskProgressPercent}%` }} />
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-900/30 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Active Goals</span>
                    <h3 className="text-2xl font-bold font-outfit">
                      {goals.filter(g => g.status === 'todo').length} <span className="text-sm font-normal text-gray-400">pending</span>
                    </h3>
                    <span className="text-[10px] text-teal-400 font-mono">1 goal met today</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-teal-900/30 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Hydration Tracker</span>
                    <h3 className="text-2xl font-bold font-outfit">{waterGlasses} <span className="text-sm font-normal text-gray-400">/ 8 gl</span></h3>
                    <button 
                      onClick={() => { setWaterGlasses(waterGlasses + 1); triggerToast("Hydrated! Keep it up."); }}
                      className="text-[10px] text-brand-400 hover:text-brand-300 font-bold underline mt-1 block"
                    >
                      +1 Glass Water
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-900/20 border border-brand-500/10 flex items-center justify-center text-indigo-400">
                    <Droplet className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Cognitive Load</span>
                    <h3 className={`text-2xl font-bold font-outfit ${emergencyMode ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {emergencyMode ? 'Minimal' : 'Moderate'}
                    </h3>
                    <span className="text-[10px] text-gray-500">Based on task priority ratios</span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${emergencyMode ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400' : 'bg-amber-950/40 border border-amber-500/20 text-amber-400'}`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Grid split: Checklist and side widget panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Checklist column */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h4 className="text-lg font-bold font-outfit flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-brand-400" />
                      Task Management Board
                    </h4>
                    <span className="text-xs text-gray-500 font-mono">{displayedTasks.length} tasks matching</span>
                  </div>

                  {/* Add task bar */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a custom task to your checklist..."
                      className="flex-1 px-4 py-2 text-sm rounded-xl glass-input border border-white/10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTask((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                  </div>

                  {/* Tasks items list */}
                  <div className="space-y-3">
                    {displayedTasks.map((t) => (
                      <div 
                        key={t.id} 
                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 border ${
                          t.status === 'done' 
                            ? 'bg-black/10 border-white/5 opacity-60' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTask(t.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              t.status === 'done' 
                                ? 'bg-brand-600 border-brand-500' 
                                : 'border-gray-500 hover:border-brand-500'
                            }`}
                          >
                            {t.status === 'done' && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                          <div>
                            <p className={`text-sm ${t.status === 'done' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                              {t.title}
                            </p>
                            <div className="flex gap-2 items-center mt-1">
                              <span className="text-[10px] text-gray-500 font-mono">{t.duration}</span>
                              <span className="text-[10px] text-gray-500">•</span>
                              <span className="text-[10px] text-gray-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">{t.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider ${
                            t.priority === 'high' ? 'bg-rose-950/40 border border-rose-500/30 text-rose-400' :
                            t.priority === 'medium' ? 'bg-amber-950/40 border border-amber-500/30 text-amber-400' :
                            'bg-slate-900 border border-slate-700 text-slate-400'
                          }`}>
                            {t.priority}
                          </span>
                          <button 
                            onClick={() => handleDeleteTask(t.id)}
                            className="text-gray-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {displayedTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No pending objectives matching. Relax!
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side widgets column */}
                <div className="space-y-6">
                  {/* AI Suggestions widget */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-gradient-to-tr from-brand-950/10 via-black/10 to-indigo-950/10">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                      <Lightbulb className="w-5 h-5 text-brand-400" />
                      <h4 className="text-sm font-bold font-outfit">AI Pilot Suggestions</h4>
                    </div>
                    <div className="space-y-3 text-xs leading-relaxed text-gray-400">
                      <p>
                        💡 <strong>Priority insight:</strong> Focus on your <em>"Kaggle capstone submission"</em>. It represents the bulk of today's cognitive weight (estimated 2 hours).
                      </p>
                      <p>
                        💧 <strong>Wellness tip:</strong> You haven't checked off your hydration goals. Consider stepping away for 2 minutes to drink a glass of water.
                      </p>
                    </div>
                  </div>

                  {/* Calendar Widget */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      <h4 className="text-sm font-bold font-outfit">Schedule Tracker</h4>
                    </div>
                    
                    {/* Minimal Grid calendar preview */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="text-gray-500 font-mono py-1">{d}</div>
                      ))}
                      {[6, 7, 8, 9, 10, 11, 12].map((day, i) => {
                        const isToday = day === 6; // Mocking today is July 6th
                        return (
                          <div 
                            key={i} 
                            className={`py-2 rounded-lg font-mono relative transition-colors ${
                              isToday 
                                ? 'bg-brand-600 text-white font-bold' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            {day}
                            {/* Dot indicator if events exist */}
                            {day % 2 === 0 && (
                              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-400 rounded-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: AI PLANNER AGENT */}
          {activeTab === 'planner' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-outfit">Decompose Objectives</h3>
                  <p className="text-sm text-gray-400">Tell the agent your main objective (e.g., "Build React prototype in 3 days"). It will plan the exact tasks, prioritize them, and schedule your calendar block.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={plannerGoal}
                    onChange={(e) => setPlannerGoal(e.target.value)}
                    placeholder="Enter your objective..."
                    className="flex-1 px-4 py-3 rounded-xl glass-input"
                  />
                  <button
                    onClick={handleGeneratePlan}
                    disabled={loadingPlanner}
                    className="px-6 py-3 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-500/20 disabled:opacity-50"
                  >
                    {loadingPlanner ? 'Processing...' : 'Run Planner'}
                    <Sparkles className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {plannerResult && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Co-Pilot Insight */}
                  <div className="p-5 rounded-2xl bg-brand-950/20 border border-brand-500/20 text-brand-300 text-sm leading-relaxed">
                    💡 <strong>Co-Pilot Guidance:</strong> {plannerResult.copilotGuidance}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Task Breakdown */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Step Checklist</h4>
                      <div className="space-y-3">
                        {plannerResult.tasks?.map((t: any, i: number) => (
                          <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                            <div>
                              <div className="text-sm font-semibold">{t.title}</div>
                              <div className="text-xs text-gray-500 mt-1 font-mono">{t.duration} • {t.category}</div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-950 border border-brand-500/20 text-brand-300">
                              {t.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule block */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Daily Calendar Slots</h4>
                      <div className="space-y-3">
                        {plannerResult.schedule?.map((s: any, i: number) => (
                          <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-4 items-center">
                            <span className="text-xs font-mono text-brand-400 w-32">{s.time}</span>
                            <div className="text-sm">{s.task}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 3: RESEARCH ROADMAP AGENT */}
          {activeTab === 'research' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-outfit">Study Roadmap Generator</h3>
                  <p className="text-sm text-gray-400">Enter any concept, technology, or topic. The agent constructs a multi-phase learning path, resource links, and milestones checkmarks.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={researchTopic}
                    onChange={(e) => setResearchTopic(e.target.value)}
                    placeholder="Enter study topic (e.g. Deep Learning, Web3 Core)..."
                    className="flex-1 px-4 py-3 rounded-xl glass-input"
                  />
                  <button
                    onClick={handleGenerateRoadmap}
                    disabled={loadingResearch}
                    className="px-6 py-3 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingResearch ? 'Researching...' : 'Build Roadmap'}
                    <Sparkles className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {researchResult && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-lg mb-2 font-outfit">Agent Roadmap Synthesis</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{researchResult.summary}</p>
                  </div>

                  {/* Roadmap Phases */}
                  <div className="space-y-4">
                    {researchResult.roadmap?.map((phase: any, i: number) => (
                      <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-xs font-bold text-brand-300 font-mono">
                            {i+1}
                          </span>
                          <h5 className="font-bold text-sm sm:text-base">{phase.phase}</h5>
                        </div>
                        <p className="text-xs text-gray-500 pl-9">{phase.description}</p>
                        <ul className="space-y-1.5 pl-9 text-xs text-gray-400">
                          {phase.items?.map((item: string, j: number) => (
                            <li key={j} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Resource Recommendation and Milestone checkbox checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
                        <BookOpen className="w-4.5 h-4.5 text-indigo-400" />
                        Suggested Resources
                      </h4>
                      <div className="space-y-3">
                        {researchResult.resources?.map((res: any, i: number) => (
                          <a 
                            key={i} 
                            href={res.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors"
                          >
                            <div>
                              <div className="text-xs font-semibold text-brand-300">{res.type}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{res.title}</div>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">Visit →</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Validation Milestones</h4>
                      <div className="space-y-3">
                        {researchResult.milestones?.map((m: any, i: number) => (
                          <div 
                            key={i} 
                            className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3 cursor-pointer"
                            onClick={() => {
                              const updatedMilestones = [...researchResult.milestones];
                              updatedMilestones[i].checked = !updatedMilestones[i].checked;
                              setResearchResult({ ...researchResult, milestones: updatedMilestones });
                              triggerToast("Milestone updated!");
                            }}
                          >
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${m.checked ? 'bg-brand-600 border-brand-500' : 'border-gray-500'}`}>
                              {m.checked && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={`text-xs ${m.checked ? 'line-through text-gray-500' : 'text-gray-300'}`}>{m.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 4: ALERTS & REMINDERS */}
          {activeTab === 'reminders' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Add Reminder Column */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 h-fit">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Set Reminder</h4>
                  
                  <form onSubmit={handleAddReminder} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Reminder Title</label>
                      <input
                        type="text"
                        value={newReminderTitle}
                        onChange={(e) => setNewReminderTitle(e.target.value)}
                        placeholder="e.g. Pay Internet Bill"
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Deadline Date/Time</label>
                      <input
                        type="datetime-local"
                        value={newReminderDeadline}
                        onChange={(e) => setNewReminderDeadline(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm text-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Category Type</label>
                      <select
                        value={newReminderType}
                        onChange={(e) => setNewReminderType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm text-gray-300 bg-black"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="medicine">Medicine</option>
                        <option value="bill">Bill</option>
                        <option value="birthday">Birthday</option>
                        <option value="interview">Interview</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all"
                    >
                      Save Reminder
                    </button>
                  </form>
                </div>

                {/* Reminder display lists */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Scheduled Deadlines</h4>
                  
                  <div className="space-y-3">
                    {reminders.map((r) => (
                      <div key={r.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            r.type === 'meeting' ? 'bg-indigo-400' :
                            r.type === 'medicine' ? 'bg-emerald-400' :
                            r.type === 'bill' ? 'bg-rose-400' : 'bg-amber-400'
                          }`} />
                          <div>
                            <div className="text-sm font-semibold">{r.title}</div>
                            <div className="text-xs text-gray-500 mt-1 font-mono">
                              Deadline: {new Date(r.deadline).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded text-gray-400">
                            {r.type}
                          </span>
                          <button
                            onClick={() => handleDeleteReminder(r.id)}
                            className="text-gray-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {reminders.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        No upcoming deadlines scheduled.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: GOAL TRACKER */}
          {activeTab === 'goals' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Form */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 h-fit">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Define Goal</h4>
                  <form onSubmit={handleAddGoal} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Goal Description</label>
                      <input
                        type="text"
                        value={newGoalInput}
                        onChange={(e) => setNewGoalInput(e.target.value)}
                        placeholder="e.g. Exercise for 30 minutes"
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Interval</label>
                      <select
                        value={newGoalType}
                        onChange={(e) => setNewGoalType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm text-gray-300 bg-black"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500"
                    >
                      Add Goal
                    </button>
                  </form>
                </div>

                {/* Goals Lists */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Activity Checkmarks</h4>
                    <span className="text-xs text-gray-500 font-mono">
                      {goals.filter(g => g.status === 'done').length} / {goals.length} completed
                    </span>
                  </div>

                  <div className="space-y-4">
                    {['daily', 'weekly', 'monthly'].map((type) => {
                      const list = goals.filter(g => g.type === type);
                      if (list.length === 0) return null;
                      return (
                        <div key={type} className="space-y-2">
                          <h5 className="text-xs font-mono text-brand-400 uppercase tracking-widest pl-1">{type} objectives</h5>
                          <div className="space-y-2">
                            {list.map((g) => (
                              <div 
                                key={g.id}
                                className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                              >
                                <button
                                  onClick={() => handleToggleGoal(g.id)}
                                  className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${
                                    g.status === 'done' ? 'bg-brand-600 border-brand-500' : 'border-gray-500'
                                  }`}
                                >
                                  {g.status === 'done' && <Check className="w-3.5 h-3.5 text-white" />}
                                </button>
                                <span className={`text-sm ${g.status === 'done' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                  {g.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: SMART NOTES */}
          {activeTab === 'notes' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Editor Section */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Note pad</h4>
                  
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                  />
                  
                  <textarea
                    rows={8}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Type or paste your raw research insights, session logs, or brainstorm ideas here..."
                    className="w-full p-4 rounded-xl glass-input text-sm resize-none"
                  />

                  <button
                    onClick={handleSummarizeNotes}
                    disabled={loadingNotesAI}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    {loadingNotesAI ? 'Synthesizing...' : 'Summarize & Extract Action Items'}
                    <Sparkles className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* History Section */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 h-[400px] overflow-y-auto">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Saved Summaries</h4>
                  
                  <div className="space-y-4">
                    {notes.map((n) => (
                      <div key={n.id} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                        <div className="font-bold text-xs text-brand-300">{n.title}</div>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-light">{n.summary}</p>
                        
                        {n.actionItems.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            <div className="text-[10px] font-mono text-gray-500 uppercase">Extracted Tasks:</div>
                            {n.actionItems.map((item, index) => (
                              <div key={index} className="flex justify-between items-center gap-2">
                                <span className="text-[10px] text-gray-400 line-clamp-1">{item}</span>
                                <button
                                  onClick={() => handleAddTask(item, '1h', 'medium', 'Notes AI')}
                                  className="p-1 rounded bg-brand-600 hover:bg-brand-500 text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: EMAIL GENERATOR */}
          {activeTab === 'email' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Form Input */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 h-fit">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Email Parameters</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Template Type</label>
                      <select
                        value={emailForm.type}
                        onChange={(e) => setEmailForm({ ...emailForm, type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm text-gray-300 bg-black"
                      >
                        <option value="leave">Leave Request</option>
                        <option value="internship">Internship Inquiry</option>
                        <option value="followup">Follow-Up Email</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Recipient Name / Role</label>
                      <input
                        type="text"
                        value={emailForm.recipient}
                        onChange={(e) => setEmailForm({ ...emailForm, recipient: e.target.value })}
                        placeholder="Manager Name, Company"
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Sender Signature</label>
                      <input
                        type="text"
                        value={emailForm.sender}
                        onChange={(e) => setEmailForm({ ...emailForm, sender: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Additional Details</label>
                      <textarea
                        rows={3}
                        value={emailForm.details}
                        onChange={(e) => setEmailForm({ ...emailForm, details: e.target.value })}
                        placeholder="Key reasons, schedules, background info..."
                        className="w-full p-3 rounded-xl glass-input text-sm resize-none"
                      />
                    </div>

                    <button
                      onClick={handleGenerateEmail}
                      disabled={loadingEmail}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      {loadingEmail ? 'Generating...' : 'Compose Draft'}
                      <Sparkles className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Email Display */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Generated Draft</h4>
                  
                  {emailResult ? (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-3">
                        <div className="text-xs text-gray-400">
                          <strong>Subject:</strong> {emailResult.subject}
                        </div>
                        <hr className="border-white/5" />
                        <div className="text-xs text-gray-300 whitespace-pre-line leading-relaxed font-mono">
                          {emailResult.body}
                        </div>
                      </div>
                      
                      <div className="text-[11px] text-brand-300 italic">
                        {emailResult.copilotTip}
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`Subject: ${emailResult.subject}\n\n${emailResult.body}`);
                          triggerToast("Copied to clipboard!");
                        }}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy text
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-24 text-gray-500 text-sm">
                      Select templates and configure options to draft email drafts.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: DECISION ASSISTANT */}
          {activeTab === 'decision' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-outfit">Decision Matrix Assistant</h3>
                  <p className="text-sm text-gray-400">Input options to compare (e.g., "Next.js App Router vs Pages Router") to compute critical risks, pros, cons, and weighted confidence scores.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={decisionInput}
                    onChange={(e) => setDecisionInput(e.target.value)}
                    placeholder="Option A vs Option B..."
                    className="flex-1 px-4 py-3 rounded-xl glass-input"
                  />
                  <button
                    onClick={handleGenerateDecision}
                    disabled={loadingDecision}
                    className="px-6 py-3 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    {loadingDecision ? 'Analyzing...' : 'Analyze Decision'}
                    <Sparkles className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {decisionResult && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Gauge score and suggestion */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center space-y-2">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                          <circle cx="48" cy="48" r="40" stroke="#633eff" strokeWidth="6" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * decisionResult.confidenceScore) / 100} />
                        </svg>
                        <span className="absolute text-xl font-bold font-mono">{decisionResult.confidenceScore}%</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Confidence Score</span>
                    </div>

                    <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-brand-400 mb-2 font-mono">AI Pilot Recommendation</h4>
                      <p className="text-sm text-gray-300 leading-relaxed font-light">{decisionResult.recommendation}</p>
                    </div>
                  </div>

                  {/* Comparison Metrics Grid */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Metrics Breakdown</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-500">
                            <th className="pb-2 font-semibold">Factor</th>
                            <th className="pb-2 font-semibold">{decisionResult.options[0]}</th>
                            <th className="pb-2 font-semibold">{decisionResult.options[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                          {decisionResult.metrics?.map((m: any, idx: number) => (
                            <tr key={idx}>
                              <td className="py-2.5 font-semibold text-brand-300">{m.label}</td>
                              <td className="py-2.5">{m.valueA}</td>
                              <td className="py-2.5">{m.valueB}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {decisionResult.options.map((opt: string) => {
                      const data = decisionResult.prosCons[opt];
                      if (!data) return null;
                      return (
                        <div key={opt} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                          <h4 className="font-bold text-sm text-brand-300 font-outfit">{opt} Analysis</h4>
                          
                          <div className="space-y-2">
                            <div className="text-[10px] uppercase font-mono text-emerald-400 pl-1">Pros:</div>
                            <ul className="space-y-1.5 pl-4 text-xs text-gray-400">
                              {data.pros.map((p: string, idx: number) => (
                                <li key={idx} className="list-disc">{p}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-white/5">
                            <div className="text-[10px] uppercase font-mono text-rose-400 pl-1">Cons:</div>
                            <ul className="space-y-1.5 pl-4 text-xs text-gray-400">
                              {data.cons.map((c: string, idx: number) => (
                                <li key={idx} className="list-disc">{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </motion.div>
              )}
            </div>
          )}

          {/* TAB 9: WELLNESS COACH */}
          {activeTab === 'wellness' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Tracker Widget */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Habit Metrics</h4>
                  
                  {/* Hydration Widget */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Hydration Progress</span>
                      <span className="font-mono">{waterGlasses}/8 glasses</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`flex-1 h-full ${i < waterGlasses ? 'bg-indigo-400' : 'bg-white/5'}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setWaterGlasses(Math.min(8, waterGlasses + 1)); triggerToast("Hydrated!"); }}
                        className="flex-1 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 text-xs font-semibold hover:bg-indigo-900/30"
                      >
                        +1 Glass
                      </button>
                      <button 
                        onClick={() => setWaterGlasses(0)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-xs"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Sleep Tracker */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Rest Metric</span>
                      <span className="font-mono">{sleepHours} hours sleep</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button 
                        onClick={() => setSleepHours(Math.max(4, sleepHours - 0.5))}
                        className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-bold text-sm">{sleepHours}h</div>
                      <button 
                        onClick={() => setSleepHours(Math.min(12, sleepHours + 0.5))}
                        className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side coaching guidance */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                  <h4 className="font-bold font-outfit text-sm uppercase tracking-wider text-gray-400">Balance Coaching</h4>
                  
                  <div className="p-4 bg-brand-950/20 border border-brand-500/20 rounded-xl text-xs text-brand-300 leading-relaxed">
                    💡 <strong>Wellness Insight:</strong> Work-life balance is key to continuous high productivity. Taking structured micro-breaks increases focus.
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Hydration Check", desc: "Drink 250ml of water right now. Keep a bottle at your desk.", category: "hydration" },
                      { title: "20-20-20 Rule", desc: "Look away from your screen at an object 20 feet away for 20 seconds to rest your eyes.", category: "exercise" },
                      { title: "Desk Stretch", desc: "Roll your shoulders backward 5 times and stretch your wrists.", category: "exercise" }
                    ].map((s, idx) => (
                      <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400">
                          <Coffee className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{s.title}</div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-outfit">User Preferences</h3>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500">Preferred Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Enter name..."
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-500">Gemini API Key (Optional)</label>
                    <input
                      type="password"
                      value={profile.apiKey}
                      onChange={(e) => setProfile({ ...profile, apiKey: e.target.value })}
                      placeholder="AI Studio API Key (Falls back to high-fidelity mock if blank)"
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs text-gray-500">Theme Selector</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                          theme === 'dark' 
                            ? 'bg-brand-600 border-brand-500 text-white' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        Dark Mode
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                          theme === 'light' 
                            ? 'bg-brand-600 border-brand-500 text-white' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        Light Mode
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => triggerToast("Preferences updated locally!")}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white text-sm font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
