export default () => ({
    jwtSecret: process.env.JWT_SECRET // Can replace with a PEM-encoded public key,
  });