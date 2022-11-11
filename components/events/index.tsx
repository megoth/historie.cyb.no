import React from "react";
import { EventForListQuery, getYearsFromEvents } from "../../lib/api/history";
import HistoryYearEntry from "../history-year-entry";
import Container from "../container";
import { onlyUnique } from "../../lib/utils";
import { EventsProvider } from "../../contexts/eventsContext";
import { listStyle } from "./styles.css";
import EventsExpandAll from "./events-expand-all";

interface Props {
  events: Array<EventForListQuery>;
}

export default function Events({ events }: Props) {
  const eventYears = [
    ...getYearsFromEvents(events),
  ]
    .map((date) => date.substring(0, 4))
    .filter(onlyUnique)
    .sort()
    .reverse();
  // TODO: Might use expand/collapse-functionality later
  const expanded = true;
  return (
    <EventsProvider>
      <Container>
        {!expanded && <EventsExpandAll years={eventYears} />}
        <ul className={listStyle}>
          {eventYears.map((year) => (
            <li key={`year-${year}`}>
              <HistoryYearEntry
                events={events.filter(
                  (event) => event.year.indexOf(year) !== -1
                )}
                year={year}
                expanded={expanded}
              />
            </li>
          ))}
        </ul>
      </Container>
    </EventsProvider>
  );
}
