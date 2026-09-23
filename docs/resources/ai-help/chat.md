# 🤖 MKI Computational Assistant


## AI Help Chat


<div class="chat-container">


<div class="chat-header">

🤖 MKI Computational Assistant

<span>
Materials Science Support
</span>

</div>
<div class="assistant-selector">


<p>
Choose assistant:
</p>


<button onclick="selectAssistant('qe')">
⚛ Quantum ESPRESSO
</button>


<button onclick="selectAssistant('linux')">
💻 Linux Command
</button>


<button onclick="selectAssistant('hpc')">
💻 HPC Support
</button>


<button onclick="selectAssistant('research')">
🧪 Research Case
</button>


</div>


<div id="chat-box">


<div class="bot-message">

<div class="avatar">
🤖
</div>


<div class="message-content">

Hello! 👋

<br><br>

I am ready to help you with:

<br>
• Linux commands
<br>
• Quantum ESPRESSO workflow
<br>
• Simulation troubleshooting
<br>
• HPC environment

</div>

</div>

<div class="suggestions">


<p>
Try asking:
</p>


<button onclick="quickAsk('How to run SCF calculation?')">
How to run SCF calculation?
</button>


<button onclick="quickAsk('Why does QE convergence fail?')">
Why does QE convergence fail?
</button>


<button onclick="quickAsk('How to check HPC job?')">
How to check HPC job?
</button>


<button onclick="quickAsk('Linux command for file search?')">
Linux command for file search?
</button>


</div>
</div>

<div class="file-upload">


<p>
Upload simulation file:
</p>


<input 
type="file"
id="file-input"
accept=".in,.out,.err,.txt"
onchange="previewFile()"
>
<div id="file-status">

</div>

<button onclick="analyzeFile()">
Analyze File
</button>


<p class="file-info">

Supported files:

<br>

✓ Quantum ESPRESSO input (.in)

<br>

✓ Output file (.out)

<br>

✓ Error log (.err)

<br>

✓ Text log (.txt)

</p>


</div>
<div class="suggestions">


<p>
Try asking:
</p>


<button onclick="quickAsk('How to run SCF calculation?')">
⚛ How to run SCF calculation?
</button>


<button onclick="quickAsk('Why SCF convergence fails?')">
⚠ Why SCF convergence fails?
</button>


<button onclick="quickAsk('Linux command for files')">
💻 Linux command for files
</button>


<button onclick="quickAsk('How to check HPC job?')">
🚀 Check HPC job
</button>


</div>
<div class="chat-input">


<input 
id="user-input"
placeholder="Ask your computational problem..."
onkeypress="handleEnter(event)"
>


<button onclick="sendMessage()">
Send
</button>


</div>


</div>
