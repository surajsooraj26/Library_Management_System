<h1 align="center">📚 Library Management System (MERN Stack)</h1>

<p align="center">
  A full-stack Library Management System built using the MERN stack (MongoDB, Express, React, Node.js).<br>
  This system allows an admin to register users, manage books, and track activity.
</p>

<hr>

<h2>🚀 Features</h2>

<ul>
  <li>🛡️ Auto-create Admin on first server run</li>
  <li>👤 Admin-only user registration</li>
  <li>📚 Book management (add)</li>
  <li>🔐 Role-based access control (Admin/User)</li>
  <li>🖥️ Clean modular structure (frontend & backend)</li>
  <li>🌐 MongoDB for persistent storage</li>
</ul>
<p>The project is under development more features will be added...</p>

<hr>

<h2>📁 Project Structure</h2>

<pre>
Library-Management-System/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│   └── .env.example
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── context/
│       ├── services/  
│       ├── components/
│       ├── pages/
│       └── App.jsx
└── README.md
</pre>

<hr>

<h2>⚙️ Backend Setup Instructions</h2>

<ol>
  <li>Clone this repo:
    <pre><code>git clone https://github.com/surajsooraj26/library_Management_System.git
cd Library_Management_System/backend</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create your <code>.env</code> file (see below)</li>
  <li>Start the backend server:
    <pre><code>npm run dev</code></pre>
  </li>
</ol>

<hr>

<h2>🌐 Frontend Setup Instructions</h2>

<ol>
  <li>Open another terminal:
    <pre><code>cd ../frontend
npm install
npm run dev</code></pre>
  </li>
</ol>

<hr>

<h2>🔐 .env File Setup</h2>

<p>Create a <code>.env</code> file inside the <code>backend/</code> folder:</p>

<pre><code>
PORT=your_port_number [eg:3000]
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=frontend_url

</code></pre>

<hr>

<h2>✅ Auto Admin Creation</h2>

<p>On first run, if no users exist, the server will <strong>automatically create</strong> an admin using the credentials <code>
Email ID = admin@gmail.com 
Password = admin123</code></p>
<p>You can then log in and begin managing the system.</p>

<hr>

<h2>📌 Tech Stack</h2>

<ul>
  <li><strong>Frontend:</strong> React + Vite</li>
  <li><strong>Backend:</strong> Node.js, Express</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
  <li><strong>Styling:</strong>CSS Modules</li>
</ul>

<hr>

<h2>👨‍💻 Author</h2>

<p><strong>Suraj S</strong> – <a href="https://github.com/surajsooraj26" target="_blank">@surajsooraj26</a></p>

<hr>

<h2>🛡 License</h2>

<p>This project is licensed under the MIT License.</p>
