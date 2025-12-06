import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { seedAdmin } from "./config/seedAdmin";

const PORT = env.PORT;

const bootstrap = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`🚀 NovaPartner API running on port ${PORT}`);
  });
};

bootstrap();
