

document.getElementById("yeartable").style.display='none'
document.getElementById("monthtable").style.display='none'
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let flag = 0;
let departing;
let returning;
let year = document.getElementById("idyear");
let month = document.getElementById("idmonth");
//user details
	let username;
	let email;
	let gender;
	let modesoftransport = [];
	let departingdate;
	let returningdate;
	let no_of_adults;
	let no_of_children;
	let destination;

//popup text
	let welcome;
	let popuptxt;
	let popupflag;

showCalendar(currentMonth, currentYear);

//on click of year 2020
function yearchange()
{
    document.getElementById("calendar").style.display='none'
    document.getElementById("monthtable").style.display='none'
    document.getElementById("yeartable").style.display='table'
    years();
}

function years()
{
	document.getElementById("year-body").innerHTML = "" // Clearing the previous table
   let tbl = document.getElementById("year-body");
   let syear = 1990;
   for(let i=0;i<6;i++)
   {
    	let row = document.createElement("tr");
    	for(let j=0;j<7;j++)
    	{
    		let cell = document.createElement("td");
		    let cellText = document.createTextNode(syear);
		    cell.appendChild(cellText);
		    //console.log(cellText);
		    row.appendChild(cell);

		    syear++;
    	}
     	tbl.appendChild(row);
   	} 
    if (tbl != null) 
    {
	    for (var i = 0; i < tbl.rows.length; i++)
	    {
	        for (var j = 0; j < tbl.rows[i].cells.length; j++)
	        	tbl.rows[i].cells[j].onclick = function () {
	            	var x = this;
	            	document.getElementById('idyear').innerHTML=x.innerHTML;
	            	tbl.innerHTML="";
	            	showCalendar(0,this.innerHTML);
	        }
	    }
	}
}



//on click of the month
function monthchange()
{
    document.getElementById("calendar").style.display='none'
    document.getElementById("yeartable").style.display = 'none'
    document.getElementById("monthtable").style.display='table'
    monthss();
}
function nextmonth()
{
    console.log("in nextmonth before executing",currentMonth,currentYear);
    // if (currentMonth===12){
    // 	currentYear++;
    // 	currentMonth=1;
    // }
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    // idyear = (idmonth === 11) ? idyear + 1 : idyear;
    // idmonth = (idmonth) % 12;
    console.log("in nextmonth"+currentMonth)
    showCalendar(currentMonth, currentYear);
}

function previousmonth()
{
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
// function previous() {
	
// }

function onclicking()
{
	alert("onclicking");
	flag = 1;
	var temp = document.getElementsByTagName('input');
    username = document.getElementById("name").value;
    email = document.getElementById('email').value;
    for(var i=0; i<temp.length; i++) 
    {
 		if(temp[i].type =='checkbox' && temp[i].checked == true){ modesoftransport.push(temp[i].value);}
	}
    departingdate = document.getElementById("departingdate").value;
    returningdate = document.getElementById("returningdate").value;

    departingday = Number(moment(departingdate).format('DD'))+1;
    departingmonth = Number(moment(departingdate).format('MM'))-1;
    departingyear = Number(moment(departingdate).format('YYYY'));

    returningday = Number(moment(returningdate).format('DD'))+1;
    returningmonth = Number(moment(returningdate).format('MM'))-1;
    returningyear = Number(moment(returningdate).format('YYYY'));
    
    destination = document.getElementById("travel").value;
    no_of_adults = document.getElementById("adults").value;
    no_of_children = document.getElementById("children").value;
    
    welcome = "Welcome "+username;
    popuptxt=returningdate+"<br>"+destination;
    document.getElementById("popuptext").innerHTML=popuptxt;
    document.getElementById("Welcome").innerHTML=welcome;
    gender = $("input[name=check]:checked").val();
    document.getElementById('sendemail').href = "mailto:"+email+"?Subject=Event Planner&Body=Planned a vacation from"+departingdate+" - "+departingmonth+" - "+departingyear+" to "+returningday+" - "+returningmonth+" - "+returningyear+". Visiting"+destination;
    //console.log(modesoftransport,username,gender,departingdate,returningdate,destination,no_of_children,no_of_adults);
    currentMonth = departingmonth;
    console.log("on click"+departingmonth);
    showCalendar(departingmonth,departingyear);
}


function showCalendar(month, year) 
{
	if (document.getElementById("calendar").style.display=='table')
	{
		document.getElementById("calendar").style.display='none'
		let tbl = document.getElementById('calendar-body');
		tbl.innerHTML="";
	}
	document.getElementById("yeartable").style.display='none'
	document.getElementById("monthtable").style.display='none'
	document.getElementById("calendar").style.display='table'


    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    idyear.innerHTML = year;
    idmonth.innerHTML= months[month];
    console.log("in showCalendar"+month);
    // creating all cells
    let date = 1;
    //var incrementid = 1;
    for (let i = 0; i < 6; i++) 
    {
        // creates a table row
        let row = document.createElement("tr");
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) 
        {
            if (i === 0 && j < firstDay) 
            {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                //$(cell).attr("id",incrementid++);
                //incrementid++;
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) 
            {
                break;
            }

            else 
            {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                //$(cell).attr("id",incrementid++);
                //incrementid++;
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;

                if(flag==1) {
                    if (date==departingday && month==departingmonth && year==departingyear){
                    	cell.setAttribute('style','background-color: #0066ff;');
                    	setcell(cell);
                    }
                    if (date==returningday && month==returningmonth && year==returningyear){
                    	cell.setAttribute('style','background-color: #43d83f;');
                    	setcell(cell);
                    }
                }          
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}
function setcell(cell) {
	cell.addEventListener('mouseover',function(){
		Popupflag = 1;
                    	//console.log("mouseover");
                    	let cellbound = cell.getBoundingClientRect();
                    	let popdiv = document.getElementById('popup');
                    	popdiv.style.left = (cellbound.left)+"px";
                    	popdiv.style.top = (cellbound.top)+"px";
                    	popdiv.style.display = "block";
                    	let popover = document.createElement('p');
                    	//popdiv.appendChild(popheader);
                    	popdiv.appendChild(popover);
                    	//console.log("created");
                    //});
    // cell.addEventListener('mouseout',function(){
    // 	if (popupflag==1){
    //                 	document.getElementById('popup').style.display = "none";
    //                 	//document.getElementById('popup').innerHTML = "";
    //                 	console.log("mouseout");
    //                 	}
                    // });
//     cell.addEventListener('keydown', (e) => {
// 		  if (e.code === "Escape"){
// 		  	document.getElementById('popup').style.display = "none";
// 		    document.getElementById('popup').innerHTML = "";
 //}
});
}
function monthss()
{
	document.getElementById("month-body").innerHTML = "";
    let tbl = document.getElementById("month-body");
    c=0
    for(let i=0;i<3;i++)
    {
        let row = document.createElement("tr");
        for (let j=0;j<4;j++)
        {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(months[c]);
            cell.appendChild(cellText);
            row.appendChild(cell);
            c++;
        }
        tbl.appendChild(row);
    }
    if (tbl != null) {
    for (var i = 0; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++)
        tbl.rows[i].cells[j].onclick = function () {
            
            tbl.innerHTML="";
            var x = this.innerHTML;
            for(let z=0;z<12;z++)
            {
                if(months[z]==x)
                {
                    document.getElementById('idmonth').innerHTML=z+1;
                    idyear=document.getElementById("idyear");
                    showCalendar(z,idyear.innerHTML);
                }
            }
        }
    }
}
}
function specificFunction() {
	if (Popupflag==1){
		document.getElementById('popup').style.display = "none";
	}
}



