$(async function () {

    let response = await fetch("/api/events");
    if (response.ok) {
        let data = await response.json();
        data.forEach(function (event) {
            $(".events").append(`
            <article>
                <h2>${event.name}</h2>
                <div>
                    ${event.description}<br>
                    Start: ${event.start.date} ${event.start.time}<br>
                    End: ${event.end.date} ${event.end.time}<br>
                    Organizer: ${event.organizer.name} from ${event.organizer.company}<br>
                </div><br>
                <a href="/editevent.html?id=${event._id}">Edit</a>
            </article>  
            `);
        });
    } else {
        let err = await response.json();
        console.log(err.message);
    }


    $("#searchForm").on("submit",searchEvent);
})

async function searchEvent(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let eventEntries = Object.fromEntries(data.entries());
    let response = await fetch("/api/events/search", {
        method: "post",
        body: JSON.stringify(eventEntries),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        let data = await response.json();
        $(".events").empty();
        if(data.length>0) {
            data.forEach(function (event) {
                $(".events").append(`
                <article>
                    <h2>${event.name}</h2>
                    <div>
                        ${event.description}<br>
                        Start: ${event.start.date} ${event.start.time}<br>
                        End: ${event.end.date} ${event.end.time}<br>
                        Organizer: ${event.organizer.name} from ${event.organizer.company}<br>
                    </div><br>
                    <a href="/editevent.html?id=${event._id}">Edit</a>
                </article>  
                `);
            });
        } else {
            $(".events").append("<p>No search results</p>");
        }
    } else {
        let err = await response.json();
        console.log(err.message);
    }
}