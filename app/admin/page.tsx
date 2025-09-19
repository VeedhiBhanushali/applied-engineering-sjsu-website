'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './admin.module.css';

interface Event {
  id: string;
  name: string;
  date: string;
  month: string;
  day: number;
}

export default function AdminPortal() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    month: 'SEPTEMBER',
    day: 1
  });

  // Load events from localStorage on component mount
  const EVENTS_VERSION = 'v3';
  useEffect(() => {
    const savedEvents = localStorage.getItem('ae-events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Check if we need to update the Applications Open date
      const updatedEvents = parsedEvents.map((event: Event) => {
        if (event.name === 'APPLICATIONS OPEN' && event.date === '09/04') {
          return { ...event, date: '09/05', day: 5 };
        }
        return event;
      });
      setEvents(updatedEvents);
      // Save the updated events back to localStorage
      localStorage.setItem('ae-events', JSON.stringify(updatedEvents));
      localStorage.setItem('ae-events-version', EVENTS_VERSION);
    } else {
      // Default events if none exist
      const defaultEvents: Event[] = [
        { id: '1', name: 'APPLICATIONS OPEN', date: '09/05', month: 'SEPTEMBER', day: 5 },
        { id: '2', name: 'STUDENT ORG FAIR TABLING', date: '09/09', month: 'SEPTEMBER', day: 9 },
        { id: '3', name: 'INFO SESSION #1', date: '09/22', month: 'SEPTEMBER', day: 22 },
        { id: '4', name: 'BOARD APPLICATIONS CLOSE', date: '09/23', month: 'SEPTEMBER', day: 23 },
        { id: '5', name: 'INFO SESSION #2', date: '09/25', month: 'SEPTEMBER', day: 25 },
        { id: '6', name: 'APPLICATIONS CLOSE', date: '09/29', month: 'SEPTEMBER', day: 29 },
        { id: '7', name: 'TECHNICAL INTERVIEWS BEGIN', date: '09/30', month: 'SEPTEMBER', day: 30 },
        { id: '8', name: 'TECHNICAL INTERVIEWS END', date: '10/03', month: 'OCTOBER', day: 3 },
        { id: '9', name: 'BEHAVIOURAL INTERVIEWS', date: '10/04', month: 'OCTOBER', day: 4 },
        { id: '10', name: 'ACCEPTANCES SENT', date: '10/05', month: 'OCTOBER', day: 5 },
        { id: '11', name: 'WELCOME DINNER', date: '10/06', month: 'OCTOBER', day: 6 }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('ae-events', JSON.stringify(defaultEvents));
      localStorage.setItem('ae-events-version', EVENTS_VERSION);
    }
  }, []);

  // Save events to localStorage whenever events change
  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem('ae-events', JSON.stringify(updatedEvents));
    localStorage.setItem('ae-events-version', EVENTS_VERSION);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowAddForm(false);
  };

  const handleSave = () => {
    if (editingEvent) {
      const updatedEvents = events.map(e => 
        e.id === editingEvent.id ? editingEvent : e
      );
      saveEvents(updatedEvents);
      setEditingEvent(null);
    }
  };

  const handleAdd = () => {
    if (newEvent.name && newEvent.day) {
      const event: Event = {
        id: Date.now().toString(),
        name: newEvent.name.toUpperCase(),
        date: `${newEvent.month.substring(0, 2)}/${newEvent.day.toString().padStart(2, '0')}`,
        month: newEvent.month,
        day: newEvent.day
      };
      saveEvents([...events, event]);
      setNewEvent({ name: '', date: '', month: 'SEPTEMBER', day: 1 });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      saveEvents(updatedEvents);
    }
  };

  const months = ['SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <Image src="/ae-logo.png" alt="AE Logo" width={40} height={24} className={styles.logo} />
        </Link>
        <h1 className={styles.title}>EVENT ADMIN PORTAL</h1>
        <Link href="/" className={styles.backLink}>← Back to Site</Link>
      </header>

      <div className={styles.content}>
        <div className={styles.controls}>
          <button 
            className={styles.addButton}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add New Event'}
          </button>
        </div>

        {showAddForm && (
          <div className={styles.form}>
            <h3>Add New Event</h3>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                className={styles.input}
              />
              <select
                value={newEvent.month}
                onChange={(e) => setNewEvent({...newEvent, month: e.target.value})}
                className={styles.select}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Day"
                min="1"
                max="31"
                value={newEvent.day}
                onChange={(e) => setNewEvent({...newEvent, day: parseInt(e.target.value) || 1})}
                className={styles.input}
              />
              <button onClick={handleAdd} className={styles.saveButton}>
                Add Event
              </button>
            </div>
          </div>
        )}

        <div className={styles.eventsList}>
          <h3>Current Events</h3>
          {events.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              {editingEvent?.id === event.id ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value.toUpperCase()})}
                    className={styles.input}
                  />
                  <select
                    value={editingEvent.month}
                    onChange={(e) => setEditingEvent({...editingEvent, month: e.target.value})}
                    className={styles.select}
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={editingEvent.day}
                    onChange={(e) => setEditingEvent({...editingEvent, day: parseInt(e.target.value) || 1})}
                    className={styles.input}
                  />
                  <button onClick={handleSave} className={styles.saveButton}>
                    Save
                  </button>
                  <button onClick={() => setEditingEvent(null)} className={styles.cancelButton}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className={styles.eventDisplay}>
                  <div className={styles.eventInfo}>
                    <span className={styles.eventName}>{event.name}</span>
                    <span className={styles.eventDate}>{event.date}</span>
                  </div>
                  <div className={styles.eventActions}>
                    <button onClick={() => handleEdit(event)} className={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.instructions}>
          <h3>Instructions</h3>
          <ul>
            <li>Click "Add New Event" to create a new recruitment event</li>
            <li>Click "Edit" to modify an existing event's name, month, or day</li>
            <li>Click "Delete" to remove an event (with confirmation)</li>
            <li>Changes are automatically saved and will appear on the main site</li>
            <li>Event names will be automatically converted to uppercase</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
