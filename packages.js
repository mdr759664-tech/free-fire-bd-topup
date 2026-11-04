// packages.js - ULTRA TOP UP BD - FIXED with Special Offer
const productData = {

// --- NEW SPECIAL OFFER - 10% OFF ---
'Spacial offer - 10% OFF': {
  packs:[
    {name:'PREMIUM USERS', price:50, diamonds:'1000 Diamond', special:'premium'},
    {name:'FRIDAY OFFER', price:80, diamonds:'2000 Diamond', special:'friday'},
    {name:'FREE 25 DIAMOND', price:0, diamonds:'FREE', special:'telegram', link:'https://t.me/+Q6GAbYR_AusxMjE1'}
  ]
},

'FF TopUp [BD]': {
  packs:[
    {name:'Weekly', price:155},
    {name:'2X Weekly', price:310},
    {name:'3X Weekly', price:465},
    {name:'5X Weekly', price:780},
    {name:'Monthly', price:780},
    {name:'2X Monthly', price:1560},
    {name:'1Weekly + 1Monthly', price:935},
    {name:'4Weekly + 1Monthly', price:1404},
    {name:'25 Diamond', price:21},
    {name:'50 Diamond', price:36},
    {name:'115 Diamond', price:78},
    {name:'240 Diamond', price:156},
    {name:'355 Diamond', price:234},
    {name:'505 Diamond', price:333},
    {name:'610 Diamond', price:400},
    {name:'850 Diamond', price:558},
    {name:'1090 Diamond', price:712},
    {name:'1240 Diamond', price:820},
    {name:'1720 Diamond', price:1132},
    {name:'2090 Diamond', price:1376},
    {name:'2530 Diamond', price:1600},
    {name:'5060 Diamond', price:3220},
    {name:'10120 Diamond', price:6440}
  ]
},
'Weekly/Monthly Offer': {
  packs:[
    {name:'Weekly', price:155},
    {name:'2X Weekly', price:310},
    {name:'3X Weekly', price:465},
    {name:'5X Weekly', price:780},
    {name:'Monthly', price:780},
    {name:'2X Monthly', price:1560},
    {name:'1Weekly + 1Monthly', price:935},
    {name:'4Weekly + 1Monthly', price:1404}
  ]
},
'Weekly Lite': {
  packs:[
    {name:'Weekly Lite', price:42},
    {name:'2x Weekly Lite', price:84},
    {name:'4x Weekly Lite', price:168},
    {name:'3x Weekly Lite', price:126},
    {name:'5x Weekly Lite', price:210}
  ]
},
'Level Up Pass (BD Server)': {
  packs:[
    {name:'LevelUp Package - level 6', price:40},
    {name:'Level Up Package - level 10', price:75},
    {name:'Level Up Package - level 15', price:75},
    {name:'Level Up Package - level 20', price:75},
    {name:'Level Up Package - level 25', price:75},
    {name:'Level Up Package - level 30', price:105}
  ]
},
'PUBG UC': {
  packs:[
    {name:'60 UC', price:115},
    {name:'120 UC', price:230},
    {name:'180 UC', price:345},
    {name:'240 UC', price:460},
    {name:'325 UC', price:580},
    {name:'660 UC', price:1150},
    {name:'985 UC', price:1700}
  ]
},
'TikTok Like-Follow': {
  packs:[
    {name:'100 Followers', price:80},
    {name:'200 Followers', price:130},
    {name:'500 Followers', price:230},
    {name:'1K Followers', price:360},
    {name:'3K Followers', price:1000},
    {name:'5K Followers', price:1490}
  ]
},
'FF Like': {
  packs:[
    {name:'100 Likes', price:20},
    {name:'200 Likes', price:25}
  ]
},
'UNIPIN VOUCHER BD': {
  packs:[
    {name:'10 USD', price:1099}
  ]
},
'Indonesia Server [UID]': {
  packs:[
    {name:'70 Diamond', price:115},
    {name:'150 Diamond', price:120},
    {name:'210 Diamond', price:215},
    {name:'355 Diamond', price:285}
  ]
},
'ChatGPT Plus': {
  packs:[
    {name:'ChatGPT Plus 1 Month', price:479}
  ]
}
};

// --- SPECIAL OFFER CLICK HANDLER ---
// এইটা তোমার main js file এ বা index.html এর নিচে বসাও
function handleSpecialOffer(packName){
  if(packName.includes('PREMIUM USERS')){
    alert("🔥 PREMIUM USERS OFFER 🔥\n\n💎 1000 Diamond = 350 Taka\n\n✅ Eta Rank Master (Heroic / Grandmaster) Player der jonno Special Offer!\n\nRank Master hole Support e Screenshot din!");
    return true;
  }
  if(packName.includes('FRIDAY OFFER')){
    alert("🎉 FRIDAY SPECIAL OFFER 🎉\n\n💎 2000 Diamond = 860 Taka\n\n✅ Eta Friday Special Offer!\n\nFriday te Rank Master hole Support e message din!");
    return true;
  }
  if(packName.includes('FREE 25')){
    if(confirm("🎁 FREE 25 DIAMOND 🎁\n\nAmar Telegram Channel e Redeem Code deya ache!\n\nChannel e Join kore Code niye 25 Diamond FREE nin!")){
      window.open("https://t.me/+Q6GAbYR_AusxMjE1", "_blank");
    }
    return true;
  }
  return false;
}
