README
🧠 CodeR – Java Code Review Website
CodeR is an intelligent web-based platform that helps Java developers automatically review their code quality using static analysis tools like Checkstyle, PMD, and SpotBugs. It provides an intuitive interface where users can write, paste, or upload Java code, get real-time feedback, and improve code maintainability and correctness.

🚀 Features
✅ Code Quality Analysis
Analyze Java code using:
Checkstyle – detects coding style violations
PMD – finds common programming flaws and anti-patterns
SpotBugs – spots potential bugs and runtime issues
💻 Web Editor
Built using React and Monaco Editor (same editor used in VS Code)
Live syntax-highlighted Java editor
Responsive UI with modern React Hooks and components
📊 Output & Reporting
User-friendly summary of issues
Grouped results by severity/type/tool
Ability to fix issues based on suggestions
💾 Backend & Database
Backend built with Java and Spring Boot
Uses MySQL for storing user activity and code history
🛠️ Tech Stack
🔧 Backend
Java 17+
Spring Boot
Checkstyle, PMD, SpotBugs
MySQL
REST APIs
🌐 Frontend
React.js (with functional components and hooks)
Monaco Editor
Axios (for API communication)
Bootstrap / Tailwind (optional for styling)
📦 Getting Started
🧰 Prerequisites
Java 17+
Node.js + npm
MySQL
Maven
🔄 Clone the Repo
git clone https://github.com/EvilGame619/smart-contact-manager.git

⚙️ Setup & Run
Create a MySQL database (e.g., codeR)
Update database credentials and SMTP settings in src/main/resources/application.properties
Build and run the application:
mvn clean install
mvn spring-boot:run
Open your browser at http://localhost:8080
Output Login dashboard code editor
