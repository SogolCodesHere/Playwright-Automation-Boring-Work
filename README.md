# Ticketing System Automation

## Project Description

This project is a **Playwright-based automation script** designed to interact with a web-based ticketing system. It automates the workflow of searching for an account, selecting options, and initiating ticket creation.  

The automation performs the following tasks:

1. Launches a Chromium browser (visible, not headless).  
2. Opens the ticketing system website (URL is configured via environment variables).  
3. Performs an account search using an ID from an environment variable.  
4. Selects the desired support entry from the search results.  
5. Clicks on a specific table row to proceed with ticket creation.  
6. Initiates ticket creation, confirms the action, and selects ticket parameters such as topic, subtopic, and communication channel from environment variables.  
7. Clicks into the ticket title field, ready for further input.  

The browser remains open at the end for manual inspection or additional interactions.

---

## Prerequisites

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)  
- [Playwright](https://playwright.dev/)  

---

## Installation

1. Clone this repository or copy the project files.  
2. Install dependencies:

```bash
npm install playwright dotenv
