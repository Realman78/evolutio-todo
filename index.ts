import { sequelize } from "./config/db";
import createServer from "./server";
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = createServer()

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  try {
    await sequelize.sync({ force: false })
  } catch (e) {
    console.log("error:", e);
    process.exit(1)
  }
});

export default app