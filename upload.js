const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors()); // localhost dan frontend so'roviga ruxsat beradi
const upload = multer();

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPA_URL || !SUPA_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server/.env');
  process.exit(1);
}
const supabase = createClient(SUPA_URL, SUPA_SERVICE_KEY);

// Xatoliklarni ushlash uchun global handler lar
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (err) => {
  console.error('[unhandledRejection]', err && err.stack ? err.stack : err);
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const title = req.body.title || 'Untitled';
    const filename = `${Date.now()}_${req.file.originalname}`;

    // ensure no accidental "achievements/" prefix
    let path = `${filename}`.replace(/^achievements\//, "");

    console.log("[upload] filename:", filename);
    console.log("[upload] storing path in bucket:", path);

    const { error: upErr } = await supabase.storage
      .from('achievements')
      .upload(path, req.file.buffer, { contentType: req.file.mimetype, upsert: false });

    if (upErr) {
      console.error('[upload] upload error', upErr);
      return res.status(500).json({ error: upErr.message || upErr });
    }

    // get public url (public bucket assumed)
    const { data } = supabase.storage.from('achievements').getPublicUrl(path);
    const publicURL = data?.publicUrl || data?.publicURL || null;

    console.log('[upload] publicURL:', publicURL);

    // insert record; store public URL when available, otherwise store relative path
    const { error: insErr } = await supabase
      .from('achievements')
      .insert([{ title, image_url: publicURL || path, added_by: 'admin' }]);

    if (insErr) {
      console.error('[upload] insert error', insErr);
      return res.status(500).json({ error: insErr.message || insErr });
    }

    console.log('[upload] inserted record, url returned to client:', publicURL || path);
    res.json({ ok: true, url: publicURL || path });
  } catch (err) {
    console.error('[upload] server error:', err && err.stack ? err.stack : err);
    // har doim JSON yuboramiz va qo'shimcha stack ham jo'natamiz (lokal debugging uchun)
    res.status(500).json({ error: String(err?.message ?? err), stack: String(err?.stack ?? '') });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Upload server running on http://localhost:${PORT}`));