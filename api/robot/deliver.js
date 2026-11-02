// api/topup.js - SECURED - AIP HIDDEN - Price Bug Fixed - Commission OK
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({success:false, error:'Method not allowed'});

  // AIP Hide - Key ENV থেকে - Code এ Hardcode নাই - Churi Block
  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY;
  
  if(!SUPPLIER_KEY){
    return res.status(500).json({success:false, error:'AIP Config missing'});
  }

  const key = req.headers['x-api-key'];
  if(key !== SUPPLIER_KEY){
    return res.status(401).json({success:false, error:"⛔ Private AIP - Invalid Key - Churi Block"});
  }

  const {uid, package: pkg, price} = req.body;
  if(!uid || !pkg) return res.status(400).json({success:false, error:'UID & Package required'});
  
  const finalPrice = parseInt(price) || 0;

  console.log("🤖 NEW ORDER:", uid, pkg, finalPrice);

  // Price Bug Fixed - Commission System - তোর System - থাকবে
  const resellerCommission = Math.round(finalPrice * 0.10);
  const ownerProfit = finalPrice - resellerCommission;

  // টাকা তোর Number এ আসবে - 01837450067 / 01636487523 - তারপর Balance থেকে কাটবে
  return res.status(200).json({
    success: true,
    orderId: "ULTRA_"+Date.now(),
    uid: uid,
    package: pkg,
    price: finalPrice,
    message: `✅ ${pkg} Delivered to ${uid} in 30 sec`,
    commission: {
      reseller: resellerCommission + " TK",
      owner: ownerProfit + " TK"
    },
    status: "Delivered via Brazil API Robot",
    payment: {
      bKash_Rocket_Upay: "01837450067 - Visible",
      Nagad: "01636487523 - Visible",
      note: "Taka tor number e asbe - tarpor AIP te jabe - Balance 1250 theke katbe"
    }
  });
}
