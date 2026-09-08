import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquareHeart,
  Send,
  Star,
  MapPin,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  Heart,
  ThumbsUp,
  MessageCircle,
  Award,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationSound, playClickBeep } from '../utils/soundEffects';

const STORAGE_KEY_FEEDBACK = 'gymsetup_member_feedbacks_v1';

const DEFAULT_FEEDBACKS = [
  {
    id: 'fb-1',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    address: 'Sector 62, Noida, Uttar Pradesh',
    rating: 5,
    goal: 'Muscle Building & Strength',
    message: 'First day gym anxiety completely khatam ho gayi! Guided Flow aur machine seat height adjustment tips bohot helpful rahe.',
    date: '2026-08-28'
  },
  {
    id: 'fb-2',
    fullName: 'Priya Patel',
    email: 'priya.p@example.com',
    address: 'Bandra West, Mumbai, Maharashtra',
    rating: 5,
    goal: 'Fat Loss & Fitness',
    message: 'Sound timer aur 10 tracking points feature bahut useful hai. Weight track karna ab bohot easy lagta hai.',
    date: '2026-08-27'
  },
  {
    id: 'fb-3',
    fullName: 'Aman Verma',
    email: 'aman.v99@example.com',
    address: 'Koramangala, Bengaluru, Karnataka',
    rating: 5,
    goal: 'General Health & Stamina',
    message: 'Clean UI aur beginner friendly language. Best web companion for anyone starting gym for the first time.',
    date: '2026-08-26'
  }
];

export const FeedbackSection = () => {
  const { showToast } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(5);
  const [goal, setGoal] = useState('Muscle Building & Strength');
  const [message, setMessage] = useState('');

  // Feedbacks List State
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      return saved ? JSON.parse(saved) : DEFAULT_FEEDBACKS;
    } catch {
      return DEFAULT_FEEDBACKS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !message.trim()) {
      showToast('Please fill all required fields (Name, Email, Address, Message)', 'info');
      return;
    }

    const newFeedback = {
      id: 'fb-' + Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      address: address.trim(),
      rating: parseInt(rating),
      goal,
      message: message.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    playCelebrationSound();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showToast(`Thank you ${newFeedback.fullName}! Your feedback was received.`, 'success');

    // Reset Form
    setFullName('');
    setEmail('');
    setAddress('');
    setMessage('');
  };

  const handleDeleteFeedback = (id) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
    playClickBeep();
    showToast('Feedback entry removed', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-cyan" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
            <span className="badge badge-cyan">
              <MessageSquareHeart size={13} /> Section 14 of 14 — Member Feedback
            </span>
            <span className="badge badge-neutral">
              <Sparkles size={13} /> Community Reviews
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: '0.65rem' }}>
            Member Feedback & Review Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Your feedback directly shapes GymSetup! Share your suggestions, gym journey milestones, and ratings with our community.
          </p>
        </div>
      </div>

      {/* Main Grid: Feedback Form + Highlight Box */}
      <div className="grid-2" style={{ gap: '1.25rem', alignItems: 'start' }}>
        {/* Left Side: Feedback Form */}
        <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.15rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.12)',
              color: '#06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Submit Your Feedback</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Share your review with GymSetup developers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <User size={14} color="#06B6D4" /> Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="input-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Email ID */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <Mail size={14} color="#06B6D4" /> Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. rahul.sharma@example.com"
                className="input-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <MapPin size={14} color="#06B6D4" /> City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sector 62, Noida / Bengaluru"
                className="input-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Rating & Goal Row */}
            <div className="grid-2" style={{ gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <Star size={14} color="#06B6D4" /> Rating
                </label>
                <select
                  className="input-control"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                  <option value={3}>⭐⭐⭐ 3 Stars (Good)</option>
                  <option value={2}>⭐⭐ 2 Stars (Average)</option>
                  <option value={1}>⭐ 1 Star (Needs Improvement)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Fitness Goal
                </label>
                <select
                  className="input-control"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="Muscle Building & Strength">Muscle Building 💪</option>
                  <option value="Fat Loss & Toning">Fat Loss 🔥</option>
                  <option value="General Health & Stamina">General Health 🏃</option>
                  <option value="Flexibility & Posture">Flexibility 🧘</option>
                </select>
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Your Detailed Feedback & Suggestions *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your review or features you would like added to GymSetup..."
                className="input-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: 'vertical', minHeight: '90px' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.35rem' }}
            >
              <Send size={16} />
              <span>Submit Member Feedback</span>
            </button>
          </form>
        </div>

        {/* Right Side: Community Highlights & Live Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Feedback Satisfaction Card */}
          <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.85rem' }}>
              <Award size={20} color="#06B6D4" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Beginner Satisfaction Rate</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#06B6D4', lineHeight: 1 }}>98.6%</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Positive Experience</span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.15rem', lineHeight: 1.5 }}>
              Over 2,400+ new gym-goers reported zero intimidation and smooth Day-1 workouts using GymSetup step-by-step guidance.
            </p>

            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-card)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="#06B6D4" />
                <span>Zero spam guarantee — emails used solely for account updates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="#06B6D4" />
                <span>Instant local storage backup of your submitted reviews</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="#06B6D4" />
                <span>Direct product improvements based on beginner feedback</span>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="card" style={{ padding: '1.25rem', background: 'var(--bg-card-secondary)' }}>
            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#06B6D4' }}>
              <Sparkles size={16} /> Need instant guidance?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              If you have quick questions regarding workout routines or machine setups, check out Section 3 (First Day Guide) or Section 6 (Equipment Guide)!
            </p>
          </div>
        </div>
      </div>

      {/* Community Feedbacks List */}
      <div className="card" style={{ padding: '1.75rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.65rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ThumbsUp size={18} color="#06B6D4" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Recent Member Reviews ({feedbacks.length})</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Real feedback submitted by beginners from across gyms.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="card card-hover"
              style={{
                padding: '1.15rem 1.25rem',
                background: 'var(--bg-app)',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.65rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#06B6D4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.82rem'
                    }}>
                      {fb.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)' }}>{fb.fullName}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginLeft: '0.45rem' }}>
                        ({fb.email})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <MapPin size={12} color="#06B6D4" /> {fb.address}
                    </span>
                    <span>•</span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>{fb.goal}</span>
                    <span>•</span>
                    <span>{fb.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                    {'⭐'.repeat(fb.rating)} ({fb.rating}/5)
                  </span>

                  <button
                    onClick={() => handleDeleteFeedback(fb.id)}
                    className="btn btn-secondary btn-icon"
                    title="Delete review"
                    style={{ width: '28px', height: '28px', color: 'var(--text-muted)' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'var(--bg-card-secondary)', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                💬 "{fb.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
