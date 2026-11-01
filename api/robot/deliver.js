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
  console.log("ROBOT ORDER:", uid, pkg, price);

  // এখানে তোর Auto TopUp Logic বসবে
  return res.status(200).json({
    success: true,
    orderId: "ULTRA_"+Date.now(),
    uid: uid,
    package: pkg,
    message: "Delivered"
  });
}
