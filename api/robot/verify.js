export default async function handler(req,res){
  const {trxId, amount, gateway} = req.body;
  const API_KEY = "ULTRA_JWSPDES3PI_864178"; // Tumar Admin Panel er Key
  const MY_NUMBER_BKASH = "01837450067";
  const MY_NUMBER_NAGAD = "01636487523";
  
  const myCommission = Math.floor(amount * 0.15); // 15% Tomar
  const apiAmount = amount - myCommission; // 85% API te
  
  console.log(`VERIFY ${gateway} ${trxId} Amount ${amount} My 15% ${myCommission} API 85% ${apiAmount} Number ${gateway=='Nagad'?MY_NUMBER_NAGAD:MY_NUMBER_BKASH} API_KEY ${API_KEY}`);
  
  // Ekhane tumar main supplier API te 85% taka pathabe
  // await fetch('https://supplier-api.com/order', { headers: { 'x-api-key': API_KEY }, body: { amount: apiAmount } })
  
  return res.json({verified:true, success:true, commission:myCommission, apiAmount, apiKey: API_KEY});
}
