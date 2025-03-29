# Project Name: Post Window Website

# Website Link:
hhttps://post-window-frontend.vercel.app/

# Technologies:
JavaScript, Tailwind CSS, ReactJS, React Router, Redux, Axios, Local-Storage.

# Objective 
Build a React.js/Next.js application with user authentication and a dashboard data table with filtering and sorting. 

# Pages & Structure

** The application will have two main pages: **

1. Login/Signup Page – Allows users to sign up or log in with email and password. 

2. Details Page – Displays a data table along with a navbar and sidebar after login. 

# Requirements 

## 1. User Authentication (Login/Signup) 

○ Create a login/signup system with email & password authentication. 

○ Validate input fields and display error messages for invalid inputs.

○ Store user session details in local storage. 

○ Redirect users to the Details page after successful login. 

2. Dashboard (After Login) 

○ Display a navbar with: 

■ Logo (left) 

■ User icon (right) with dropdown menu:

■ Logo (left) 

■ User icon (right) with dropdown menu: 

■ Show logged-in user details (name/email).

■ Logout option (clears local storage). 

■ Delete Account option (removes user data from local storage). 

○ Show a sidebar indicating the current page - (let’s name it as Details).


3. Details Page (Data Table)

○ Display a table with mock data (use JSON or a third party mock APIs).

○ Implement the following table features: 

■ Sorting (ascending/descending). 

■ Searching (filter data based on user input). 

■ Pagination (display a limited number of rows per page). 


4. General Requirements 

○ Use local storage for user authentication and session management. 

○ Ensure responsive design for both desktop and mobile. 

○ State Management: Use useContext or useReducer for managing state (recommended), or you may use Redux if preferred.

# Run

# Clone this repository
$ git clone https://github.com/ShailySarker/Post-Window-Frontend  

# Go into the repository
$ cd Post-Window-Frontend

# Install dependencies
$ npm install

# Run the app
$ npm run dev