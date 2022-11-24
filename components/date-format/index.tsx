import React from "react";
import { format as formatFn } from "date-fns";
import { nb } from "date-fns/locale";
import { capitalizeFirst } from '../../lib/strings';

interface Props {
  date: string | undefined;
  semester?: string | undefined;
  format: string;
  postfix?: string;
  prefix?: string;
}

export default function DateFormat({ date, semester, format, postfix, prefix }: Props) {
  if (!date && !semester) return null;
  return (
    <>
      {prefix}
      {date && formatFn(new Date(date), format, { locale: nb })}
      {semester && capitalizeFirst(semester)}
      {postfix}
    </>
  );
}
