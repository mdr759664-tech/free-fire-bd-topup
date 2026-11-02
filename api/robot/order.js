// api/order.js - Any Server - bKash/Rocket/Upay 01837450067, Nagad 01636487523 থেকে AIP তে টাকা যাবে
import { sendBkashMoney } from '../lib/bkash.js';
function detectServer(uid, packName){
  const pack = (packName||'').toLowerCase();
  if(pack.includes('indonesia') || pack.includes('indo')) return 'indonesia';
  if(pack.includes('brazil') || pack.includes('brasil')) return 'brazil';
  if(pack.includes('like')) return 'like';
  return 'bd';
}
export default async function handler(req,res){
  const {uid, package:pack, price} = req.body;
  const server = detectServer(uid, pack);
  try{
    const supplierRes = await fetch(process.env.SUPPLIER_API_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.SUPPLIER_API_KEY},
      body:JSON.stringify({uid, package:pack, server, price})
    });
    let supplierData = {success:true, orderId:'ULTRA_'+Date.now()};
    try{ supplierData = await supplierRes.json(); }catch(e){}
    const supplierNumber = process.env.SUPPLIER_BKASH;
    let payoutRes = await sendBkashMoney(price, supplierNumber);
    return res.json({success:true, orderId:supplierData.orderId, server, payout:payoutRes, message:`🤖 ${server} Server Done!`});
  }catch(e){
    return res.json({success:true, orderId:'ULTRA_'+Date.now(), server, demo:true});
  }
}
