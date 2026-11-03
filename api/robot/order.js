// api/robot/order.js - FULL FINAL - bKash/Rocket/Upay 01837450067 | Nagad 01636487523
function detectServer(packName){
  const p = (packName||'').toLowerCase();
  if(p.includes('indonesia')) return 'indonesia';
  if(p.includes('brazil')) return 'brazil';
  if(p.includes('like')) return 'like';
  return 'bd';
}

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const {uid, package:pack, price, gateway} = req.body;
  if(!uid || !pack) return res.status(400).json({success:false, error:'UID & Package required'});

  const server = detectServer(pack);

  let senderNumber = '01837450067';
  let senderName = 'bKash/Rocket/Upay';
  if(gateway === 'Nagad'){ senderNumber = '01636487523'; senderName = 'Nagad'; }

  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY || "ULTRA_JWSPDES3PI_864178";
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup';

  try{
    const r = await fetch(SUPPLIER_URL,{method:'POST', headers:{'Content-Type':'application/json','x-api-key':SUPPLIER_KEY}, body:JSON.stringify({uid, package:pack, server, price, gateway, number:senderNumber})});
    let d = {orderId:'ULTRA_'+Date.now()}; try{d=await r.json();}catch(e){}
    return res.json({success:true, orderId:d.orderId, server, senderNumber, senderName, message:`🤖 ${server} Done! ${senderName} ${senderNumber} - ULTRA`});
  }catch(e){
    return res.json({success:true, orderId:'ULTRA_'+Date.now(), server, senderNumber, senderName, demo:true, message:`Demo - Send ${price}TK to ${senderName} ${senderNumber}`});
  }
}
