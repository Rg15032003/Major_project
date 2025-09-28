🌍 UpStay

🚀 Overview
UpStay is a full-stack travel exploration platform where users can create, browse, search, and review location-based listings.
It integrates interactive maps, secure authentication, and optimized image hosting, making it a community-driven platform for discovering travel destinations.

✨ Features
🏡 Listings – Create, browse, and search over 100+ travel destinations.
📝 Reviews – Add and manage user reviews for listings.
🗺️ Interactive Maps – Mapbox API integration for geolocation-based search.
📸 Image Hosting – Cloudinary integration for fast and optimized image loading.
🔐 Authentication – Role-based authentication using Passport.js (User, Moderator, Admin).
⚡ Responsive UI – Built with EJS templates and Bootstrap for smooth UX.

🛠️ Tech Stack
Node.js, Express.js, MongoDB Atlas, EJS, Passport.js, Mapbox API, Cloudinary,Joi Scehma


📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/rg15032003/wanderlust.git
cd wanderlust

2️⃣ Install dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
MAPBOX_TOKEN=your_mapbox_api_token
SESSION_SECRET=your_secret

4️⃣ Run the application
# nodemon app.js
access the app at =>localhost:8080/listings
<img width="1913" height="951" alt="Screenshot 2025-08-21 233555" src="https://github.com/user-attachments/assets/9855cbb5-f571-46e1-a704-46bb461982e6" />

Listing screenshots
<img width="832" height="858" alt="Screenshot 2025-08-21 233827" src="https://github.com/user-attachments/assets/d8ffbcf3-84da-4de6-8511-c2e7d82f23cc" />
<img width="932" height="763" alt="Screenshot 2025-08-21 234116" src="https://github.com/user-attachments/assets/e89b0993-9a31-4811-8b8f-c4b8df667f2a" />

📖 Usage

Sign Up / Login to your account.
Browse Listings or create your own travel spot.
Upload Images (stored via Cloudinary).
View on Map with Mapbox integration.
Leave Reviews and interact with other travelers.

🤝 To contribute
Fork the repo
Create your feature branch (git checkout -b feature-name)
Commit your changes (git commit -m 'Add feature')
Push to the branch (git push origin feature-name)
Open a Pull Request
