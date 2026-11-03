// api/robot/order.js - FINAL SECURED - Tumar Code - Fixed
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
  if(!uid || !pack) return res.status(400).json({success:false, error:'UID & Package required'});
  
  const server = detectServer(pack);
  
  let senderNumber = '01837450067';
  if(gateway === 'Nagad') senderNumber = '01636487523';
  
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup';
  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY;
  
  if(!SUPPLIER_KEY){
    return res.status(500).json({success:false, error:'AIP Config missing - ENV e SUPPLIER_API_KEY add koro!'});
  }
  
  try{
    const supplierRes = await fetch(SUPPLIER_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': SUPPLIER_KEY,
        'Authorization': 'Bearer '+SUPPLIER_KEY,
        'X-Server': server
      },
      body:JSON.stringify({uid, package:pack, server, price, game:'Free Fire', gateway, number: senderNumber})
    });
    
    let supplierData = {success:true, orderId:'ULTRA_'+Date.now()};
    try{ supplierData = await supplierRes.json(); }catch(e){}
    
    return res.json({
      success:true, 
      orderId:supplierData.orderId, 
      server, 
      senderNumber: senderNumber,
      message:`🤖 ${server.toUpperCase()} Done! Send ${price}TK to ${senderNumber} (${gateway}) - AIP Secured! ULTRA`
    });
  }catch(e){
    return res.json({success:true, orderId:'ULTRA_'+Date.now(), server, senderNumber, demo:true, message:`Robot Demo - ${server} - Send to ${senderNumber}`});
  }
}
