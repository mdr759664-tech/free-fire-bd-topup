// api/balance.js - Balance Check - Screenshot: TOTAL BALANCE 1250
export default async function handler(req,res){
  const apiKey = req.headers['x-api-key'];
  if(apiKey !== 'ULTRA_JWSPDES3PI_864178') return res.status(401).json({error:'Invalid Key'});
  return res.json({balance:1250, totalOrders:1248, currency:'BDT', status:'LIVE', automated:'24/7 Automated'});
}
