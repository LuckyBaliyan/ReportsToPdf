
# 📄 Design Report Generator (React + Node/Express + PDF)

A full-stack application that generates clean, print-ready PDF design reports using a React frontend and a Node.js/Express backend.
This project fulfills all the minimum requirements described in the original assignment.




## 🚀 Project Overview

This project allows users to browse available reports, view detailed report pages with charts, tables, and images, and export each report as a professionally styled A4 PDF.
The backend serves structured JSON report data, and the frontend transforms that data into a print-ready layout with a PDF export option.

![App Screenshot](./screenshots/s1.png)


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express


## Project Structure

/backend      
  ├── server.js   
  ├── routes/   
  ├── controllers/  
  ├── data/reports.json  
  └── package.json  

/frontend  
  ├── src/  
  │    ├── components/  
  │    ├── pages/  
  │    ├── api/  
  │    └── styles/  
  └── package.json  


## Features

- GET /api/reports

Returns a list of all available reports.

- GET /api/reports/:id

Returns detailed JSON for a single report (sections, images, tables, chart data, metadata).

- GET /api/reports/:id/pdf

Returns a server-generated PDF

- Report list view

- Report detail page

- Title page + Auto Table of Contents

- Multi-page layout with print-ready formatting

- Tables, charts, images, and content sections

- Preview mode

- Export to PDF button

## PDF Features

- A4 page size

- Proper margins (10–20 mm)

- Automatic pagination

- Embedded charts (via Recharts → image/PDF rendering)

- Header/footer with report metadata

- Professional typography & spacing


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

📚 License

Open source — use for study, demo, or coursework.
