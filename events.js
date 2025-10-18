const icalUrl = "https://calendar.google.com/calendar/ical/96257ec8bd1322f029faaaf53ee41655baa68ca3e158c4f2ea52841758f2643e%40group.calendar.google.com/public/basic.ics";
const list = document.getElementById("event-list");

fetch(icalUrl)
  .then(res => res.text())
  .then(data => {
    const icalExpander = new ICAL.Expander({ ics: data, maxIterations: 100 });

    // Get events in the next 60 days
    const events = icalExpander.between(new Date(), new Date(Date.now() + 60*24*60*60*1000));
    const upcoming = events.events.sort((a,b) => a.startDate.toJSDate() - b.startDate.toJSDate());

    list.innerHTML = "";
    if (upcoming.length === 0) {
      list.innerHTML = '<li class="no-events">No upcoming events</li>';
      return;
    }

    // Show next 5 events
    upcoming.slice(0,5).forEach(event => {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.href = "https://calendar.google.com/calendar/u/0/r?cid=96257ec8bd1322f029faaaf53ee41655baa68ca3e158c4f2ea52841758f2643e@group.calendar.google.com";
      link.target = "_blank";
      link.textContent = event.summary || "Untitled event";

      const dateSpan = document.createElement("span");
      dateSpan.className = "event-date";
      dateSpan.textContent = event.startDate.toJSDate().toLocaleString("no-NO", { dateStyle: "medium", timeStyle: "short" });

      li.appendChild(link);
      li.appendChild(dateSpan);
      list.appendChild(li);
    });
  })
  .catch(err => {
    list.innerHTML = '<li class="no-events">Error loading events</li>';
    console.error(err);
  });
