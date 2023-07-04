export default () => ({
  environment: process.env.NODE_ENV,
  database: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  },
  kafka: {
    broker: process.env.KAFKA_BROKER,
  },
});
