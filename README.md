# UID Checker - Freefire & ROV

เว็บแอปพลิเคชันสำหรับตรวจสอบ UID ผู้เล่นเกม Freefire และ ROV

## 🚀 Features

- ✅ ตรวจสอบ UID เกม Freefire
- ✅ ตรวจสอบ UID เกม ROV  
- ✅ UI สวยงามด้วย Tailwind CSS
- ✅ API Token ปลอดภัย (ซ่อนจาก Client)
- ✅ Deploy บน Vercel

## 🛠️ Setup

### 1. Clone และติดตั้ง

```bash
git clone <your-repo-url>
cd api-checkuid
```

### 2. ทดสอบ Local

สร้างไฟล์ `.env.local`:

```
API_TOKEN=ice_18cfd48d882f80af3fd918c13574beb3
```

รัน development server:

```bash
npm i -g vercel
vercel dev
```

เปิด http://localhost:3000

### 3. Deploy to Vercel

```bash
# Push to GitHub first
git add .
git commit -m "Initial commit"
git push origin main

# Deploy to Vercel
vercel

# Set environment variable in Vercel Dashboard:
# Settings > Environment Variables > Add:
# API_TOKEN = ice_18cfd48d882f80af3fd918c13574beb3

# Deploy to production
vercel --prod
```

## 🔐 Security

- API Token ถูกเก็บใน Environment Variable
- Client ไม่สามารถเห็น Token หรือ API URL จริงได้
- ทุก request ผ่าน Serverless Function ของเรา

## 📁 Project Structure

```
api-checkuid/
├── index.html          # หน้าเว็บหลัก (Tailwind CSS)
├── script.js           # Client-side logic
├── api/
│   └── check-uid.js    # Vercel Serverless Function
├── vercel.json         # Vercel config
├── package.json        # Project metadata
├── .gitignore          # Ignore sensitive files
└── .env.example        # Example env vars
```

## 📝 API Usage

```javascript
// Client calls our serverless function
fetch('/api/check-uid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        game: 'FREEFIRE',  // or 'ROV'
        player_id: '322097472'
    })
});
```

## 📄 License

MIT
