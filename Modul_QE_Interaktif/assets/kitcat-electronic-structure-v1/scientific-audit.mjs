export function scientificAudit(x){
 const warnings=[],blocks=[],passes=[];const field=k=>String(x[k]??'').trim();
 const dataset=Array.isArray(x.files)?x.files:[];
 if(!dataset.length)blocks.push('Tidak ada file spektrum yang tercatat.');else passes.push(`${dataset.length} berkas sumber tercatat.`);
 if(field('referenceSource')==='unknown'||!field('referenceSource'))blocks.push('Asal Fermi / referensi energi belum didefinisikan.');
 else if(field('referenceSource')==='manual')warnings.push('Fermi diisi manual; cocokkan nilainya dengan run sumber.');
 else passes.push('Sumber referensi energi dicatat; konsistensinya tetap perlu diverifikasi.');
 if(!Number.isFinite(Number(x.fermi))||field('fermi')==='')blocks.push('Nilai referensi energi belum diberikan sebagai angka eksplisit.');
 else passes.push('Angka referensi energi tercatat.');
 for(const k of ['system','functional','pseudopotentials','kmesh','cutoffs','smearing','spin','qeVersion']) if(!field(k))warnings.push(`Metadata ${k} belum diisi.`);
 if(x.tab==='banddos' && (!dataset.some(n=>/band|gnu/i.test(n)) || !dataset.some(n=>/dos/i.test(n))))warnings.push('Pastikan nama file dan provenance untuk Bands serta DOS tercantum.');
 if(x.tab==='combined' && !dataset.some(n=>/pdos/i.test(n)))warnings.push('Pastikan file PDOS telah diunggah dan dicatat.');
 if(!field('compatibility'))warnings.push('Konfirmasi kesesuaian sumber DOS/Bands/PDOS belum diberikan.');
 if(field('compatibility')==='mismatch')blocks.push('Pengguna menyatakan dataset tidak kompatibel.');
 if(field('demo')==='yes')blocks.push('Data demo sintetis tidak boleh digunakan sebagai figure hasil penelitian.');
 const status=blocks.length?'BLOCKED':warnings.length?'REVIEW_REQUIRED':'DOCUMENTED_ONLY';
 return {status,blocks,warnings,passes,disclaimer:'Audit statis dan self-declaration; DOCUMENTED_ONLY bukan jaminan validitas DFT atau kesiapan jurnal.'};
}
export function manifest(x){return {schema:'kitcat-electronic-figure-manifest/1.0',createdAt:new Date().toISOString(),studio:'KITCAT Electronic Structure Studio 1.5',dataset:x.files||[],figure:{tab:x.tab,fermi_eV:x.fermi,referenceSource:x.referenceSource,energyWindow_eV:[x.xmin,x.xmax],style:x.style},method:{system:x.system,functional:x.functional,pseudopotentials:x.pseudopotentials,kmesh:x.kmesh,cutoffs:x.cutoffs,smearing:x.smearing,spin:x.spin,qeVersion:x.qeVersion,compatibility:x.compatibility},audit:scientificAudit(x)};}
