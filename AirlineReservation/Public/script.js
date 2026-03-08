// FLIGHT DATA
let flights = [
    {id:"F101",from:"Jeddah (Saudi Arabia)",to:"Dubai (UAE)",seats:100},
    {id:"F102",from:"Lahore (Pakistan)",to:"London (UK)",seats:180},
    {id:"F103",from:"Islamabad (Pakistan)",to:"New York (USA)",seats:160},
    {id:"F104",from:"Paris (France)",to:"Tokyo (Japan)",seats:120},
    {id:"F105",from:"Sydney (Australia)",to:"Singapore",seats:105},
    {id:"F106",from:"Beijing (China)",to:"Toronto (Canada)",seats:160},
    {id:"F107",from:"Delhi (India)",to:"Bangkok (Thailand)",seats:200},
    {id:"F108",from:"Istanbul (Turkey)",to:"Berlin (Germany)",seats:140},
    {id:"F109",from:"Doha (Qatar)",to:"Kuala Lumpur (Malaysia)",seats:150},
    {id:"F110",from:"Jeddah (Saudi Arabia)",to:"Jakarta (Indonesia)",seats:170},
    {id:"F111",from:"Lahore (Pakistan)",to:"Jeddah (Saudi Arabia)",seats:150},
    {id:"F112",from:"Lahore (Pakistan)",to:"Islamabad (Pakistan)",seats:100}
];

// LOCAL STORAGE DATABASE
let passengers = JSON.parse(localStorage.getItem("passengers")) || [];

// SAVE DATA
function saveData(){
    localStorage.setItem("passengers",JSON.stringify(passengers));
}

// DASHBOARD NAV
function showSection(section){
    ["flights","booking","history","reports"].forEach(sec=>{
        document.getElementById(sec+"Section").style.display = (sec===section)?"block":"none";
    });
}

// DISPLAY FLIGHTS TABLE
function displayFlights(){
    let table = document.getElementById("flightTable");
    table.innerHTML = "<tr><th>ID</th><th>From → To</th><th>Seats</th></tr>";
    flights.forEach(f=>{
        let row = table.insertRow();
        row.insertCell(0).innerText=f.id;
        row.insertCell(1).innerText=f.from+" → "+f.to;
        row.insertCell(2).innerText=f.seats;
    });
}

// POPULATE DROPDOWNS
function populateDropdowns(){
    const fromSelect = document.getElementById("fromCity");
    const toSelect = document.getElementById("toCity");

    let fromCities = [...new Set(flights.map(f=>f.from))];
    let toCities = [...new Set(flights.map(f=>f.to))];

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    fromCities.forEach(city=>{
        let opt = document.createElement("option");
        opt.value = city; opt.innerText = city;
        fromSelect.appendChild(opt);
    });

    toCities.forEach(city=>{
        let opt = document.createElement("option");
        opt.value = city; opt.innerText = city;
        toSelect.appendChild(opt);
    });
}

// TOGGLE LOYALTY
document.getElementById("hasLoyaltyCard").addEventListener("change", function(){
    let tier = document.getElementById("loyaltyTier");
    tier.style.display = this.value==="yes"?"block":"none";
});

// BOOK FLIGHT
document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name=document.getElementById("passengerName").value;
    let id=document.getElementById("passengerId").value;
    let age=parseInt(document.getElementById("passengerAge").value);
    let from=document.getElementById("fromCity").value;
    let to=document.getElementById("toCity").value;
    let flightId=document.getElementById("flightId").value;
    let numTravelers=parseInt(document.getElementById("numTravelers").value);
    let hasCard=document.getElementById("hasLoyaltyCard").value;
    let tier=(hasCard==="yes")?document.getElementById("loyaltyTier").value:"None";

    let flight = flights.find(f=>f.id===flightId);
    if(!flight){alert("Flight not found"); return;}
    if(flight.from!==from||flight.to!==to){alert("From/To mismatch"); return;}
    if(flight.seats<numTravelers){alert("Not enough seats"); return;}

    flight.seats -= numTravelers;
    let passenger=passengers.find(p=>p.id===id);
    let bookingData={flightId,from,to,tier,time:new Date(),travelers:numTravelers};

    if(passenger){passenger.bookings.push(bookingData);}
    else{passengers.push({id,name,age,bookings:[bookingData]});}

    saveData();
    alert(`Flight booked successfully for ${numTravelers} traveler(s)!`);
    displayFlights();
    this.reset();
});

// SHOW HISTORY
function showHistory(){
    let id=document.getElementById("searchPassenger").value;
    let passenger=passengers.find(p=>p.id===id);
    let div=document.getElementById("history");

    if(!passenger){div.innerHTML="Passenger not found"; return;}

    div.innerHTML=`<h3>${passenger.name} (Age: ${passenger.age})</h3>
    <ul>${passenger.bookings.map(b=>`
        <li>
        ${b.flightId} | ${b.from} → ${b.to} | Tier: ${b.tier} | Travelers: ${b.travelers} | ${new Date(b.time).toLocaleString()}
        <button class="cancel" onclick="cancelBooking('${passenger.id}','${b.flightId}')">Cancel & Refund</button>
        </li>`).join('')}
    </ul>`;
}

// CANCEL BOOKING
function cancelBooking(passengerId, flightId){
    let passenger=passengers.find(p=>p.id===passengerId);
    if(!passenger) return;
    let index=passenger.bookings.findIndex(b=>b.flightId===flightId);
    if(index===-1) return;

    let booking=passenger.bookings[index];
    let flight=flights.find(f=>f.id===flightId);
    if(flight) flight.seats += booking.travelers;

    passenger.bookings.splice(index,1);
    saveData();
    alert("Booking cancelled & refund processed!");
    showHistory();
    displayFlights();
}

// REPORTS
function showReports(){
    let routes={}, hours={};
    passengers.forEach(p=>p.bookings.forEach(b=>{
        routes[`${b.from} → ${b.to}`]=(routes[`${b.from} → ${b.to}`]||0)+b.travelers;
        let h=new Date(b.time).getHours();
        hours[h]=(hours[h]||0)+b.travelers;
    }));

    let div=document.getElementById("reports");
    div.innerHTML=`<h3>Popular Routes</h3>${Object.entries(routes).map(([r,c])=>`${r}: ${c} travelers`).join("<br>")}
    <h3>Peak Hours</h3>${Object.entries(hours).map(([h,c])=>`${h}:00 - ${h}:59 → ${c} bookings`).join("<br>")}`;
}

// INIT
displayFlights();
populateDropdowns();
showSection('flights');