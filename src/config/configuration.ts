export default () => ({
  port: process.env.PORT || 10 || 8000,
  database: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
  },
});
