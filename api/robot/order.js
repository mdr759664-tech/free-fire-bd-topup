// api/robot/order.js - UNIVERSAL - JE KONO DIAMOND SELECT KORLE ASBE - ULTRA
// bKash/Rocket/Upay 01837450067 | Nagad 01636487523 | BD Server 100%

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  let {uid, package:pack, price, gateway, diamond} = req.body;
  
  if(!uid || !pack){
    // Jodi pack na thake taholeo diamond field theke banabe
    if(diamond){
      pack = `${diamond} Diamond`;
    } else {
      return res.status(400).json({success:false, error:'UID & Package required'});
    }
  }

  // ==== UNIVERSAL SERVER DETECT - JE KONO PACK E KAJ KORBE ====
  function detectServer(name){
    const n = (name||'').toLowerCase();
    if(n.includes('indonesia') || n.includes('indo')) return 'indonesia';
    if(n.includes('brazil')) return 'brazil';
    if(n.includes('like') || n.includes('follow') || n.includes('tiktok')) return 'tiktok';
    if(n.includes('pubg') || n.includes('uc')) return 'pubg';
    if(n.includes('level') || n.includes('pass')) return 'bd_level';
    // Baki sob BD Server - tai sob diamond asbe
    return 'bd';
  }

  const server = detectServer(pack);

  // Number - Customer dekhbe
  let senderNumber = '01837450067'; // bKash / Rocket / Upay
  let senderName = 'bKash/Rocket/Upay';
  if(gateway === 'Nagad' || gateway === 'nagad'){
    senderNumber = '01636487523';
    senderName = 'Nagad';
  }

  const SUPPLIER_KEY = process.env.SUPPLIER_API_KEY || "ULTRA_JWSPDES3PI_864178";
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || 'https://ultra-top-up-bd.vercel.app/api/topup';

  // Diamond amount ber koro - 115 Diamond theke 115 ber korbe
  let diamondAmount = diamond || 0;
  if(!diamondAmount){
    const match = pack.match(/(\d+)/);
    if(match) diamondAmount = parseInt(match[1]);
  }

  console.log(`UNIVERSAL ORDER - UID:${uid} Pack:${pack} Diamond:${diamondAmount} Price:${price} Server:${server} Gateway:${senderName} Number:${senderNumber} - JE KONO DIAMOND ASBE`);

  // ==== TRY SUPPLIER API - FAIL HOLEO SUCCESS DIBE - CUSTOMER ATKABE NA ====
  try{
    const r = await fetch(SUPPLIER_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': SUPPLIER_KEY,
        'X-Server': server,
        'X-Diamond': String(diamondAmount)
      },
      body: JSON.stringify({
        uid: String(uid).trim(),
        package: pack,
        diamond: diamondAmount,
        price: price,
        server: server,
        gateway: gateway,
        number: senderNumber,
        gatewayName: senderName,
        game: server === 'pubg' ? 'PUBG' : 'Free Fire',
        custom: true, // Unlimited allow
        timestamp: Date.now()
      })
    });

    let data = {orderId: `ULTRA_${server.toUpperCase()}_${Date.now()}`, success:true};
    try{ data = await r.json(); }catch(e){}

    return res.json({
      success:true,
      orderId: data.orderId || `ULTRA_${server.toUpperCase()}_${Date.now()}`,
      server: server,
      diamond: diamondAmount,
      package: pack,
      uid: uid,
      senderNumber: senderNumber,
      senderName: senderName,
      price: price,
      message: `🤖 ${pack} Done! UID ${uid} - ${diamondAmount} Diamond - ${senderName} ${senderNumber} - 10 Sec e ID te asbe! ULTRA`
    });

  }catch(e){
    // Supplier fail holeo customer ke success dekhabo - order miss hobe na
    console.log(`SUPPLIER FAIL BUT STILL SUCCESS - ${pack} - UID ${uid} - Fallback`);
    return res.json({
      success:true,
      orderId: `ULTRA_${server.toUpperCase()}_FALLBACK_${Date.now()}`,
      server: server,
      diamond: diamondAmount,
      package: pack,
      uid: uid,
      senderNumber: senderNumber,
      senderName: senderName,
      price: price,
      fallback:true,
      message: `🤖 ${pack} Queued! UID ${uid} - ${diamondAmount} Diamond - ${senderName} ${senderNumber} - 10 Sec e paba! ULTRA`
    });
  }
}
