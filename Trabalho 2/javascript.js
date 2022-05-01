const nslot = document.createElement('div');
nslot.setAttribute("id","nslot");
nslot.style.height="30px";
document.body.appendChild(nslot);

const num = document.createElement("input");
num.setAttribute('type', 'number');
num.style.width="85px";
num.value=1;
num.setAttribute('id',"n");
num.style.position = "fixed";   
document.getElementById("nslot").appendChild(num);

const butslot = document.createElement('div');
butslot.setAttribute("id","butslot");
butslot.style.height="30px";
document.body.appendChild(butslot);

const redc = document.createElement('div');
redc.classList.add("circle");
redc.setAttribute("id", "red-circle");
document.body.appendChild(redc);

const bluec = document.createElement('div');
bluec.classList.add("circle");
bluec.setAttribute("id", "blue-circle");
document.body.appendChild(bluec);

const yellowc = document.createElement('div');
yellowc.classList.add("circle");
yellowc.setAttribute("id", "yellow-circle");
document.body.appendChild(yellowc);

document.getElementById("red-circle").onclick = function () {
    document.getElementById("red-circle").style.display = "none";
};            


document.getElementById("yellow-circle").onclick = function () {
    document.getElementById("yellow-circle").style.display = "none";
};

document.getElementById("blue-circle").onclick = function () {
    document.getElementById("blue-circle").style.display = "none";
};

const s = document.createElement('style');
s.textContent = `.circle {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    float: left;
    margin-right: 50px;
}
#red-circle {
    background-color: red;
}
#blue-circle {
    background-color: blue;
}
#yellow-circle {
    background-color: yellow;
}`;
document.head.appendChild(s);      

var counter = 0;
const btn = document.createElement('button');
btn.innerHTML = "Create Circle";


btn.addEventListener("click", function () {
    var times = document.getElementById("n").value;
    for(var i = 0; i < times; i++){
        const newCircle = document.createElement('div');
        newCircle.classList.add("circle");
        newCircle.setAttribute("id", counter);
        newCircle.style.width = "130px";
        newCircle.style.height = "130px";
        newCircle.style.borderRadius = "50%";
        newCircle.style.cssFloat = "left";
        newCircle.style.marginRight = "50px";
        

        
        if(counter%3==0)
            newCircle.style.backgroundColor = "red";
        if(counter%3==1)
            newCircle.style.backgroundColor = "blue";
        if(counter%3==2)
            newCircle.style.backgroundColor = "yellow";
        
        newCircle.addEventListener("click", function () {
            newCircle.style.display="none";
        })
        counter=counter+1;
        document.body.appendChild(newCircle);
    }


});
btn.style.position = "fixed";        
document.getElementById("butslot").appendChild(btn);