import { EventForListQuery } from "../../lib/api/history";
import {
  yearLinkStyle,
  yearListStyle,
  yearContentSelectedStyle,
  yearContentStyle,
  yearTitleStyle,
} from "./styles.css";
import HistoryYearListItem from "./history-year-list-item";
import DateFormat from "../date-format";
import { useRouter } from "next/router";
import Link from "../link";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import EventsContext from "../../contexts/eventsContext";
import { toggleValueInArray } from "../../lib/utils";
import useHistory from "../../hooks/useHistory";
import { getHref } from '../../lib/router';

interface Props {
  events: Array<EventForListQuery>;
  year: string | number; // React parses it as number
  expanded: boolean;
}

export default function HistoryYearEntry({
                                           events,
                                           year,
                                           expanded,
                                         }: Props) {
  const majorEvents = events.filter((event) => event.major && !event.semester);
  const minorEvents = events.filter((event) => !event.major && !event.semester);
  const semesterEvents = events.filter((event) => event.semester)
  const yearAsString = year.toString();
  const { years, toggleYear } = useContext(EventsContext);
  const router = useRouter();
  const isSelected = years.findIndex((y) => y === yearAsString) !== -1;
  const [href, setHref] = useState(getHref(router));
  const history = useHistory();
  const selectYear = (event) => {
    event.preventDefault();
    toggleYear(yearAsString);
    history?.pushState(
      { years: toggleValueInArray(yearAsString, years) },
      "",
      event.target.href
    );
  };

  useEffect(() => {
    const selectedYears = toggleValueInArray(yearAsString, years);
    setHref(
      getHref(router, {
        query: {
          year: selectedYears,
        },
      })
    );
  }, [years]);

  return (
    <>
      <h3 className={yearTitleStyle}>
        {expanded ? (
          <DateFormat date={yearAsString} format={"yyyy"}/>
        ) : (
          <Link href={href} className={yearLinkStyle} onClick={selectYear}>
            <DateFormat date={yearAsString} format={"yyyy"}/>
            &nbsp;
            {isSelected ? "↓" : "→"}
          </Link>
        )}
      </h3>
      <div
        className={cn(yearContentStyle, {
          [yearContentSelectedStyle]: isSelected || expanded,
        })}
      >
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
