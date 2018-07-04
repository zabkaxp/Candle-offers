var base = {
    slideStart: 0,
    names: [largeJars, spheres, votives],
    values: {
        largeJars: [],
        spheres: [],
        votives: []
    },
    sums:{
        largeJars: [],
        spheres: [],
        votives: []
    },
    totalSum: 0,
    prices:{
        largeJars: [20],
        spheres: [10, 5],
        votives: [4, 0]
    },
      finalPrices:{
        largeJars: [0],
        spheres: [0],
        votives: [0]
      },
    totalPrices: 0
}

function countTotal(){
    base.totalPrices=0;
    for(i=0; i<base.names.length; i++){
         var thisPrice = base.finalPrices[base.names[i].id][0];
         console.log(thisPrice);
         console.log(base.finalPrices[base.names[i].id][0]);
        base.totalPrices = base.totalPrices+thisPrice;
        
    document.querySelector("#val").textContent=`£ ${base.totalPrices}`;
    
}}

function checkingPrices(name){
    var price, normalPrice, discprice;

    var lgQty = base.sums.largeJars[0];
    var sphQty = base.sums.spheres[0];
    var votQty = base.sums.votives[0];
    
   if(name === "largeJars"){
       base.finalPrices.largeJars[0] = 0;
       price = base.prices.largeJars[0];
        document.getElementById(`total${name}`).textContent =`${lgQty} x £${price}`;
       base.finalPrices.largeJars[0] = lgQty *price;
       console.log(base.finalPrices.largeJars);
       
   }
    if(name === "spheres"){
       
        if(sphQty<=lgQty){
            base.finalPrices.spheres[0] = 0;
            price = base.prices.spheres[1];
            document.getElementById(`total${name}`).textContent =`${sphQty} x £${price}`;
            base.finalPrices.spheres[0] = price*sphQty;
        }
        else{
            base.finalPrices.spheres[0] = 0
            normalPrItems = sphQty - lgQty;
            discPrItems = sphQty - normalPrItems;
            console.log(discPrItems);
            normalPr = base.prices.spheres[0];
            discPr = base.prices.spheres[1];
            document.getElementById(`total${name}`).textContent =`${discPrItems} x £${discPr} and ${normalPrItems} x £${normalPr}`; 
            base.finalPrices.spheres[0] = (discPrItems*discPr)+(normalPrItems*normalPr);
        }
        
    }
    
    if(name === "votives"){
        if(votQty<=(2*lgQty)){
            base.finalPrices.votives[0] = 0;
            price = base.prices.votives[1];
            document.getElementById(`total${name}`).textContent =`${votQty} x £${0}`;
            base.finalPrices.votives[0] = price * votQty;
        }
        else{
            base.finalPrices.votives[0] = 0;
            normalPrItems = votQty - (2*lgQty);
            discPrItems = votQty - normalPrItems;
            
            normalPr = base.prices.votives[0];
            discPr = base.prices.votives[1];
            document.getElementById(`total${name}`).textContent =`${discPrItems} x £${discPr} and ${normalPrItems} x £${normalPr}`;
            base.finalPrices.votives[0] = (discPrItems*discPr)+(normalPrItems*normalPr);
        }
        
    }
    countTotal();
}

function setElements(){
    
    var prices = document.querySelectorAll(".howMuch");
    prices = [...prices];
    
    for(i=0; i <prices.length; i++){
        
        var id = prices[i];
        var bttns = document.createElement("div");
        bttns.setAttribute("class", "bttns");
        bttns.innerHTML = `<input id="inp${i}" type=number min="0" placeholder="Qty"><button type="submit" onclick="count(${i})">Add</button>`
        id.insertAdjacentElement("afterend", bttns);        
    }
}

function count(id){
  
    var input = document.getElementById(`inp${id}`);
    var parent = input.parentNode.parentNode.parentNode;
    var liElements = parent.getElementsByTagName("li");
    liElements = [...liElements];
    var name = parent.id;
    base.values[name].length = 0;
    liElements.forEach(function(el){ 
        
        var inp = el.getElementsByTagName("input");
        var value = parseInt(inp[0].value);
        if (value>0){
        base.values[name].push(value);
        
    }});
    
    var sum = countSum(name);
    updateSection(parent, sum, name);
}

function countSum(name){
    var sum = 0;

   base.values[name].forEach(function(el){

        sum = sum + el;
    })
        base.sums[name].length=0;
        base.sums[name].push(sum);
        updateBasket(name);
        return sum;
};


function updateSection(parent, sum, name){
       
    if(name ==="largeJars"){
        name = "large jars";
    }
    
    if(sum === 1){
        
       if(name==="large jars") name = "large jar";
        if(name==="spheres") name = "sphere";       
         if(name==="votives") name = "votive";   
       }
   
    var last = parent.querySelector('section');
    last.innerHTML = `Total: ${sum} ${name}`;
    
    var lgQty = base.sums.largeJars;
    var info = document.querySelectorAll(".dealInfo");
    var votQty = lgQty*2;

    if(lgQty>0){
        if(lgQty==1){
            info[0].textContent=`You are alegible to get ${lgQty} sphere for £5!`;
        }
        else{
            info[0].textContent=`You are alegible to get ${lgQty} spheres for £5!`;
        }
    
        info[1].textContent=`You are alegible to get ${votQty} votives for free!`; 
    }
}

function updateBasket(name){
    var indVal, total;
    var element = document.getElementById(`total${name}`);
    var val = base.sums[name];
    element.textContent = val;
    var sum = 0;
    
    base.sums[name].forEach(function(el){

        sum = sum + el;
    })
        base.sums[name].length=0;
        base.sums[name].push(sum);
        
        total = 0;
    for(i=0; i<base.names.length; i++){
        
        indVal = base.sums[base.names[i].id][0];
   
            if(indVal>0){
        total = total + indVal; 
        document.querySelector("#val").textContent=total;
            }
    }
    checkingPrices(name);
};
    

//Slider

function slide(){
    
	base.slideStart++; 
    if (base.slideStart > 3) base.slideStart = 1;
	var pic = "<img src=\'images/slide"+base.slideStart+".jpg\'/>";
	document.getElementById("slider").innerHTML = pic;
	setTimeout("slide(base.slideStart)", 6000);
}

function init(){
    slide();
    setElements();
    
}

init();
