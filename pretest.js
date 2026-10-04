const QUESTIONS = [
{q:"Which command displays the contents of the current directory?",o:["cd","ls","pwd","mkdir"],a:1,e:"ls lists files and directories in the specified directory."},
{q:"What does pwd display?",o:["The current working directory","The active process list","File permissions","The system kernel version"],a:0,e:"pwd prints the absolute path of the current working directory."},
{q:"Which command changes the current directory?",o:["mv","cp","cd","cat"],a:2,e:"cd changes the shell's current working directory."},
{q:"Which command creates a new directory?",o:["mkdir","touch","rm","grep"],a:0,e:"mkdir creates a directory."},
{q:"Which command copies a file?",o:["mv","cp","rm","chmod"],a:1,e:"cp copies files or directories."},
{q:"What does mv commonly do?",o:["Only prints a file","Moves or renames files and directories","Changes file permissions","Shows disk usage"],a:1,e:"mv moves a file or directory and can also rename it."},
{q:"Which command is commonly used to inspect the contents of a text file?",o:["cat","cd","chmod","whoami"],a:0,e:"cat prints file contents to the terminal."},
{q:"Which command changes file permissions?",o:["chmod","chown","pwd","find"],a:0,e:"chmod changes permission bits for files and directories."},
{q:"In Linux permissions, what does the first character '-' commonly indicate in an ls -l entry?",o:["Directory","Regular file","Symbolic link","Executable file"],a:1,e:"A leading '-' indicates a regular file. A leading 'd' indicates a directory."},
{q:"What is the main purpose of the PATH environment variable?",o:["Store a user's password","Tell the shell where to search for executable commands","Control file permissions","Store the current directory only"],a:1,e:"PATH contains directories searched by the shell when resolving commands."},
{q:"What is an environment variable?",o:["A graphical Linux application","A named value available to processes in the execution environment","A type of CPU","A file compression format"],a:1,e:"Environment variables provide named configuration values to processes."},
{q:"Which command prints environment variables and shell variables?",o:["env","mkdir","scp","tar"],a:0,e:"env displays the environment passed to the command."},
{q:"What is the purpose of a virtual environment such as Conda?",o:["Separate project dependencies and software versions","Increase monitor resolution","Replace the Linux kernel","Encrypt all files"],a:0,e:"Environments isolate software dependencies and versions between projects."},
{q:"Which command activates a Conda environment named mki?",o:["conda open mki","conda activate mki","conda start mki","conda use mki"],a:1,e:"conda activate mki activates the environment named mki."},
{q:"Why should computational projects record software versions and dependencies?",o:["To make terminal colors consistent","To improve reproducibility and troubleshooting","To reduce keyboard use","To prevent all numerical errors"],a:1,e:"Version and dependency records help others reproduce and diagnose the workflow."},
{q:"What does SSH primarily provide?",o:["Secure remote login and command execution","Automatic GPU overclocking","File compression only","Graphical image editing"],a:0,e:"SSH provides secure remote shell access and related communication."},
{q:"Which command has the typical SSH form shown below?",o:["ssh username@hostname","ssh username/hostname","remote username@hostname","login://hostname"],a:0,e:"ssh username@hostname specifies a user and remote host."},
{q:"What is the main difference between a local machine and a remote HPC login node?",o:["The remote node is accessed over a network and can provide access to shared compute resources","The local machine cannot run Linux","The login node is always a GPU","There is no difference"],a:0,e:"A remote HPC system is accessed through the network and provides a managed computing environment."},
{q:"Why should users generally avoid running heavy simulations directly on an HPC login node?",o:["Login nodes cannot display text","Login nodes are intended for access, preparation, and light tasks rather than heavy computation","SSH disables CPUs","The filesystem is read-only"],a:1,e:"HPC systems typically reserve login nodes for interactive access and preparation. Compute jobs should use allocated resources."},
{q:"What is a scheduler used for on an HPC cluster?",o:["Manage and allocate compute resources to jobs","Edit Markdown files","Change Linux passwords","Create chemical structures automatically"],a:0,e:"Schedulers queue and allocate CPU, memory, GPU, time, and other resources."},
{q:"What is a dependency in a computational software environment?",o:["A required library, package, or software component","A backup keyboard","A network cable","A folder name only"],a:0,e:"Dependencies are components required for software to run correctly."},
{q:"Why is it useful to use a project-specific environment for a simulation workflow?",o:["It guarantees physical correctness","It reduces dependency conflicts between projects","It eliminates the need for input files","It makes all simulations identical"],a:1,e:"Separate environments reduce conflicts between different package versions and requirements."},
{q:"Which command can show the full path of an executable found through PATH?",o:["which","mkdir","passwd","history"],a:0,e:"which reports the path to the executable resolved through PATH."},
{q:"Which practice is most appropriate before running a computational simulation?",o:["Ignore software versions","Check the environment, input files, resources, and expected outputs","Delete previous logs","Run everything on the login node"],a:1,e:"A basic pre-run check reduces configuration errors and improves reproducibility."},
{q:"A simulation works on one computer but fails on another because a required library has a different version. Which concept best explains the problem?",o:["Dependency and environment mismatch","Terminal font mismatch","Directory listing","SSH hostname"],a:0,e:"Different dependency versions can produce incompatible execution environments."}
];

const KEY="mki-linux-pretest-v1";

function renderQuestions(){
  const form=document.getElementById("pretest-form");
  form.innerHTML=QUESTIONS.map((x,i)=>`
    <section class="question-card" data-index="${i}">
      <div class="question-number">QUESTION ${String(i+1).padStart(2,"0")}</div>
      <div class="question-text">${escapeHTML(x.q)}</div>
      <div class="options">
        ${x.o.map((opt,j)=>`
          <label class="option">
            <input type="radio" name="q${i}" value="${j}" onchange="updateProgress()">
            <span>${String.fromCharCode(65+j)}. ${escapeHTML(opt)}</span>
          </label>`).join("")}
      </div>
      <div class="explanation"><strong>Explanation:</strong> ${escapeHTML(x.e)}</div>
    </section>`).join("");
}

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function updateProgress(){
  let answered=0;
  QUESTIONS.forEach((_,i)=>{
    if(document.querySelector(`input[name="q${i}"]:checked`)) answered++;
  });
  const pct=Math.round(answered/QUESTIONS.length*100);
  document.getElementById("progress-text").textContent=`${answered} / ${QUESTIONS.length} answered`;
  document.getElementById("progress-bar").style.width=pct+"%";
  document.getElementById("progress-label").textContent=pct+"% complete";
}

function collect(){
  const answers={};
  QUESTIONS.forEach((_,i)=>{
    const selected=document.querySelector(`input[name="q${i}"]:checked`);
    answers[i]=selected?Number(selected.value):null;
  });
  return {
    participant:document.getElementById("participant").value,
    date:document.getElementById("test-date").value,
    linuxExperience:document.getElementById("linux-experience").value,
    answers,
    savedAt:new Date().toISOString()
  };
}

function savePretest(){
  localStorage.setItem(KEY,JSON.stringify(collect()));
  document.getElementById("status").textContent="✓ Pretest saved locally.";
}

function restore(){
  const raw=localStorage.getItem(KEY);
  if(!raw)return;
  try{
    const d=JSON.parse(raw);
    document.getElementById("participant").value=d.participant||"";
    document.getElementById("test-date").value=d.date||"";
    document.getElementById("linux-experience").value=d.linuxExperience||"";
    Object.entries(d.answers||{}).forEach(([i,v])=>{
      if(v===null||v===undefined)return;
      const input=document.querySelector(`input[name="q${i}"][value="${v}"]`);
      if(input)input.checked=true;
    });
    updateProgress();
    document.getElementById("status").textContent="Previous pretest restored.";
  }catch(e){console.warn(e)}
}

function resetPretest(){
  if(!confirm("Reset all pretest answers?"))return;
  document.getElementById("pretest-form").reset();
  document.getElementById("participant").value="";
  document.getElementById("test-date").value="";
  document.getElementById("linux-experience").value="";
  localStorage.removeItem(KEY);
  document.getElementById("result").classList.add("hidden");
  document.getElementById("pretest-form").classList.remove("show-explanations");
  document.getElementById("status").textContent="Pretest reset.";
  updateProgress();
}

function submitPretest(){
  const data=collect();
  let correct=0, unanswered=0;
  QUESTIONS.forEach((x,i)=>{
    const selected=data.answers[i];
    const card=document.querySelector(`.question-card[data-index="${i}"]`);
    card.querySelectorAll(".option").forEach((el,j)=>{
      el.classList.remove("correct","incorrect");
      if(j===x.a && selected!==null) el.classList.add("correct");
      if(selected===j && selected!==x.a) el.classList.add("incorrect");
    });
    if(selected===null) unanswered++;
    else if(selected===x.a) correct++;
  });
  const incorrect=QUESTIONS.length-correct-unanswered;
  const pct=Math.round(correct/QUESTIONS.length*100);
  document.getElementById("score").textContent=`${correct} / ${QUESTIONS.length}`;
  document.getElementById("percentage").textContent=`${pct}%`;
  document.getElementById("correct-count").textContent=correct;
  document.getElementById("incorrect-count").textContent=incorrect;
  document.getElementById("unanswered-count").textContent=unanswered;
  document.getElementById("result-message").textContent=
    pct>=80?"Strong starting knowledge. You are ready for the workshop environment."
    :pct>=60?"Good foundation. Review the missed concepts before the hands-on sessions."
    :"Use the result as a baseline and review Linux, environment, SSH, and HPC fundamentals before continuing.";
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("pretest-form").classList.add("show-explanations");
  document.getElementById("status").textContent="✓ Pretest submitted and scored.";
  document.getElementById("result").scrollIntoView({behavior:"smooth",block:"start"});
  savePretest();
}

document.addEventListener("DOMContentLoaded",()=>{
  renderQuestions();
  restore();
  updateProgress();
  document.getElementById("test-date").value ||= new Date().toISOString().slice(0,10);
});
