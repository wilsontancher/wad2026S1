$(function(){
    $("#addEventForm").on("submit",addEvent);
})

async function addEvent(e){
    e.preventDefault();
    let data = new FormData(e.target);
    let eventEntries = Object.fromEntries(data.entries());
    let response = await fetch("/api/events?token="+sessionStorage.token, {
        method: "post",
        body: JSON.stringify(eventEntries),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        let data = await response.json();
        $("#statusMessage").text(data.message);
    } else {
        let err = await response.json();
        //log actual message for debugging purpose but display a generic one to the users
        console.log(err.message);
        $("#statusMessage").text("Error trying to add a new event. Please ensure that event name is unique.");
    }
}