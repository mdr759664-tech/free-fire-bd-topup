// api/robot/order.js - REAL ROBOT - KEY CODE TE NAI, VERCEL E
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { uid, package: pack, price, zoneId } = req.body;
  if (!uid || !pack) return res.status(400).json({ success: false, error: 'UID & Package lagbe' });

  // Key + URL sudhu Vercel theke asbe - Code e kichu nai
  const API_KEY = process.env.RESELL_API_KEY || '';
  const API_URL = process.env.RESELL_API_URL || '';
  
  if (!API_KEY || !API_URL) {
    return res.status(500).json({ success: false, error: 'Robot off - Admin ke janao' });
  }

  // resell.codes er Docs onujayi product ID lagbe
  // Dashboard > API Docs e Product ID dekhte parba
  const productId = process.env.RESELL_PRODUCT_FF || '';

  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        product_id: productId,
        player_id: String(uid).trim(),
        zone_id: zoneId || '',
        package: pack,
        quantity: 1,
        price: price
      })
    });

    const data = await r.json().catch(() => ({}));

    // Supplier confirm korle tobei success
    if (data.success || data.order_id || data.id) {
      return res.json({ success: true, orderId: data.order_id || data.id, uid, package: pack, status: 'Processing', message: 'Robot Order Gese! 5-15 min e ID te asbe' });
    } else {
      return res.json({ success: false, error: data.message || 'Supplier order ney nai - Balance check koro' });
    }
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Robot order pathate pari nai' });
  }
}
