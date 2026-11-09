// api/robot/order.js - FIXED - NO KEY, NO NUMBER, NO FAKE SUCCESS
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let { uid, package: pack, price, diamond } = req.body;

  if (!uid || !pack) {
    if (diamond) { pack = `${diamond} Diamond`; }
    else { return res.status(400).json({ success: false, error: 'UID & Package lagbe' }); }
  }

  // Server detect - sudhu package er naam theke
  function detectServer(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('indonesia') || n.includes('indo')) return 'indonesia';
    if (n.includes('brazil') || n.includes('brasil')) return 'brazil';
    if (n.includes('singapore') || n.includes('sg')) return 'singapore';
    if (n.includes('pubg') || n.includes('uc')) return 'pubg';
    if (n.includes('level') || n.includes('pass')) return 'bd_level';
    return 'bd';
  }

  const server = detectServer(pack);

  // Key + URL sudhu Vercel theke - code e kichu nai
  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY || '';
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || '';

  if (!SUPPLIER_URL || !SUPPLIER_KEY) {
    return res.status(500).json({ success: false, error: 'Order system off - Admin ke janao' });
  }

  let diamondAmount = diamond || 0;
  if (!diamondAmount) {
    const match = pack.match(/(\d+)/);
    if (match) diamondAmount = parseInt(match[1]);
  }

  try {
    const r = await fetch(SUPPLIER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SUPPLIER_KEY,
        'X-Server': server
      },
      body: JSON.stringify({
        uid: String(uid).trim(),
        package: pack,
        diamond: diamondAmount,
        price: price,
        server: server,
        game: server === 'pubg' ? 'PUBG' : 'Free Fire'
      })
    });

    const data = await r.json().catch(() => ({}));

    if (data.success || data.orderId) {
      return res.json({ success: true, orderId: data.orderId, server, diamond: diamondAmount, package: pack, uid, message: 'Order Done! ID te asbe!' });
    } else {
      return res.json({ success: false, error: 'Order jay nai - Pore try koro' });
    }

  } catch (e) {
    return res.status(500).json({ success: false, error: 'Order pathate pari nai - Pore try koro' });
  }
}
