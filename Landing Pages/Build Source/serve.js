const http=require('http'),fs=require('fs'),p=require('path');
const root=p.join(__dirname,'out');
const ct={'.html':'text/html','.png':'image/png','.jpg':'image/jpeg','.js':'text/javascript','.css':'text/css'};
http.createServer((q,r)=>{let f=decodeURIComponent(q.url.split('?')[0]);if(f==='/')f='/index.html';const fp=p.join(root,f);fs.readFile(fp,(e,d)=>{if(e){r.writeHead(404);r.end('404 '+f);return}r.writeHead(200,{'Content-Type':ct[p.extname(fp)]||'text/plain'});r.end(d);});}).listen(5599,()=>console.log('Serving out/ at http://localhost:5599'));
