// Small ZIP writer (STORE method): offline, no dependencies, no compression.
const encoder = new TextEncoder();
const table = Array.from({length:256},(_,k)=>{let c=k;for(let i=0;i<8;i++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
export function crc32(bytes){let c=0xffffffff;for(const x of bytes)c=table[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
export function createZip(files){
 if(!Array.isArray(files)||!files.length)throw Error('ZIP requires files');
 if(files.length>500)throw Error('Too many ZIP entries');
 const chunks=[],central=[];let offset=0;
 const safe=x=>typeof x==='string' && /^[A-Za-z0-9_./-]+$/.test(x)&&!x.startsWith('/')&&!x.split('/').includes('..')&& !x.endsWith('/');
 const seen=new Set();
 const u16=(v)=>[v&255,(v>>>8)&255],u32=v=>[v&255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255];
 for(const f of files){
  if(!safe(f.name)||seen.has(f.name))throw Error('Invalid/duplicate ZIP name: '+f.name);seen.add(f.name);
  const name=encoder.encode(f.name),body=typeof f.content==='string'?encoder.encode(f.content):f.content;
  if(!(body instanceof Uint8Array))throw Error('ZIP content must be text or bytes');
  if(body.length>20_000_000)throw Error('Individual file too large');
  const crc=crc32(body),size=body.length;
  const local=Uint8Array.from([...u32(0x04034b50),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(size),...u32(size),...u16(name.length),...u16(0)]);
  chunks.push(local,name,body);
  const dir=Uint8Array.from([...u32(0x02014b50),...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(size),...u32(size),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset)]);
  central.push(dir,name);offset+=local.length+name.length+size;
 }
 if(offset>100_000_000)throw Error('ZIP too large');
 const centralSize=central.reduce((s,c)=>s+c.length,0);
 const end=Uint8Array.from([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(centralSize),...u32(offset),...u16(0)]);
 return new Blob([...chunks,...central,end],{type:'application/zip'});
}
