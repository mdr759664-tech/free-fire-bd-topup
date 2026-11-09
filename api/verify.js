// api/verify.js - MANUAL - PERSONAL NUMBER ER JONNO
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let { trxId, amount, gateway } = req.body;
  if (!trxId || !amount) return res.json({ success: false, verified: false, error: 'TrxID & Amount lagbe' });

  trxId = String(trxId).trim().toUpperCase();
  amount = parseInt(amount);

  if (trxId.length < 6 || trxId.length > 15) {
    return res.json({ success: false, verified: false, error: 'Sothik TrxID dao' });
  }

  // Ekhane taka add hobe NA - sudhu Pending hobe
  // Admin bKash app e dekhe Approve korle tobei add hobe
  return res.json({
    success: true,
    verified: false,
    pending: true,
    trxId,
    amount,
    gateway: gateway || 'bKash',
    message: 'Request Pending! Admin check kore Approve korbe. 5-10 min wait koro.'
  });
}
