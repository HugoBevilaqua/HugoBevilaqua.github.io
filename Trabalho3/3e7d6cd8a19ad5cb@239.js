function _1(md){return(
md`# Square Progression`
)}

function _desenho(htl){return(
htl.html`<svg width=800 height=600 style="border:1px solid gray">`
)}

function _ratio(Inputs,localStorage){return(
Inputs.range([0, 1], { label: "Ratio", value: ( (localStorage.getItem("storedratio"))==null ? 0.5 : localStorage.getItem("storedratio") ), step: 0.01 })
)}

function _n(Inputs,localStorage){return(
Inputs.range([0, 30], { label: "N", value: ( (localStorage.getItem("storedn"))==null ? 2 : localStorage.getItem("storedn") ), step: 1 })
)}

function _variation(Inputs,localStorage){return(
Inputs.radio([0, 1, 2, 3], { label: "Variation", value: ( (localStorage.getItem("storedvariation"))==null ? 0 : parseInt(localStorage.getItem("storedvariation")) ) })
)}

function _draw(desenho,n,ratio,variation,svg,localStorage)
{
  const [ width, height ] = [800,600];
  desenho.innerHTML=""; // Limpar o desenho

  function TransformCoord(x, y, ctm){
    var tx = x*ctm.a + y*ctm.c +ctm.e;
    var ty = x*ctm.b + y*ctm.d +ctm.f;
    return [tx,ty];
  }

  let ctm;
  let nextpos;
  let vertex;
  let side = width / 10;
  let color;
  let size;
  let trueratio;
  let lastsize;
  let pos;
  const colors = ["red", "yellow", "blue", "green"];
  
  for (let i = 0; i < n; i++) {
    vertex = [[width/2, height/2],[ width/2 + i*side,height/2],[width/2 + i*side,height/2 + i*side],[width/2,height/2 + i*side]];
    color = colors[i % colors.length];
    if(i>=1){
      if(ratio<=0.5)
        trueratio=ratio;
      else
        trueratio=1.0-ratio;
      size=lastsize/Math.cos(trueratio*Math.PI/2);
    }
    else{
      size=side;
    }

    if(variation==0)
      pos = vertex[0];
    if(variation==1)
      i>=1 ? pos=nextpos : pos=vertex[1];
    if(variation==2)
      i>=1 ? pos=nextpos : pos=vertex[2];
    if(variation==3)
      i>=1 ? pos=nextpos : pos=vertex[3];
    
    let sq = svg`<rect fill=${color} x=${pos[0]} y=${pos[1]} width=${size} height=${size} transform="rotate(${ratio*i*90},${pos[0]},${pos[1]})" opacity=0.7 />`;
    desenho.append(sq);
    lastsize=size;

    ctm=sq.getCTM();
    if(variation==1)
      nextpos=TransformCoord(pos[0]+size,pos[1],ctm);
    if(variation==2)
      nextpos=TransformCoord(pos[0]+size,pos[1]+size,ctm);
    if(variation==3)
      nextpos=TransformCoord(pos[0],pos[1]+size,ctm);
   }
  localStorage.setItem("storedratio", ratio);
  localStorage.setItem("storedn", n);
  localStorage.setItem("storedvariation", variation);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("desenho")).define("desenho", ["htl"], _desenho);
  main.variable(observer("viewof ratio")).define("viewof ratio", ["Inputs","localStorage"], _ratio);
  main.variable(observer("ratio")).define("ratio", ["Generators", "viewof ratio"], (G, _) => G.input(_));
  main.variable(observer("viewof n")).define("viewof n", ["Inputs","localStorage"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof variation")).define("viewof variation", ["Inputs","localStorage"], _variation);
  main.variable(observer("variation")).define("variation", ["Generators", "viewof variation"], (G, _) => G.input(_));
  main.variable(observer("draw")).define("draw", ["desenho","n","ratio","variation","svg","localStorage"], _draw);
  return main;
}
