	let today = new Date()
	//let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let months = {
		'0':'January',
		'1':'February',
		'2':'March',
		'3':'April',
		'4':'May',
		'5':'June',
		'6':'July',
		'7':'August',
		'8':'September',
		'9':'October',
		'10':'November',
		'11':'December'
	}
	alert(months.index('January'))
	let currentMonth = today.getMonth()+1
	let currentYear = today.getFullYear()
	let departingdate
	let returningdate
	let departing = 0
	let returning = 0

function onPageLoad() {
	document.getElementById('yeartable').style.display='none'
	document.getElementById('monthtable').style.display='none'
	let year = document.getElementById('idyear')
	let month = document.getElementById('idmonth')

	showCalendar(currentMonth, currentYear)
}
function showPopup() {
	var popup = document.getElementById('demo')
  	popup.classList.toggle('show')
}
function clearPopup() {
	//Yet to be decided
}
function computeCalendar(month, year)//Both are numbers, month as [0-12], year as a full year [2020]
{
	checkIfAlreadyExists();
	document.getElementById('yeartable').style.display='none'
	document.getElementById('monthtable').style.display='none'
	document.getElementById('calendar').style.display='table'
	let firstDay = (new Date(year, month)).getDay()
    let daysInMonth = 32 - new Date(year, month, 32).getDate()

    let tbl = document.getElementById('calendar-body') // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = ''

    // filing data about month and in the page via DOM.
    idyear.innerHTML = year
    idmonth.innerHTML= month

    // creating all cells
    let date = 1
    //var incrementid = 1
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement('tr')
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td')
                let cellText = document.createTextNode('')
                //$(cell).attr('id',incrementid++)
                //incrementid++
                cell.appendChild(cellText)
                row.appendChild(cell)
            }
            else if (date > daysInMonth) {
                break
            }

            else {
                let cell = document.createElement('td')
                let cellText = document.createTextNode(date)
                //$(cell).attr('id',incrementid++)
                //incrementid++
                cell.appendChild(cellText)
                row.appendChild(cell)
                date++
                if (date>=departing && date<=returning){
                    //alert('date == date')
                    cell.setAttribute('style','background-color: blue')
                    cell.addEventListener('mouseover',function(){})

                }
            }


        }

        tbl.appendChild(row) // appending each row into calendar body.
    }
}
function checkIfAlreadyExists() {
	if (document.getElementById('calendar').style.display=='table'){
	document.getElementById('calendar').style.display='none'
	let tbl = document.getElementById('calendar-body')
	tbl.innerHTML=''
	return false
	}
	else{
		return true
	}
}
function generateYears() {
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
    console.log(cellText);
    row.appendChild(cell);

    syear++;
    }
     tbl.appendChild(row);
   } 
    if (tbl != null) {
	    for (var i = 0; i < tbl.rows.length; i++) {
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
function changeToMonths() {
	document.getElementById("calendar").style.display='none'
    document.getElementById("monthtable").style.display='table'
    generateMonths();
}
function generateMonths() {
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
function save() //in html it's for now as onclicking
{
    var x = document.getElementById("name").value;
    departingdate = document.getElementById("departingdate").value;
    returningdate = document.getElementById("returningdate").value;
    departing = Number(moment(departingdate).format('DD'));
    returning = Number(moment(returningdate).format('DD'));
    var destinationlist=document.getElementById("travel");
   var destination=destinationlist.options[destinationlist.selectedIndex].text;
    var txt="";
    showCalendar(currentMonth,currentYear)
}
function nextMonth() {
	let idyear=Number(document.getElementById("idyear").innerHTML);
    let idmonth=Number(document.getElementById("idmonth").innerHTML);
    if (idmonth===12){
    	idyear++;
    	idmonth=1;
    }
    // idyear = (idmonth === 11) ? idyear + 1 : idyear;
    // idmonth = (idmonth) % 12;

    alert(idmonth);
    showCalendar(idmonth, idyear);
}
function prevMonth() {
	currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
function changeToYear() {
	document.getElementById("calendar").style.display='none'
    document.getElementById("year-body").innerHTML = ""
    document.getElementById("yeartable").style.display='table'
    generateYears();
}