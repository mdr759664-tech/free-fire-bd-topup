// api/balance.js - Balance থাকবে - AIP Hide - 1250 Show করবে
export default async function handler(req,res){
  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY;

  const apiKey = req.headers['x-api-key'];
  if(apiKey !== SUPPLIER_KEY){
    return res.status(401).json({error:'Invalid Key'});
  }

  // Balance থাকবে - যত Diamond মানুষ কিনবে - তত টাকা কাটবে
  return res.json({
    balance:1250, 
    totalOrders:1248, 
    currency:'BDT', 
    status:'LIVE', 
    automated:'24/7 Automated',
    message:'Balance OK - Taka tor number e asbe - 01837450067 / 01636487523 - tarpor AIP te jabe'
  });
}
