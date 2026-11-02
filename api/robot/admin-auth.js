// api/admin-auth.js - Gmail + Password - ENV - ultratupup@gmail.com
export default function handler(req,res){
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ultratupup@gmail.com';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'ultra12345';

  if(req.method === 'GET'){
    const cookie = req.headers.cookie || '';
    if(cookie.includes('ultra_auth=ok')) return res.json({authenticated:true});
    return res.json({authenticated:false});
  }
  
  if(req.method === 'POST'){
    const {email, password} = req.body;
    if(email === ADMIN_EMAIL && password === ADMIN_PASS){
      res.setHeader('Set-Cookie', 'ultra_auth=ok; Path=/; HttpOnly; Max-Age=86400; Secure; SameSite=Strict');
      return res.json({ok:true});
    }
    return res.status(401).json({ok:false});
  }
}
