import React from "react";
import { EventQuery } from "../../lib/api/history";
import Container from "../container";
import DateFormat from "../date-format";
import TextBlock from "../text-block";
import Link from "../link";
import { listStyle } from "./styles.css";

interface Props {
  event: EventQuery;
}

export default function Event({ event }: Props) {
  return (
    <Container>
      <p>
        {event.date ? (
          <span>
            Dato: <DateFormat date={event.date} format={"PPPP"} />
          </span>
        ) : (
          <span>
            År: <DateFormat date={event.year} format={"yyyy"} />
          </span>
        )}
      </p>
      {event.description && <TextBlock text={event.description} />}
      {event.sources?.length > 0 && (
        <>
          <h2>Kilder</h2>
          <ul className={listStyle}>
            {event.sources.map((source, index) => (
              <li key={`source-${index}`}>
                {source.url ? (
                  <Link href={source.url}>{source.text}</Link>
                ) : (
                  source.text
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
