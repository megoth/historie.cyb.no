import React, { ReactNode } from "react";
import { EventForListQuery } from "../../../lib/api/history";
import DateFormat from "../../date-format";
import Link from "../../link";

interface Props {
  event: EventForListQuery;
}

export default function HistoryYearListItem({ event }: Props) {
  return (
    <li>
      <DateFormat date={event.date} semester={event.semester} format={"d. MMMM"} postfix={": "} />
      {event.href ? (
        <Link href={event.href}>{event.name}</Link>
      ) : (
        <span>{event.name}</span>
      )}
    </li>
  );
}
