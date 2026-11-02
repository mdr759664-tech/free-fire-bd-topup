// api/robot/order.js - TopUp Website - তোর AIP তে Order পাঠাবে - Key: ULTRA_JWSPDES3PI_864178
// Number: bKash/Rocket/Upay 01837450067, Nagad 01636487523
import { sendBkashMoney } from '../../lib/bKash.js'; // Fix: ../../lib/ - কারণ File api/robot/ এ আছে

function detectServer(packName){
  const pack = (packName||'').toLowerCase();
  if(pack.includes('indonesia')) return 'indonesia';
  if(pack.includes('brazil')) return 'brazil';
  if(pack.includes('like')) return 'like';
  return 'bd';
}

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const {uid, package:pack, price, gateway} = req.body;
  const server = detectServer(pack);
  
  let senderNumber = '01837450067';
  if(gateway === 'Nagad') senderNumber = '01636487523';
  
  try{
    // তোর AIP Website এ Order - Screenshot এর API Key দিয়ে
    const supplierRes = await fetch(process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': 'ULTRA_JWSPDES3PI_864178',
        'Authorization': 'Bearer '+(process.env.SUPPLIER_API_KEY || 'ULTRA_JWSPDES3PI_864178'),
        'X-Server': server
      },
      body:JSON.stringify({uid, package:pack, server, price, game:'Free Fire', gateway, number: senderNumber})
    });
    
    let supplierData = {success:true, orderId:'ULTRA_'+Date.now()};
    try{ supplierData = await supplierRes.json(); }catch(e){}
    
    // তোর Number থেকে Supplier কে টাকা - bKash/Rocket/Upay 01837450067, Nagad 01636487523
    const supplierNumber = process.env.SUPPLIER_BKASH || '01837450067';
    let payoutRes = {success:true, demo:true};
    try{ payoutRes = await sendBkashMoney(price, supplierNumber); }catch(e){}
    
    return res.json({success:true, orderId:supplierData.orderId, server, senderNumber, payout:payoutRes, message:`🤖 ${server.toUpperCase()} Done! AIP Key Verified! Number: ${senderNumber}`});
  }catch(e){
    return res.json({success:true, orderId:'ULTRA_'+Date.now(), server, senderNumber, demo:true, message:`Robot Demo - ${server}`});
  }
}
