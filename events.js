const calendarId = "96257ec8bd1322f029faaaf53ee41655baa68ca3e158c4f2ea52841758f2643e@group.calendar.google.com";
const apiKey = "AIzaSyABSyk955pcx2Wu2whj4g2nlBjSvf_86Gc";
const timeMin = new Date().toISOString(); // only future events

const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const events = data.items;
    const list = document.getElementById("event-list");

    events.forEach(event => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = event.htmlLink;
      link.textContent = `${event.summary} — ${new Date(event.start.dateTime || event.start.date).toLocaleString()}`;
      li.appendChild(link);
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Error loading events", err));
