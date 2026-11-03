// api/verify.js - FULL FINAL - ULTRA TOP UP BD - Add Money Verify
// bKash / Rocket / Upay = 01837450067 | Nagad = 01636487523 | 15% Tomar

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  const {trxId, amount, gateway} = req.body;
  if(!trxId || !amount) return res.status(400).json({success:false, error:'TrxID & Amount required'});

  // ==== NUMBER FIXED - TUMAR NUMBER ====
  const MY_BKASH = "01837450067";  // bKash - 01837450067
  const MY_ROCKET = "01837450067"; // Rocket - 01837450067
  const MY_UPAY = "01837450067";   // Upay - 01837450067
  const MY_NAGAD = "01636487523";  // Nagad - 01636487523

  let MY_NUMBER = MY_BKASH;
  let GATEWAY_NAME = "bKash";

  if(gateway === 'Nagad' || gateway === 'nagad'){
    MY_NUMBER = MY_NAGAD;
    GATEWAY_NAME = "Nagad";
  } else if(gateway === 'Rocket' || gateway === 'rocket'){
    MY_NUMBER = MY_ROCKET;
    GATEWAY_NAME = "Rocket";
  } else if(gateway === 'Upay' || gateway === 'upay'){
    MY_NUMBER = MY_UPAY;
    GATEWAY_NAME = "Upay";
  } else {
    MY_NUMBER = MY_BKASH;
    GATEWAY_NAME = "bKash";
  }

  // ==== API KEY - ENV THEKE SECURED ====
  const API_KEY = process.env.SUPPLIER_API_KEY || "ULTRA_JWSPDES3PI_864178";
  const SUPPLIER_URL = process.env.SUPPLIER_API_URL || "https://ultra-top-up-bd.vercel.app/api/topup";

  // 15% Tomar, 85% Supplier API te
  const myCommission = Math.floor(amount * 0.40);
  const apiAmount = amount - myCommission;
  
  console.log(`VERIFY ${GATEWAY_NAME} Trx:${trxId} Amount:${amount} My15%:${myCommission} API85%:${apiAmount} Number:${MY_NUMBER} KEY:${API_KEY}`);

  try{
    // Supplier API te 85% pathabe - Auto
    await fetch(SUPPLIER_URL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        trxId,
        amount: apiAmount,
        realAmount: amount,
        commission: myCommission,
        gateway: GATEWAY_NAME,
        number: MY_NUMBER,
        type: 'add_money'
      })
    });
  }catch(e){}

  return res.json({
    verified:true, 
    success:true, 
    trxId,
    amount,
    gateway: GATEWAY_NAME,
    number: MY_NUMBER,
    commission: myCommission,
    apiAmount: apiAmount,
    message: `Verified! ${GATEWAY_NAME} ${MY_NUMBER} e ${amount}TK - My40% ${myCommission}TK - API 85% ${apiAmount}TK - ULTRA`
  });
}
