console.log("MKI CHAT ASSISTANT READY");


function sendMessage(){


    const input = document.getElementById("user-input");

    const chatBox = document.getElementById("chat-box");


    const question = input.value.trim();


    if(question === ""){

        return;

    }



    // USER MESSAGE

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.innerHTML = `

    <div class="message-content">

    ${question}

    </div>

    `;


    chatBox.appendChild(userMessage);



    input.value = "";



    // AI RESPONSE


// show typing indicator

const typing = document.createElement("div");


typing.className = "bot-message typing";


typing.innerHTML = `

<div class="avatar">
🤖
</div>


<div class="message-content">

Thinking <span class="dots">● ● ●</span>

</div>

`;


chatBox.appendChild(typing);



chatBox.scrollTop = chatBox.scrollHeight;



setTimeout(function(){


typing.remove();



const answer = generateAnswer(question);



const botMessage = document.createElement("div");


botMessage.className = "bot-message";



botMessage.innerHTML = `

<div class="avatar">

🤖

</div>


<div class="message-content">

${answer}

</div>

`;



chatBox.appendChild(botMessage);



chatBox.scrollTop = chatBox.scrollHeight;



},1500);
}



function generateAnswer(question){


    let q = question.toLowerCase();



    if(
        q.includes("pw.x") ||
        q.includes("quantum") ||
        q.includes("scf")
    ){


        return `

        <b>⚛ Quantum ESPRESSO Assistant</b>

        <br><br>


        I detected a Quantum ESPRESSO question.


        <br><br>


        Check:

        <br>

        ✓ Input file (scf.in)

        <br>

        ✓ Pseudopotential file

        <br>

        ✓ SCF convergence


        <br><br>


        Useful command:

        <pre>
tail -50 scf.out
        </pre>


        `;


    }



    if(
        q.includes("linux") ||
        q.includes("command")
    ){


        return `

        <b>💻 Linux Command Assistant</b>

        <br><br>


        Useful commands:

        <pre>
pwd
ls
cd
grep
tail
        </pre>


        `;


    }



    if(
        q.includes("hpc") ||
        q.includes("job")
    ){


        return `

        <b>💻 HPC Assistant</b>

        <br><br>


        Check job status:

        <pre>
squeue
        </pre>


        Review output and error logs.


        `;


    }



    return `

    <b>🤖 MKI Computational Assistant</b>


    <br><br>


    I can help with:


    <br>

    • Linux commands

    <br>

    • Quantum ESPRESSO workflow

    <br>

    • HPC troubleshooting


    <br><br>


    Try asking:

    <br>

    "pw.x error"

    <br>

    "Linux command"

    <br>

    "HPC job"


    `;


}




function handleEnter(event){


    if(event.key === "Enter"){

        sendMessage();

    }


}
function quickAsk(text){

    document.getElementById("user-input").value = text;

    sendMessage();

}
