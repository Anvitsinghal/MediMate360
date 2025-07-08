/*
/backend
│
├── 📄 //!server.js                   //Entry point - sets up Express, DB, routes, middlewares
├── 📄 //!.env                       // Environment variables (Mongo URI, API keys, etc.)
├── 📄 //!package.json
│
├── 📁 //?config/                    # Config files (DB, external APIs, cloud)
│   ├── //!db.js                   // MongoDB connection
│   ├── //!cloudinary.js            Cloudinary config (for image uploads)
│   └── openai.js               # OpenAI/Gemini config (for relevance checking)
│
├── 📁 //?controllers/              # Route handlers (business logic)
│   ├── //!authController.js
│   ├── uploadController.js     # Handles OCR via Tesseract
│   ├── medicineController.js   # Fetch medicine info, alternatives, buy links
│   ├── relevanceController.js  # AI relevance checker logic
│   ├── reminderController.js   # Pill reminders
│   └── schemeController.js     # Government scheme filters
│
├── 📁 //?routes/                   # Route definitions
│   ├── //!authRoutes.js
│   ├── uploadRoutes.js
│   ├── medicineRoutes.js
│   ├── relevanceRoutes.js
│   ├── reminderRoutes.js
│   └── schemeRoutes.js
│
├── 📁 //?models/                   # Mongoose schemas
│   ├── //!User.js
│   ├── //!Medicine.js             # (Optional if fetching from external source)
│   ├── //!Prescription.js         # Stores uploaded prescriptions
│   ├── //!Reminder.js
│   └── //!Scheme.js               # Store scheme data locally
│
├── 📁 //?middleware/               # Custom middleware
│   ├── //!authMiddleware.js       # Protect routes
│   ├── errorMiddleware.js      # Global error handler
│   ├── uploadMiddleware.js     # File upload middleware (e.g., multer)
│   └── validateInput.js        # (Optional) Joi/Zod-based validation
│
├── 📁 utils/                    # Helper functions
│   ├── ocrProcessor.js         # Tesseract logic
│   ├── translator.js           # Google Translate API logic
│   ├── aiRelevance.js          # AI logic (prompt templates + API call)
│   ├── emailScheduler.js       # Email reminders
│   ├── buyLinkFetcher.js       # (Optional) Fetch links from APIs or web scraping
│   └── schemeFilter.js         # Filters schemes by user info
│
├── 📁 uploads/                  # Local image uploads (temp)
│   └── (temp images)
│
├── 📁 services/                 # Third-party integrations (optional for clean code)
│   ├── aiService.js
│   ├── emailService.js
│   └── pharmacyApiService.js   # Buy link APIs
│
└── 📁 logs/                     # App logs (optional)
    └── app.log

    */
