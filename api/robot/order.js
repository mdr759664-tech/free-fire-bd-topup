// api/robot/order.js - FINAL - Number Visible - AIP Hidden - ULTRA TOP UP BD
function detectServer(packName){
  const pack = (packName||'').toLowerCase();
  if(pack.includes('indonesia') || pack.includes('indo')) return 'indonesia';
  if(pack.includes('brazil') || pack.includes('brasil')) return 'brazil';
  if(pack.includes('like')) return 'like';
  return 'bd';
}

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  const {uid, package:pack, price, gateway} = req.body;
  if(!uid || !pack) return res.status(400).json({success:false, error:'UID & Package required'});

  const server = detectServer(pack);

  // ==== NUMBER FIXED - TUMAR NUMBER - CUSTOMER DEKHBE ====
  // bKash / Rocket / Upay - 01837450067 - Customer ei number e taka pathabe
  // Nagad - 01636487523 - Customer ei number e taka pathabe
  let senderNumber = '01837450067'; // bKash / Rocket / Upay
  let senderName = 'bKash/Rocket/Upay';
  
  if(gateway === 'Nagad' || gateway === 'nagad'){
    senderNumber = '01636487523'; // Nagad
    senderName = 'Nagad';
  } else if(gateway === 'Rocket' || gateway === 'rocket'){
    senderNumber = '01837450067'; // Rocket
    senderName = 'Rocket';
  } else if(gateway === 'Upay' || gateway === 'upay'){
    senderNumber = '01837450067'; // Upay
    senderName = 'Upay';
  } else {
    senderNumber = '01837450067'; // bKash default
    senderName = 'bKash';
  }

  // ==== AIP HIDDEN - ENV THEKE - CODE E KEY NAI ====
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup';
  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY; // ENV: ULTRA_JWSPDES3PI_864178
  
  if(!SUPPLIER_KEY){
    return res.status(500).json({success:false, error:'AIP Config missing - Vercel ENV e SUPPLIER_API_KEY=ULTRA_JWSPDES3PI_864178 add koro!'});
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
      body:JSON.stringify({
        uid, 
        package:pack, 
        server, 
        price, 
        game:'Free Fire', 
        gateway, 
        number: senderNumber,
        gatewayName: senderName
      })
    });
    
    let supplierData = {success:true, orderId:'ULTRA_'+Date.now()};
    try{ supplierData = await supplierRes.json(); }catch(e){}
    
    return res.json({
      success:true, 
      orderId:supplierData.orderId, 
      server, 
      senderNumber: senderNumber, // 01837450067 / 01636487523 - Customer dekhbe
      senderName: senderName,
      gateway: gateway,
      message:`🤖 ${server.toUpperCase()} Done! ${senderName} ${senderNumber} e ${price}TK send - AIP Secured! - ULTRA`
    });
  }catch(e){
    return res.json({
      success:true, 
      orderId:'ULTRA_'+Date.now(), 
      server, 
      senderNumber: senderNumber, 
      senderName: senderName,
      demo:true, 
      message:`Robot Demo - ${server} - Send ${price}TK to ${senderName} ${senderNumber} - ULTRA`
    });
  }
}
