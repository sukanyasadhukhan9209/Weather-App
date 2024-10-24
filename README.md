# Real-Time Data Processing System for Weather Monitoring

## Overview
This application is designed to monitor weather conditions in major Indian metros using real-time data retrieved from the OpenWeatherMap API. The system processes weather updates at configurable intervals and provides summarized insights through rollups and aggregates.

## Features
- **Real-Time Data Retrieval:** Continuously fetches weather data for Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad at configurable intervals.
- **Temperature Conversion:** Converts temperature values from Kelvin to Celsius or Fahrenheit based on user preference.
- **Daily Weather Summary:** Calculates and stores daily aggregates, including:
  - Average temperature
  - Maximum temperature
  - Minimum temperature
  - Dominant weather condition
- **Alerting Thresholds:** Configurable user thresholds to trigger alerts based on temperature or specific weather conditions.
- **Visualizations:** Displays daily weather summaries, historical trends, and triggered alerts.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (for visualizations)

## Getting Started

### Prerequisites
- OpenWeatherMap API key (sign up for a free account)

### Installation

1. **Clone the Repository**
   ```bash
   git clone "https://github.com/sukanyasadhukhan9209/Weather-App.git"
   cd weather-monitoring-app

2. **Open the HTML File**
  Open the `index.html` file in your preferred web browser to view the weather monitoring application.

## API Endpoints

### Get Weather Data
- **Endpoint:** `/api/weather`
- **Method:** GET
- **Query Parameters:**
  - `city`: Name of the city (e.g., `Bangalore`)
- **Response:**
  ```json
  {
    "city": "Bangalore",
    "temperature": 28,
    "condition": "Clear"
  }
### Set Alert Thresholds
- **Endpoint:** `/api/alerts`
- **Method:** POST
- **Body:**
  ```json
  {
    "temperature": 35,
    "condition": "Rain"
  }
### Response
    
    {
    "message": "Alert thresholds set successfully."
    }

### Get Daily Summary
- **Endpoint:** `/api/summary`
- **Method:** GET
- **Response:**
  ```json
  {
    "date": "2024-10-24",
    "averageTemperature": 25,
    "maximumTemperature": 30,
    "minimumTemperature": 20,
    "dominantCondition": "Clear"
  }

## Running Tests

You can add and run tests to ensure everything is working correctly.

### Example Test Command
    npm test

## Bonus Features

- Extend the system to support additional weather parameters like humidity and wind speed.
- Incorporate forecast retrieval and summaries based on predicted conditions.

## Evaluation Criteria

- Functionality and correctness of the real-time data processing system.
- Accuracy of data parsing and rollup calculations.
- Efficiency of data retrieval within acceptable intervals.
- Completeness of test cases for various weather scenarios.
- Clarity and maintainability of the codebase.

## Author

Created by Sukanya Sadhukhan


