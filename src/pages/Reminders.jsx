import React, { useState, useEffect } from "react";
import { Button } from "../components/common/Button";
import { Plus, Calendar, Trash2 } from "lucide-react";

export const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", date: "" });

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          if (!reminder.notified && now >= new Date(reminder.date)) {
            showNotification(reminder.title);
            return { ...reminder, notified: true };
          }
          return reminder;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showNotification = (message) => {
    const audio = new Audio("/tone.mp3");
    audio.play().catch((err) => console.log("Audio play failed:", err));

    if (Notification.permission === "granted") {
      new Notification("Study Sphere Reminder 🔔", {
        body: message,
        icon: "/favicon.ico",
      });
    } else {
      alert(`🔔 Reminder: ${message}`);
    }
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.date) return;

    const reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      date: new Date(newReminder.date),
      notified: false,
    };

    setReminders((prev) => [...prev, reminder]);
    setNewReminder({ title: "", date: "" });
    setShowForm(false);
  };

  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Reminders</h1>
          <p className="text-xl text-blue-100">
            Stay on track with your study tasks and deadlines.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            size="lg"
            icon={Plus}
            className="w-full sm:w-auto"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add a new Reminder"}
          </Button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddReminder}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Reminder Title
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, title: e.target.value })
                }
                placeholder="e.g. Submit Math Assignment"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={newReminder.date}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, date: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button type="submit" size="md">
              Save Reminder
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {reminders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No reminders yet. Add one above!
            </p>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <div>
                  <h3 className="font-semibold">{reminder.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {reminder.date.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
