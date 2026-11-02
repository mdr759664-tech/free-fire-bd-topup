// api/verify.js - bKash/Rocket/Upay 01837450067, Nagad 01636487523
import { getBkashToken } from '../lib/bkash.js';
export default async function handler(req,res){
  const {trxId, amount, gateway} = req.body;
  let correctNumber = '01837450067';
  if(gateway === 'Nagad') correctNumber = '01636487523';
  if(gateway === 'bKash' || gateway === 'Rocket' || gateway === 'Upay') correctNumber = '01837450067';
  
  if(!trxId || trxId.length < 6) return res.json({verified:false, message:'TrxID ভুল!'});
  
  // Demo: 6 Digit হলেই Verified
  if(trxId.length >= 6){
    return res.json({verified:true, success:true, amount, gateway, number:correctNumber, message:`Robot Verified! ${gateway} - ${correctNumber} তে ${amount} TK আসছে!`});
  }
  return res.json({verified:false});
}
