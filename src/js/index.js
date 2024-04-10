import { EventComponent } from "./event-component.js";

const EVENTS_TEST_DATA = [
  {
    start: 1,
    end: 2,
    title: "Event 1",
  },
  {
    start: 2,
    end: 3,
    title: "Event 2",
  },
  {
    start: 3,
    end: 4,
    title: "Event 3",
  },
  {
    start: 8,
    end: 11,
    title: "Long event",
  },
  {
    start: 10,
    end: 12,
    title: "overlapping event",
  },
  {
    start: 11.5,
    end: 13,
    title: "overlapping event 2",
  },
  {
    start: 16,
    end: 16.5,
    title: "Short event",
  },
];

export default function main() {
  // NOTE: for PoC it's hardcoded to Thursday
  const thursday = document.getElementById("cal-thursday");
  thursday.append(
    ...EVENTS_TEST_DATA.map((event) => {
      const eventComponent = new EventComponent();
      eventComponent.setAttribute("start", event.start);
      eventComponent.setAttribute("end", event.end);
      eventComponent.setAttribute("title", event.title);
      eventComponent.setAttribute("width", "100%");
      return eventComponent;
    })
  );
}
