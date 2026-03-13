import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  calculateQueueTotal,
  calculateTimeSaved,
  formatDuration,
  toMinutes
} from '../../utils/calculations';
import { saveReadingQueue, loadReadingQueue, loadPreferredSpeed } from '../../utils/storage';
import SectionWrapper from '../common/SectionWrapper';
import './ReadingQueue.css';

export default function ReadingQueue() {
  const [books, setBooks] = useState(loadReadingQueue());
  const [speed, setSpeed] = useState(loadPreferredSpeed());
  const [newBook, setNewBook] = useState({ title: '', hours: '', minutes: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    saveReadingQueue(books);
  }, [books]);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && (newBook.hours || newBook.minutes)) {
      const book = {
        id: Date.now(),
        title: newBook.title,
        hours: parseInt(newBook.hours) || 0,
        minutes: parseInt(newBook.minutes) || 0
      };
      setBooks([...books, book]);
      setNewBook({ title: '', hours: '', minutes: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const totalQueue = calculateQueueTotal(books, speed);
  const totalOriginal = calculateQueueTotal(books, 1);
  const timeSaved = calculateTimeSaved(totalOriginal.hours, totalOriginal.minutes, speed);

  return (
    <SectionWrapper id="reading-queue">
      <h2 className="section-title">My Reading Queue</h2>
      <p className="section-description">
        Track multiple audiobooks and see your total listening time
      </p>

      <div className="queue-container">
        <div className="queue-controls">
          <div className="speed-selector">
            <label className="speed-label">Playback Speed:</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(Math.max(0.5, Math.min(3, parseFloat(e.target.value) || 1)))}
              step="0.1"
              min="0.5"
              max="3"
              className="speed-input-small"
            />
            <span className="speed-unit">x</span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-book-btn"
          >
            {showAddForm ? '✕ Cancel' : '+ Add Book'}
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.form
              className="add-book-form"
              onSubmit={handleAddBook}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Book title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="book-title-input"
                required
              />
              <div className="duration-inputs-inline">
                <input
                  type="number"
                  placeholder="0"
                  value={newBook.hours}
                  onChange={(e) => setNewBook({ ...newBook, hours: e.target.value })}
                  min="0"
                  max="50"
                  className="duration-input-small"
                />
                <span>hours</span>
                <input
                  type="number"
                  placeholder="0"
                  value={newBook.minutes}
                  onChange={(e) => setNewBook({ ...newBook, minutes: e.target.value })}
                  min="0"
                  max="59"
                  className="duration-input-small"
                />
                <span>min</span>
              </div>
              <button type="submit" className="submit-book-btn">
                Add to Queue
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {books.length === 0 ? (
          <motion.div
            className="empty-queue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">📚</div>
            <p className="empty-text">Your reading queue is empty</p>
            <p className="empty-subtext">Add your first audiobook to get started!</p>
          </motion.div>
        ) : (
          <>
            <div className="queue-list">
              <AnimatePresence>
                {books.map((book, index) => {
                  const bookMinutes = toMinutes(book.hours, book.minutes);
                  const adjustedMinutes = bookMinutes / speed;
                  const { hours, minutes } = { hours: Math.floor(adjustedMinutes / 60), minutes: Math.round(adjustedMinutes % 60) };

                  return (
                    <motion.div
                      key={book.id}
                      className="queue-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <div className="book-number">{index + 1}</div>
                      <div className="book-info">
                        <div className="book-title">{book.title}</div>
                        <div className="book-duration">
                          {formatDuration(book.hours, book.minutes)} → {formatDuration(hours, minutes)} at {speed}x
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveBook(book.id)}
                        className="remove-btn"
                        aria-label="Remove book"
                      >
                        ✕
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div
              className="queue-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="summary-row">
                <span className="summary-label">Total books:</span>
                <span className="summary-value">{books.length}</span>
              </div>
              <div className="summary-row highlight">
                <span className="summary-label">Queue time at {speed}x:</span>
                <span className="summary-value">{formatDuration(totalQueue.hours, totalQueue.minutes)}</span>
              </div>
              <div className="summary-row original">
                <span className="summary-label">Original time:</span>
                <span className="summary-value">{formatDuration(totalOriginal.hours, totalOriginal.minutes)}</span>
              </div>
              {speed > 1 && (
                <div className="summary-row saved">
                  <span className="summary-label">⚡ Time saved:</span>
                  <span className="summary-value saved-value">
                    {formatDuration(timeSaved.hours, timeSaved.minutes)}
                  </span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
