# DeepBlue Marine Monitoring Backend

## Features
- JWT authentication (register, login, get current user)
- Vessel tracking (CRUD, stats)
- Protected Fishing Zones (PFZ) management
- Alerts (CRUD, stats, filtering)
- Biodiversity/species management
- Satellite image upload (Multer)
- Weekly reports & analytics endpoints
- MongoDB/Mongoose models
- Error handling, CORS, logging
- Sample data seeding

## Setup
1. Install dependencies:
   ```
npm install
   ```
2. Set up MongoDB (local or Atlas) and update `.env`.
3. Seed sample data:
   ```
npm run seed
   ```
4. Start the server:
   ```
npm run dev
   ```

## Endpoints
See the code for all `/api` endpoints. All return JSON matching the dashboard UI structure.

## Cloud/Manual Steps
- For cloud storage, ECR, ECS, or S3, set up buckets/registries manually as per your cloud provider.
- Update `.env` for any cloud connection strings.

## Next Steps
- Add ship detection service (TensorFlow.js)
- Add WebSocket for real-time updates
- Add Dockerfile and docker-compose.yml
