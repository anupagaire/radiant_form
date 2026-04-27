// scripts/create-admin.ts
import * as jose from 'jose';

const SECRET_KEY = "80024882ef0dc1b359ef74ee32373a01eef26a538bd7a87019b8026a59de0b4fe77f598c2ed8105057164f6c9c6cbb3ebce0596c48273c88e990813e8606e658"; 

if (!SECRET_KEY || SECRET_KEY.length < 32) {
  console.error("❌ JWT_SECRET is too short or missing!");
  console.error("Please put a strong secret (minimum 32 characters) in the code below.");
  process.exit(1);
}

const secret = new TextEncoder().encode(SECRET_KEY);

async function createAdminToken() {
  try {
    const token = await new jose.SignJWT({
      id: '1',
      email: 'admin@radiant.com',
      name: 'Admin',
      role: 'admin',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    console.log("✅ Admin account created successfully!\n");
    console.log("Use these credentials to login:");
    console.log("Email    : admin@radiant.com");
    console.log("Password : radiant123");
    console.log(token);
    console.log("\nNow run your dev server and go to /login");
  } catch (err) {
    console.error("❌ Error generating token:", err);
  }
}

createAdminToken();