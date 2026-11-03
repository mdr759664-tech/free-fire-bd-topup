// api/robot/order.js - ALL COUNTRY - BD, INDONESIA, BRAZIL, SINGAPORE, SOB DESH - ULTRA
// bKash/Rocket/Upay 01837450067 | Nagad 01636487523

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  let {uid, package:pack, price, gateway, diamond} = req.body;
  
  if(!uid || !pack){
    if(diamond){ pack = `${diamond} Diamond`; } 
    else { return res.status(400).json({success:false, error:'UID & Package required'}); }
  }

  // ==== ALL COUNTRY SERVER DETECT - SOB DESH ====
  function detectServer(name){
    const n = (name||'').toLowerCase();
    // Indonesia Server [UID] - Tumar list e ache
    if(n.includes('indonesia') || n.includes('indo')) return 'indonesia';
    // Brazil Server
    if(n.includes('brazil') || n.includes('brasil') || n.includes('br')) return 'brazil';
    // Singapore / Middle East / Europe / USA
    if(n.includes('singapore') || n.includes('sg')) return 'singapore';
    if(n.includes('middle') || n.includes('mena')) return 'mena';
    if(n.includes('europe') || n.includes('eu')) return 'europe';
    if(n.includes('america') || n.includes('na') || n.includes('usa')) return 'usa';
    // Like / TikTok
    if(n.includes('like') || n.includes('follow') || n.includes('tiktok')) return 'like';
    // PUBG UC
    if(n.includes('pubg') || n.includes('uc')) return 'pubg';
    // Level Up Pass
    if(n.includes('level') || n.includes('pass')) return 'bd_level';
    // Default BD Server - sob diamond BD te jabe - tai miss hobe na
    return 'bd';
  }

  const server = detectServer(pack);

  // Number - bKash/Rocket/Upay 01837450067 | Nagad 01636487523
  let senderNumber = '01837450067';
  let senderName = 'bKash/Rocket/Upay';
  if(gateway === 'Nagad' || gateway === 'nagad'){
    senderNumber = '01636487523';
    senderName = 'Nagad';
  }

  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY || "ULTRA_JWSPDES3PI_864178";
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup';

  let diamondAmount = diamond || 0;
  if(!diamondAmount){
    const match = pack.match(/(\d+)/);
    if(match) diamondAmount = parseInt(match[1]);
  }

  console.log(`ALL COUNTRY - UID:${uid} Pack:${pack} Diamond:${diamondAmount} Server:${server} - SOB DESH E JABE`);

  try{
    const r = await fetch(SUPPLIER_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': SUPPLIER_KEY,
        'X-Server': server,
        'X-Country': server,
        'X-Diamond': String(diamondAmount)
      },
      body: JSON.stringify({
        uid: String(uid).trim(),
        package: pack,
        diamond: diamondAmount,
        price: price,
        server: server,
        country: server,
        gateway: gateway,
        number: senderNumber,
        game: server === 'pubg' ? 'PUBG' : 'Free Fire',
        custom: true,
        allCountry: true
      })
    });

    let data = {orderId: `ULTRA_${server.toUpperCase()}_${Date.now()}`};
    try{ data = await r.json(); }catch(e){}

    return res.json({
      success:true,
      orderId: data.orderId,
      server: server,
      country: server,
      diamond: diamondAmount,
      package: pack,
      uid: uid,
      senderNumber: senderNumber,
      senderName: senderName,
      message: `🤖 ${server.toUpperCase()} ${pack} Done! UID ${uid} - ${diamondAmount} Diamond - ${senderName} ${senderNumber} - ID te asbe! ULTRA`
    });

  }catch(e){
    return res.json({
      success:true,
      orderId: `ULTRA_${server.toUpperCase()}_${Date.now()}`,
      server: server,
      country: server,
      diamond: diamondAmount,
      package: pack,
      uid: uid,
      senderNumber: senderNumber,
      senderName: senderName,
      fallback:true,
      message: `🤖 ${server.toUpperCase()} Queued! ${pack} UID ${uid} - ID te asbe! ${senderName} ${senderNumber} - ULTRA`
    });
  }
}
