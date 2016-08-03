var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/web-hist";

module.exports = connectionString;