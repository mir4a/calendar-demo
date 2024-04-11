import { EventComponent } from "./event-component.js";

// key 1-2
// key 2-3
// key 3-4
// key 8-11
// key 10-12
// key 11.5-13
// key 16-16.5

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
  const grouppedEvents = getGroupsMap(EVENTS_TEST_DATA);
  const thursday = document.getElementById("cal-thursday");

  grouppedEvents.forEach((group) => {
    const { columns, events } = getGroupMetadata(group);
    const width = 100 / columns;

    thursday.append(
      ...events.map((event) => {
        const left = (event.col - 1) * width;
        const eventComponent = new EventComponent();
        eventComponent.setAttribute("start", event.start);
        eventComponent.setAttribute("end", event.end);
        eventComponent.setAttribute("title", event.title);
        eventComponent.setAttribute("width", width);
        eventComponent.setAttribute("left", left);
        return eventComponent;
      })
    );
  });
}

function getGroupMetadata(group) {
  const copy = [...group];
  const firstEvent = copy.shift();
  let start = firstEvent.start;
  let end = firstEvent.end;
  let gapStart = end;
  let gapEnd = end;
  let gapColumn = 1;
  let currentColumn = 1;
  let columns = 1;
  const result = [{ col: 1, ...firstEvent }];

  if (copy.length) {
    columns = 2;
  } else {
    return {
      columns,
      events: result,
    };
  }

  while (copy.length) {
    const next = copy.shift();

    // define current column position
    if (next.start >= gapEnd) {
      currentColumn = gapColumn;
    }

    if (next.start < gapStart) {
      columns++;
      currentColumn = columns;
    }

    // define gap column position
    // if next event ends after previous ends, then the gap is on previous
    if (next.end > end) {
      gapColumn = currentColumn - 1;
      // if next event ends on the same time as prev, then no gap
    } else if (next.end === end) {
      gapColumn = currentColumn;
      gapStart = next.end;
      gapEnd = next.end;
    } else {
      gapColumn = currentColumn;
    }

    result.push({ col: currentColumn, ...next });
    start = next.start;
    end = next.end;
  }

  return {
    columns,
    events: result,
  };
}

function toPrimitiveMapKey(start, end) {
  return `${start}-${end}`;
}

function getGroupsMap(events) {
  const sortedByStart = events.sort((a, b) => a.start - b.start);
  const firstEvent = sortedByStart.shift();
  let start = firstEvent.start;
  let end = firstEvent.end;
  const groups = new Map();
  groups.set(
    // key,
    toPrimitiveMapKey(start, end),
    // value
    [firstEvent]
  );

  for (const event of sortedByStart) {
    let currentGroup = groups.get(toPrimitiveMapKey(start, end));
    // check if event overlaps with current group
    if (event.start < end) {
      currentGroup.push(event);
      // if current event lasts longer than the current group then expand the current group
      if (event.end > end) {
        groups.delete(toPrimitiveMapKey(start, end));
        end = event.end;
        groups.set(toPrimitiveMapKey(start, end), currentGroup);
      }
    } else {
      start = event.start;
      end = event.end;
      groups.set(toPrimitiveMapKey(event.start, event.end), [event]);
    }
  }

  return groups;
}
