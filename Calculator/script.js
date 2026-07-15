// ==========================
// SELECT ELEMENTS
// ==========================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

const historyBtn = document.getElementById("history-btn");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");

const themeBtn = document.getElementById("theme-btn");

let expression = "";


// ==========================
// LOAD HISTORY
// ==========================

let history = JSON.parse(localStorage.getItem("history")) || [];

function renderHistory(){

    historyList.innerHTML = "";

    history.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        historyList.prepend(li);

    });

}

renderHistory();


// ==========================
// BUTTON CLICK
// ==========================

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const value=button.textContent;

        if(value==="AC"){

            expression="";
            display.value="";

            return;

        }

        if(value==="DEL"){

            expression=expression.slice(0,-1);

            display.value=expression;

            return;

        }

        if(value==="="){

            if(expression==="") return;

            try{

                let exp=expression.replace(/%/g,"/100");

                const result=eval(exp);

                history.push(`${expression} = ${result}`);

                localStorage.setItem("history",JSON.stringify(history));

                renderHistory();

                display.value=result;

                expression=result.toString();

            }catch{

                display.value="Error";

                expression="";

            }

            return;

        }

        expression+=value;

        display.value=expression;

    });

});


// ==========================
// THEME
// ==========================

if(localStorage.getItem("theme")==="light"){

    document.body.classList.add("light");

    themeBtn.textContent="🌙";

}else{

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeBtn.textContent="🌙";

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.textContent="☀️";

    }

});


// ==========================
// HISTORY TOGGLE
// ==========================

historyBtn.addEventListener("click",()=>{

    if(historyPanel.style.display==="block"){

        historyPanel.style.display="none";

    }else{

        historyPanel.style.display="block";

    }

});


// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener("keydown",(e)=>{

    const key=e.key;

    if((key>="0" && key<="9") ||
        ["+","-","*","/",".","%"].includes(key)){

        expression+=key;

        display.value=expression;

    }

    if(key==="Backspace"){

        expression=expression.slice(0,-1);

        display.value=expression;

    }

    if(key==="Escape"){

        expression="";

        display.value="";

    }

    if(key==="Enter"){

        e.preventDefault();

        if(expression==="") return;

        try{

            let exp=expression.replace(/%/g,"/100");

            const result=eval(exp);

            history.push(`${expression} = ${result}`);

            localStorage.setItem("history",JSON.stringify(history));

            renderHistory();

            display.value=result;

            expression=result.toString();

        }catch{

            display.value="Error";

            expression="";

        }

    }

});