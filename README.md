# FitFlex

FitFlex is a web application designed to help users discover and manage exercise routines tailored to their fitness goals. The app provides a comprehensive database of exercises categorized by different body parts, allowing users to explore and find suitable workouts. Additionally, FitFlex integrates with external APIs to fetch exercise videos and enhance user experience.

## Features

- **Exercise Discovery:** Browse exercises categorized by body parts such as chest, back, legs, and more.
- **Dynamic Pagination:** Navigate through exercise lists with intuitive pagination controls.
- **Exercise Details:** View detailed information about each exercise, including GIFs and target areas.
- **Video Recommendations:** Access suggested exercise videos from external sources to supplement workout routines.

## Technologies Used

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **API Integration:** RapidAPI for exercise and video data
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Styling:** Custom CSS with Tailwind utility classes

## Getting Started

To run FitFlex locally, follow these steps:

### Prerequisites

Before you begin, make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/recyclecodes/vite-react-fit-flex
   cd vite-react-fit-flex
2. **Install dependencies:**

   ```bash
     npm install

### Set up Environment Variables

To run FitFlex, you need to set up an environment variable for your RapidAPI key:

1. **Create a `.env` file** in the root directory of the project.

2. **Add your RapidAPI key** to the `.env` file:
   
   ```dotenv
   VITE_APP_API_KEY=your-rapidapi-key
   
## Running the Application

### Start the development server:

    ```bash
    npm start

## Contributing

We welcome contributions to FitFlex! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to RapidAPI for providing exercise and video data APIs.
- Inspiration from fitness enthusiasts and developers contributing to open-source fitness projects.

