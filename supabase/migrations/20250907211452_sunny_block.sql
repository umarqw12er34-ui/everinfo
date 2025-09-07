/*
  # Insert sample portfolio projects

  1. Sample Data
    - Add a few sample projects to showcase the portfolio
    - Include various technologies and project types
    - Provide demo URLs and GitHub links where applicable
*/

INSERT INTO portfolio_projects (title, description, demo_url, github_url, technologies, image_url) VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
  'https://ecommerce-demo.example.com',
  'https://github.com/abdumom1novvv/ecommerce-platform',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Task Management App',
  'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
  'https://taskmanager-demo.example.com',
  'https://github.com/abdumom1novvv/task-manager',
  ARRAY['React', 'TypeScript', 'Supabase', 'Socket.io', 'Material-UI'],
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Weather Dashboard',
  'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using weather APIs.',
  'https://weather-dashboard.example.com',
  'https://github.com/abdumom1novvv/weather-dashboard',
  ARRAY['Vue.js', 'JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
  'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Social Media Analytics',
  'A comprehensive analytics dashboard for social media metrics with data visualization and reporting features.',
  null,
  'https://github.com/abdumom1novvv/social-analytics',
  ARRAY['React', 'D3.js', 'Python', 'Flask', 'MongoDB'],
  'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Mobile Banking App',
  'A secure mobile banking application with biometric authentication, transaction history, and budget tracking features.',
  null,
  null,
  ARRAY['React Native', 'TypeScript', 'Firebase', 'Expo', 'Redux'],
  'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800'
);