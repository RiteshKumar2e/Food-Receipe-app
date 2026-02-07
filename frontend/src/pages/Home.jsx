import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Heart, Globe as GlobeIcon, Target, Users, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Zap, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import '../styles/Landing.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page" id="home">
            <section className="hero-landing">
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="premium-tag"
                        >
                            <span>Established 2024</span>
                        </motion.div>

                        <motion.h1
                            className="hero-display"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Experience the Art of <br /> <span>Fine Dining</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Discover thousands of recipes from across the globe. Join our community of food lovers and start your culinary adventure today.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
                        >
                            <Link to="/register" className="auth-btn" style={{ textDecoration: 'none', padding: '1.2rem 2.5rem' }}>
                                Get Started Free
                            </Link>
                            <Link to="/login" className="view-all-btn" style={{ textDecoration: 'none' }}>
                                Explore Menu
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="landing-section" id="mission">
                <div className="container-padding">
                    <span className="section-subtitle" style={{ textAlign: 'center' }}>Our Mission</span>
                    <h2>Fueling Passion for Cooking</h2>
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon"><GlobeIcon /></div>
                            <h3>Global Reach</h3>
                            <p>Bringing authentic recipes from every corner of the world to your kitchen table.</p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon"><Target /></div>
                            <h3>Simplicity</h3>
                            <p>Making complex culinary techniques accessible to everyone, from beginners to pros.</p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon"><ShieldCheck /></div>
                            <h3>Quality</h3>
                            <p>Every recipe is curated and tested to ensure the highest standards of taste and health.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section" id="about" style={{ background: 'white' }}>
                <div className="container-padding">
                    <div className="about-content">
                        <div className="about-text">
                            <span className="section-subtitle">About Us</span>
                            <h2 style={{ textAlign: 'left', marginBottom: '1.5rem' }}>A Journey Through Tastes</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Gourmet Haven started with a simple idea: that good food should be shared. What began as a small collection of family recipes has grown into a global platform for culinary discovery.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '2rem', color: 'var(--primary)' }}>10k+</h4>
                                    <p>Active Users</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '2rem', color: 'var(--primary)' }}>5k+</h4>
                                    <p>Recipes</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '2rem', color: 'var(--primary)' }}>50+</h4>
                                    <p>Countries</p>
                                </div>
                            </div>
                        </div>
                        <img src="/src/assets/food.jpg" alt="About" className="about-img" />
                    </div>
                </div>
            </section>

            <section className="landing-section" id="contact">
                <div className="container-padding">
                    <div className="contact-container">
                        <div className="contact-info">
                            <span className="section-subtitle">Contact Us</span>
                            <h2 style={{ textAlign: 'left' }}>Get in Touch</h2>
                            <p>Have questions or suggestions? We'd love to hear from you.</p>
                            <div className="contact-item">
                                <div className="icon"><Mail size={20} /></div>
                                <div>
                                    <div style={{ fontWeight: '700' }}>Email</div>
                                    <div style={{ color: 'var(--text-muted)' }}>hello@gourmethaven.com</div>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon"><Phone size={20} /></div>
                                <div>
                                    <div style={{ fontWeight: '700' }}>Phone</div>
                                    <div style={{ color: 'var(--text-muted)' }}>+1 (555) 000-0000</div>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon"><MapPin size={20} /></div>
                                <div>
                                    <div style={{ fontWeight: '700' }}>Location</div>
                                    <div style={{ color: 'var(--text-muted)' }}>Culinary Street, Foodie City, NY</div>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="How can we help you?" style={{ minHeight: '150px', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'var(--bg-main)' }}></textarea>
                            </div>
                            <button className="auth-btn" type="button">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer style={{ padding: '4rem 0', textAlign: 'center', background: 'var(--text-main)', color: 'white' }}>
                <ChefHat size={48} style={{ marginBottom: '1.5rem', color: 'var(--primary)' }} />
                <h3>Gourmet Haven</h3>
                <p style={{ opacity: 0.6, marginTop: '1rem' }}>© 2024 Gourmet Haven. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
