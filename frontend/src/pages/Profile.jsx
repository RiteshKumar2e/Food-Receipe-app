import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return <div className="dashboard-page">Loading...</div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: '600' }}>
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="auth-header">
                        <h2>My Profile</h2>
                        <p>Manage your account information</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', alignItems: 'start' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="pfp-placeholder" style={{ width: '150px', height: '150px', fontSize: '4rem' }}>
                                {user?.name?.[0] || 'U'}
                            </div>
                            <button className="view-all-btn" style={{ fontSize: '0.8rem', width: '100%', marginTop: '1rem' }}>Change Photo</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-main)', borderRadius: '1rem' }}>
                                <User color="var(--primary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</div>
                                    <div style={{ fontWeight: '700' }}>{user.name}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-main)', borderRadius: '1rem' }}>
                                <Mail color="var(--primary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
                                    <div style={{ fontWeight: '700' }}>{user.email}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-main)', borderRadius: '1rem' }}>
                                <Phone color="var(--primary)" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone Number</div>
                                    <div style={{ fontWeight: '700' }}>{user.phone || 'Not provided'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Profile;
