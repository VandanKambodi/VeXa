# VeXa - Project Management & Collaboration Platform

A modern and efficient project management platform designed to help teams organize projects, collaborate seamlessly, track progress, and build professional communities. Built with **React.js, Node.js, Express.js, MongoDB, Material-UI, and Styled Components,** Vexa provides an intuitive and scalable solution for managing projects of any size.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

---

##  Overview
Vexa is a collaborative project management application that enables teams to efficiently manage projects, communicate with team members, track work progress, and connect with like-minded professionals through a built-in community platform.

The platform streamlines project workflows by combining task management, collaboration tools, communication features, and time tracking into a single unified system.

##  Features
- **Project Management** with task organization and milestone tracking
- **Team Collaboration** for efficient communication and teamwork
- **Community Building** to connect and engage with professionals
- **Time Tracking** for productivity monitoring and insights
- **Email Notifications** powered by Nodemailer
- **Modern UI** built with React.js, Material-UI, and Styled Components


##  Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js (v18.x or later), Express.js
- **Database:** MongoDB Atlas
- **Additional Services:** Nodemailer


## Project Structure
```bash

VeXa
├── client/
│   ├── public/
│   └── src/
│      ├── components/
│      ├── pages/
│      ├── services/
│      ├── styles/
│      └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── package.json
└── README.md

```


##  Installation
### Clone the Repository
   ```
   git clone https://github.com/your-username/VeXa.git 
   cd VeXa
   ```

### Install Dependencies
   ```
   npm install
   ```
In both client and server folder

### Set up Environment Variables
Create a file named `.env.local` in the root directory:
   ```
MONGODB_URI=your_mongodb_connection_string 
EMAIL_USERNAME=your_email_address 
EMAIL_PASSWORD=your_email_password 
JWT_SECRET=your_jwt_secret 
URL=http://localhost:3000
USER_VERIFICATION_TOKEN_SECRET=xyz
PORT=8000
   ```

### Run the Development Server
   ```
   npm start
   ```
In both client and server folder

#### Open http://localhost:3000 to view the application.


##  Contributing
- Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request