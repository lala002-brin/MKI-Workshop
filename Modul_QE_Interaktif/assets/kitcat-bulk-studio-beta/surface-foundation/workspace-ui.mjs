// Display-only workspace toggles. No geometry or QE data mutation.
const modes = {normal: 'Tampilan normal — panel pengaturan dan viewer.',focus: 'Fokus viewer — panel pengaturan disembunyikan sementara.',compact: 'Panel ringkas — pengaturan tetap dapat digunakan.'};
const buttons = {normal: document.getElementById('layout-normal'), focus: document.getElementById('layout-focus'), compact: document.getElementById('layout-compact')};
const status = document.getElementById('layout-info');
function modeSelect(mode) {
  if (!Object.hasOwn(modes, mode)) return;
  document.body.classList.toggle('layout-focus',mode==='focus');
  document.body.classList.toggle('layout-compact',mode==='compact');
  for (const [key,button] of Object.entries(buttons)) button?.setAttribute('aria-pressed',String(key===mode));
  if(status) status.textContent=modes[mode];
  // ResizeObserver on canvas container will update its rendered dimensions.
}
for (const [key,button] of Object.entries(buttons)) button?.addEventListener('click',()=>modeSelect(key));
modeSelect('normal');
