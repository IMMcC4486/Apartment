// Start up with showing everything
showApts ();
let TB = "<table style=\"font-size: 24px;  text-align: center; border: groove;\"><tbody>" +
"<tr>"+
"<th style=\"width: 100px\">Change Rank</th>" +
"<th style=\"width: 200px\">Apartment Name</th>" +
"<th style=\"width: 500px\">Address </th>" +
"<th style=\"width: 150px\">Phone Number </th>" +
"<th style=\"width: 100px\">Contract Length</th>" +
"<th style=\"width: 100px\">Date Available</th>" +
"<th style=\"width: 100px\">Rent Amount</th>" +
"<th style=\"width: 100px\">Utilities Cost</th>" +
"<th style=\"width: 100px\">Up Front Cost</th>" +
"<th style=\"width: 100px\">Total Monthly Cost</th>"+
"<th style=\"width: 350px\">Notes</th>"+
"</tr>"
            + "</tbody></table>";
document.getElementById("tablebody").innerHTML = TB;


/////////////// ADD Apartment ////////////////////
function addVerify(){
    let AN = document.getElementById("AN").value;
    let Address = document.getElementById("Address").value;
    let PN = document.getElementById("PN").value;
    let CL = document.getElementById("CL").value;
    let DA = document.getElementById("DA").value;
    let RA = document.getElementById("RA").value;
    let UC = document.getElementById("UC").value;
    let UFC = document.getElementById("UFC").value;
    let NOTES = document.getElementById("NOTES").value;
    let sendText = "AN=" + AN + "&Address=" + Address + "&PN=" + PN + "&CLength=" + CL + "&DA=" + DA + "&RA=" + RA + "&UC=" + UC + "&UFC=" + UFC + "&NOTES=" + NOTES;
    let checkText = "AN=" + AN;
  submitOK = "true";
  errormessage = "";

	if (AN.length < 1) {
		errormessage += "Enter an apartment name\n";
		submitOK = "false";
    }
    if (AN.length > 50) {
      errormessage += "Apartment name must be less than 50 characters\n";
		submitOK = "false";
  }

	if (Address.length < 1) {
		errormessage += "Enter an address\n";
		submitOK = "false";
    }
    if (Address.length > 50) {
		errormessage += "Address must be less than 50 characters\n";
		submitOK = "false";
    }
    
    if (PN.length < 1) {
		errormessage += "Enter a Phone Number\n";
		submitOK = "false";
    }
    if (PN.length > 50) {
		errormessage += "Phone Number must be less than 50 characters\n";
		submitOK = "false";
    }
    
    if (CL.length < 1) {
		errormessage += "Enter a Contract Length\n";
		submitOK = "false";
    }
    if (CL.length > 50) {
		errormessage += "Contract Length must be less than 50 characters\n";
		submitOK = "false";
    }
    
    if (DA.length < 1) {
		errormessage += "Enter a Date Available\n";
		submitOK = "false";
    }
    if (DA.length > 50) {
		errormessage += "Date Available must be less than 50 charcters\n";
		submitOK = "false";
    }
    
    if (RA.length < 1) {
		errormessage += "Enter a Rent Amount\n";
		submitOK = "false";
	}

    if (UC.length < 1) {
		errormessage += "Enter an Utility Cost\n";
		submitOK = "false";
    }

    if (UFC.length < 1) {
		errormessage += "Enter the Up Front Cost\n";
		submitOK = "false\n";
	}
    
    if (NOTES.length < 1) {
		errormessage += "Enter Notes\n";
		submitOK = "false";
    }
    if (NOTES.length > 200) {
		errormessage += "Notes must be less than 200 characters... current length is : " + NOTES.length;
		submitOK = "false";
	}
    
	if (submitOK == "false") {
    alert(errormessage)
		return false;
  }
  
	guardup();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(this.responseText == "Exists"){
            alert("This Apartment already exists")
          } else {
            addApt(sendText);
            alert("Added an apartment")
            showApts();
          }
			      guarddown();
        }
    };
    xhttp.open("post", "/Apartment/checkApartment.do", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(checkText);	
}
//////////////////// Actual Adder ///////////////////////
function addApt (sendText){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
  }
  xhttp.open("post", "/Apartment/addApartment.do", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(sendText);	
}
//////////////////////////////////////////////////////////////////

////////////////////// Show all apartments ///////////////////////////
function showApts (){
    let response = "";
	guardup();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = this.responseText;
            doStuff(response);
			guarddown();
        }
    };
    xhttp.open("post", "/Apartment/getApartments.do", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();	
}
function doStuff(response){
    // Process response to a table
    let apartments = JSON.parse(response);
	if (apartments.apartmentList !== "empty") {

        let aptHeader = "<table style=\"font-size: 24px;  text-align: center; border: groove;\"><tbody>"; 

    let aptHeads = 
    "<tr style=\"border: 10px; border: groove;\">"+
    "<th style=\"width: 100px\">Change Rank</th>" +
    "<th style=\"width: 200px\">Apartment Name</th>" +
    "<th style=\"width: 500px\">Address </th>" +
    "<th style=\"width: 150px\">Phone Number </th>" +
    "<th style=\"width: 100px\">Contract Length</th>" +
    "<th style=\"width: 100px\">Date Available</th>" +
    "<th style=\"width: 100px\">Rent Amount</th>" +
    "<th style=\"width: 100px\">Utilities Cost</th>" +
    "<th style=\"width: 100px\">Up Front Cost</th>" +
    "<th style=\"width: 100px\">Total Monthly Cost</th>"+
    "<th style=\"width: 350px\">Notes</th>"+
    "</tr>";
    ///////////////////////
    let aptList = aptHeader;
    let aptRow = "";
    let aptFooter = "";
    let Sapts = aptHeader + "<tr style=\"border: 10px; border: groove;\">SuperStar</tr>" + aptHeads;
    let Gapts = aptHeader + "<tr>Good</tr>" + aptHeads;
    let Oapts = aptHeader + "<tr>Ok</tr>" + aptHeads;
    let Papts = aptHeader + "<tr>Poor</tr>" + aptHeads;
    ///////////////////////

    let i = 0;
    for (i = 0; i < apartments.apartmentList.length; i++) {
      aptRow = "<tr>";
      if(apartments.apartmentList[i].QC == 1) {
        aptRow += "<td style=\"width: 100px;\" >" + 
        "<button id=\"DOWN" + i + "\" onclick=\"altRank(" + i + ",1)\" style=\"background-color: green; width: 90px; height: 30px; color: yellow;\">Down Rank</button>" + 
        "</td>"
      } else if (apartments.apartmentList[i].QC == 4) {
        aptRow += "<td style=\"width: 100px\" >" + 
        "<button id=\"UP" + i + "\" onclick=\"altRank(" + i + ",-1)\" style=\"background-color: yellow; width: 90px; height: 30px; color: green;\">Up Rank</button>" + 
        "</td>"
      } else if (apartments.apartmentList[i].QC == 3) {
        aptRow += "<td style=\"width: 100px\" >" + 
        "<button id=\"UP" + i + "\" onclick=\"altRank(" + i + ",-1)\" style=\"background-color: green; width: 90px; height: 30px; color: blue;\">Up Rank</button>" + 
        "<button id=\"DOWN" + i + "\" onclick=\"altRank(" + i + ",1)\" style=\"background-color: red; width: 90px; height: 30px; color: blue;\">Down Rank</button>" + 
        "</td>"
      } else if (apartments.apartmentList[i].QC == 2) {
        aptRow += "<td style=\"width: 100px\" >" + 
        "<button id=\"UP" + i + "\" onclick=\"altRank(" + i + ",-1)\" style=\"background-color: blue; width: 90px; height: 30px; color: red;\">Up Rank</button>" + 
        "<button id=\"DOWN" + i + "\" onclick=\"altRank(" + i + ",1)\" style=\"background-color: yellow; width: 90px; height: 30px; color: red;\">Down Rank</button>" + 
        "</td>"
      }
      aptRow +=
              "<td style=\"width: 200px\" id=\"AptNum" + i + "\">" + apartments.apartmentList[i].AN + "</td>"
            + "<td style=\"width: 500px\">" + apartments.apartmentList[i].Address + "</td>"
            + "<td style=\"width: 150px\">" + apartments.apartmentList[i].PN + "</td>"
            + "<td style=\"width: 100px\">" + apartments.apartmentList[i].CLength + "</td>"
            + "<td style=\"width: 100px\">" + apartments.apartmentList[i].DA + "</td>"
            + "<td style=\"width: 100px\">$" + apartments.apartmentList[i].RA + "</td>"
            + "<td style=\"width: 100px\">$" + apartments.apartmentList[i].UC + "</td>"
            + "<td style=\"width: 100px\">$" + apartments.apartmentList[i].UFC + "</td>"
            + "<td style=\"width: 100px\">$" + apartments.apartmentList[i].TMC + "</td>"
            + "<td style=\"width: 350px\">" + apartments.apartmentList[i].NOTES + "</td>"
            + "</tr>";
            if(apartments.apartmentList[i].QC == 1) {Sapts += aptRow;}
            if(apartments.apartmentList[i].QC == 2) {Gapts += aptRow;}
            if(apartments.apartmentList[i].QC == 3) {Oapts += aptRow;}
            if(apartments.apartmentList[i].QC == 4) {Papts += aptRow;}
		}

    Sapts += "</tbody></table>";
    Gapts += "</tbody></table>";
    Oapts += "</tbody></table>";
    Papts += "</tbody></table>";

    document.getElementById("superstar").innerHTML = Sapts;
    document.getElementById("good").innerHTML = Gapts;
    document.getElementById("ok").innerHTML = Oapts;
    document.getElementById("poor").innerHTML = Papts;

	} else {
		let faketable = "<table id=\"pendingTable\" style=\"margin: 30;" +
				" margin-bottom: 100px; " +
				"padding: 10 20 10 20; " +
				"color: darkslateblue; " +
				"font-size: 24px;  " +
				"ext-align: left; " +
				"border: groove;" +
				" background-color: khaki;\"> <tbody><tr>" + 
				"<th style=\"width: 400px\">NO PENDING REQUESTS</th></tr>" +
				"</tbody></table>";
		document.getElementById("ok").innerHTML=faketable;
	}
}

////////////////////PROTECTION///////////////////////
function guardup(){
	document.getElementById("mrprotection").style.display = "block";
}
function guarddown(){
	document.getElementById("mrprotection").style.display = "none";
}

//////////// SHOW AND HIDE ADD/////////
function showAdd(){
  document.getElementById("showAddButton").style.display = "none";
  document.getElementById("hideAddButton").style.display = "block";
  document.getElementById("aptADD").style.display = "inline";
}
function hideAdd(){
  document.getElementById("showAddButton").style.display = "block";
  document.getElementById("hideAddButton").style.display = "none";
  document.getElementById("aptADD").style.display = "none";
}

//////////////////////////
function altRank(index, change){
  let AptName = document.getElementById("AptNum"+index).innerHTML;
  let sendText = "AptName=" + AptName + "&RC=" + change;
	guardup();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
      showApts ();
			guarddown();
		}
	};
	xhttp.open("post", "/Apartment/changeRank.do", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(sendText);
}


// Apartment Name
// Address 
// Phone Number 
// Contract Length
// Date Available
// Rent Amount
// Utilities Cost
// Up Front Cost
// Total Monthly Cost