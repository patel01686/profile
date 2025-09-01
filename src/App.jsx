// App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Handle scroll to update active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

const Navbar = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Portfolio</span>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                scrollToSection(item.id);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section id="home" className="home">
      <div className="home-content">
        <div className="profile-image-container">
          <div className="profile-image">
            <div className="image-placeholder">
              <span>Your Photo</span>
            </div>
            <div className="circle-spin"></div>
          </div>
        </div>
        <div className="home-text">
          <h1>Hi, I'm <span className="highlight">Your Name</span></h1>
          <div className="text-animate">
            <h3>{texts[textIndex]}</h3>
          </div>
          <p>I create beautiful, functional websites and applications with a focus on user experience and modern technologies.</p>
          <div className="btn-box">
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Hire Me
            </button>
            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              My Work
            </button>
          </div>
        </div>
        <div className="home-sci">
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about">
      <h2 className="heading">About <span>Me</span></h2>
      <div className="about-content">
        <div className="about-text">
          <h3>Frontend Developer!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="btn-box btns">
            <button>Read More</button>
          </div>
        </div>
        <div className="about-stats">
          <div className="stat">
            <div className="stat-number" data-target="5">0</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-target="3">0</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-target="10">0</div>
            <div className="stat-label">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 85 },
    { name: 'JavaScript', percentage: 80 },
    { name: 'React', percentage: 75 },
    { name: 'Node.js', percentage: 70 },
    { name: 'UI/UX', percentage: 65 }
  ];

  return (
    <section id="skills" className="skills">
      <h2 className="heading">My <span>Skills</span></h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-box">
            <div className="skill-info">
              <h3>{skill.name}</h3>
              <span>{skill.percentage}%</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ width: `${skill.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'E-commerce Website',
      description: 'A fully functional e-commerce site with shopping cart and payment integration.',
      image: 'https://via.placeholder.com/300x200',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with modern design and animations.',
      image: 'https://via.placeholder.com/300x200',
      tags: ['React', 'CSS', 'JavaScript']
    },
    {
      title: 'Task Management App',
      description: 'An application for managing tasks with drag and drop functionality.',
      image: 'https://via.placeholder.com/300x200',
      tags: ['React', 'Firebase', 'Material UI']
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2 className="heading">Latest <span>Projects</span></h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <button>View Project</button>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    alert('Message sent!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <h2 className="heading">Contact <span>Me</span></h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Full Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <span className="focus"></span>
          </div>
          <div className="input-field">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <span className="focus"></span>
          </div>
        </div>
        <div className="input-box">
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Email Subject" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required 
            />
            <span className="focus"></span>
          </div>
        </div>
        <div className="textarea-field">
          <textarea 
            placeholder="Your Message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <span className="focus"></span>
        </div>
        <div className="btn-box btns">
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>Copyright &copy; 2023 by Your Name | All Rights Reserved.</p>
      </div>
      <div className="footer-iconTop">
        <a href="#home">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default App;