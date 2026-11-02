// তুই যেটা দিলি ওইটাই - আমি ঠিক করে দিলাম price bug টা
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({success:false});

  const key = req.headers['x-api-key'];
  if(key !== 'ULTRA_JWSPDES3PI_864178'){
    return res.status(401).json({success:false, error:"Invalid Key"});
  }

  const {uid, package: pkg, price} = req.body;
  const finalPrice = parseInt(price) || 0;

  console.log("🤖 NEW ORDER:", uid, pkg, finalPrice);

  const resellerCommission = Math.round(finalPrice * 0.10);
  const ownerProfit = finalPrice - resellerCommission;

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
    status: "Delivered via Brazil API Robot"
  });
}
