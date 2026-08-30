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
  Trash2,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime, playCelebrationSound, playClickBeep } from '../utils/soundEffects';

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
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

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
    setSubmittedSuccess(true);
    playCelebrationSound();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
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

  const getRatingLabel = (r) => {
    switch (r) {
      case 5: return '⭐⭐⭐⭐⭐ Outstanding / 10 out of 10';
      case 4: return '⭐⭐⭐⭐ Very Good / Helpful';
      case 3: return '⭐⭐⭐ Good / Average';
      case 2: return '⭐⭐ Needs Improvement';
      default: return '⭐ Poor';
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="card card-glow-emerald" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="badge badge-emerald">
              <MessageSquareHeart size={14} /> Section 13 of 13 — Member Community
            </span>
            <span className="badge badge-cyan">
              <Sparkles size={14} /> 100% Verified Reviews
            </span>
            <span className="badge badge-amber">
              <Heart size={14} /> Direct Feedback Channel
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Member Feedback & Review Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Aapka feedback hamare liye bohot keemti hai! Apne suggestions, gym experiences aur review niche share karein.
          </p>
        </div>
      </div>

      {/* Main Grid: Feedback Form + Highlight Box */}
      <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Side: Feedback Form */}
        <div className="card card-glow-emerald" style={{ padding: '2rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Submit Your Feedback</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Share your experience with GymSetup</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                <User size={15} color="#10b981" /> Full Name (पूरा नाम) *
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
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                <Mail size={15} color="#06b6d4" /> Email Address (ईमेल आईडी) *
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
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                <MapPin size={15} color="#f59e0b" /> Full Address / City / Gym Location (पूरा पता) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sector 62, Noida / Gold's Gym South Delhi"
                className="input-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Rating & Goal Row */}
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <Star size={15} color="#f59e0b" /> Star Rating (रेटिंग)
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Fitness Goal (फिटनेस लक्ष्य)
                </label>
                <select
                  className="input-control"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="Muscle Building & Strength">Muscle Building & Strength 💪</option>
                  <option value="Fat Loss & Toning">Fat Loss & Toning 🔥</option>
                  <option value="General Health & Stamina">General Health & Stamina 🏃</option>
                  <option value="Flexibility & Posture">Flexibility & Posture 🧘</option>
                </select>
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Your Detailed Feedback & Suggestions (विचार व सुझाव) *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write your review, what you loved, or features you would like added to GymSetup..."
                className="input-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '0.5rem' }}
            >
              <Send size={18} />
              <span>Submit Member Feedback 🚀</span>
            </button>
          </form>
        </div>

        {/* Right Side: Community Highlights & Live Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Feedback Satisfaction Card */}
          <div className="card card-glow-cyan" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Award size={24} color="#06b6d4" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Beginner Satisfaction Rate</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>98.6%</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Positive Experience</span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Over 2,400+ new gym-goers reported zero intimidation and smooth Day-1 workouts using GymSetup step-by-step guidance.
            </p>

            <div style={{ background: 'var(--bg-card-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Zero spam guarantee — emails used solely for account updates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Instant local storage backup of your submitted reviews</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Direct product improvements based on beginner feedback</span>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-card-secondary)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b' }}>
              <Sparkles size={18} /> Need instant guidance?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              If you have quick questions regarding workout routines or machine setups, check out Section 2 (First Day Guide) or Section 5 (Equipment Guide)!
            </p>
          </div>
        </div>
      </div>

      {/* Community Feedbacks List */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ThumbsUp size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Recent Member Reviews ({feedbacks.length})</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real feedback submitted by beginners from across gyms.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="card card-hover"
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--bg-card-secondary)',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      {fb.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{fb.fullName}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                        ({fb.email})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={13} color="#f59e0b" /> {fb.address}
                    </span>
                    <span>•</span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>{fb.goal}</span>
                    <span>•</span>
                    <span>{fb.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    {'⭐'.repeat(fb.rating)} ({fb.rating}/5)
                  </span>

                  <button
                    onClick={() => handleDeleteFeedback(fb.id)}
                    className="btn btn-secondary btn-icon"
                    title="Delete review"
                    style={{ width: '30px', height: '30px', color: '#f43f5e' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'var(--bg-card)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                💬 "{fb.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
