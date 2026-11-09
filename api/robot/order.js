// api/robot/order.js - FINAL 100% - KEY CODE TE NAI
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { uid, package: pack, price, zoneId } = req.body;
  if (!uid || !pack) return res.status(400).json({ success: false, error: 'UID & Package lagbe' });

  const API_KEY = process.env.RESELL_API_KEY || '';
  const API_URL = process.env.RESELL_API_URL || ''; // ex: https://resell.codes/api/v1/orders - Dashboard theke niba
  const PRODUCT_ID = process.env.RESELL_PRODUCT_FF || ''; // Free Fire Diamond er ID - Dashboard theke niba

  if (!API_KEY || !API_URL || !PRODUCT_ID) {
    return res.status(500).json({ success: false, error: 'Robot off - API_URL / PRODUCT_ID baki ache' });
  }

  // Idempotency - ek e order 2 bar jabe na
  const orderRef = `ULTRA_${Date.now()}_${String(uid).slice(-4)}`;

  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Key': API_KEY,
        'Idempotency-Key': orderRef
      },
      body: JSON.stringify({
        product_id: PRODUCT_ID,
        product: PRODUCT_ID,
        package: pack,
        player_id: String(uid).trim(),
        uid: String(uid).trim(),
        zone_id: zoneId || '',
        quantity: 1,
        price: price,
        reference: orderRef,
        external_id: orderRef
      })
    });

    const text = await r.text();
    let data = {};
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (r.ok && (data.success || data.order_id || data.id || data.orderId)) {
      return res.json({ success: true, orderId: data.order_id || data.id || data.orderId, uid, package: pack, status: 'Processing', message: 'Robot Order Gese! Supplier process kortase' });
    } else {
      return res.status(r.status || 400).json({ success: false, error: data.message || data.error || `Supplier bollo: ${text.slice(0,200)} - Balance / Product ID check koro` });
    }
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Robot order pathate pari nai' });
  }
}
