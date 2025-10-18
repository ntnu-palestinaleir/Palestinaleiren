const calendarId = "96257ec8bd1322f029faaaf53ee41655baa68ca3e158c4f2ea52841758f2643e@group.calendar.google.com";
const apiKey = "AIzaSyABSyk955pcx2Wu2whj4g2nlBjSvf_86Gc";
const timeMin = new Date().toISOString();

const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("event-list");
    list.innerHTML = ""; // clear "Loading" message

    if (!data.items || data.items.length === 0) {
      list.innerHTML = '<li class="no-events">No upcoming events</li>';
      return;
    }

    data.items.forEach(event => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = event.htmlLink;
      link.target = "_blank";
      link.textContent = event.summary || "Untitled event";

      const dateSpan = document.createElement("span");
      dateSpan.className = "event-date";
      const eventDate = new Date(event.start.dateTime || event.start.date);
      dateSpan.textContent = eventDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

      li.appendChild(link);
      li.appendChild(dateSpan);
      list.appendChild(li);
    });
  })
  .catch(err => {
    const list = document.getElementById("event-list");
    list.innerHTML = '<li class="no-events">Error loading events</li>';
    console.error("Error fetching events:", err);
  });
