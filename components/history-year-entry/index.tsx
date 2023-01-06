import { EventForListQuery } from "../../lib/api/history";
import {
  yearListStyle,
  yearContentSelectedStyle,
  yearContentStyle,
  yearTitleStyle,
} from "./styles.css";
import HistoryYearListItem from "./history-year-list-item";
import DateFormat from "../date-format";
import cn from "classnames";

interface Props {
  events: Array<EventForListQuery>;
  year: string | number; // React parses it as number
}

export default function HistoryYearEntry({
                                           events,
                                           year,
                                         }: Props) {
  const majorEvents = events.filter((event) => event.major && !event.semester);
  const minorEvents = events.filter((event) => !event.major && !event.semester);
  const semesterEvents = events.filter((event) => event.semester)
  const yearAsString = year.toString();

  return (
    <>
      <h3 className={yearTitleStyle}>
        <DateFormat date={yearAsString} format={"yyyy"}/>
      </h3>
      <div className={cn(yearContentStyle, yearContentSelectedStyle)}>
        <ul className={yearListStyle}>
          {majorEvents.map((event, index) => (
            <HistoryYearListItem
              event={event}
              key={`major-event-${event.year}-${index}`}
            />
          ))}
          {minorEvents.length > 0 && (
            <li key={`minor-events-${year}`}>
              Mindre hendelser
              <ul className={yearListStyle}>
                {minorEvents.map((event, index) => (
                  <HistoryYearListItem
                    event={event}
                    key={`minor-event-${event.year}-${index}`}
                  />
                ))}
              </ul>
            </li>
          )}
          {semesterEvents.length > 0 && (
            <li key={`semester-events-${year}`}>
              Grupper
              <ul className={yearListStyle}>
                {groupSemesterEventsByYear(semesterEvents).map((event, index) => (
                  <HistoryYearListItem
                    event={event}
                    key={`semester-event-${event.year}-${index}`}
                  />
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function groupSemesterEventsByYear(events: Array<EventForListQuery>): Array<EventForListQuery> {
  return events.reduce<Array<EventForListQuery>>((list, event) => {
    const index = list.map(({ name }) => name).indexOf(event.name);
    return index !== -1 ? [
      ...list.slice(0, index),
      {
        ...event,
        semester: null,
      },
      ...list.slice(index + 1),
    ] : list.concat(event);
  }, []);
}
