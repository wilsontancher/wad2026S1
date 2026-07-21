let id;
$(async function(){
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');

    let response = await fetch("/api/events/"+id);
    if(response.ok) {
        let data = await response.json();
        $("#name").val(data.name);
        $("#description").val(data.description);
        $("#startDate").val(data.start.date);
        $("#startTime").val(data.start.time);
        $("#endDate").val(data.end.date);
        $("#endTime").val(data.end.time);
    } else {
        let err = await response.json();
        alert(err.message);
        history.back();
    }

    $("#editEventForm").on("submit",editEvent);
    $("#deleteEventBtn").on("click",deleteEvent);
})

async function editEvent(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let eventEntries = Object.fromEntries(data.entries());
    let response = await fetch("/api/events/"+id+"?token="+sessionStorage.token, {
        method: "put",
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
        $("#statusMessage").text(err.message);
    }
}

async function deleteEvent() {
    let confirmed  = confirm("Are you sure you want to delete the event?");
    if(confirmed) {
        let response = await fetch("/api/events/"+id+"?token="+sessionStorage.token,{
            method:"delete"
        })
        if(response.ok) {
            alert("Event is deleted");
            location.href="/";
        } else {
            let err = await response.json();
            //log actual message for debugging purpose but display a generic one to the users
            console.log(err.message);
            $("#statusMessage").text(err.message);
        }
    }
}