# Course Selling App Backend

## ✅ What Has Been Done

### Authentication & Authorization
- **User & Admin Signup**: Implemented with `zod` input validation and `bcrypt` password hashing.
- **User & Admin Signin**: JWT-based authentication with session management.
- **Middleware**: Protected routes for Users and Admins using JWT verification.

### Database
- **MongoDB Integration**: Connected using `mongoose`.
- **Schemas**: Defined models for `User`, `Admin`, `Course`, and `Purchase`.

### Features
- **Course Management (Admin)**:
    - Create new courses.
    - Update existing courses.
    - View all courses created by the admin.
- **Course Browsing (User)**:
    - View all available courses (`/preview`).
- **Purchasing**:
    - Users can buy courses.
    - Users can view their purchased courses.

---

## 🚧 What Has To Be Done (Roadmap & Fixes)

### 1. Critical Bug Fixes
- **Admin Signin**: Fix missing `await` in password comparison (`Routes/admin.js`). Currently, the promise object is truthy, so the password check always passes.
- **Middleware Stability**: Wrap `jwt.verify` in `try-catch` blocks in `middleware/*.js`. Invalid tokens currently cause the server to crash.
- **Hanging Requests**: Send a JSON response back to the client in the `POST /purchase` endpoint; currently, it times out.

### 2. Security & Validation
- **Input Validation**: Add `zod` validation for Course creation and update endpoints (currently accepts any data).
- **Purchase Validation**: Verify that a `courseId` exists in the database before allowing a purchase.
- **Header Access**: Fix `req.header.token` to `req.headers.token` in user middleware.

### 3. Functional Improvements
- **Data Population**:
    - Add `ref` fields to Mongoose schemas (`ref: 'user'`, `ref: 'course'`, etc.) in `db.js`.
    - Use `.populate()` in `GET /purchases` to show full course details (title, price) instead of just IDs.
- **API Best Practices**:
    - Change `GET /course/bulk` to read from `req.query` instead of `req.body` (GET requests should not have bodies).
- **Error Handling**: Implement global error handling or `try-catch` blocks in all async routes to handle database failures gracefully.

### 4. Code Cleanup
- **Typos**: Fix spelling errors in response messages (e.g., "Sucessfully", "loggined").
- **Configuration**: Standardize usage of `process.env` and `config.js`.
