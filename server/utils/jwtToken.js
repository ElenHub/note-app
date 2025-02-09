import jwt from 'jsonwebtoken';

// Function to generate a JWT token and set it as a cookie
const generateToken = (userId, res) => {
  // Create a token with userId payload and expiration time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Token expiration time
  });

  // Set the token as a cookie in the response
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: 'strict', // Helps mitigate CSRF attacks
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  });
};

export default generateToken;
