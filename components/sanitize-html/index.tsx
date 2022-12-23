import React from "react";

// we trust our own input
// if we need proper sanitization, check out
// https://stackoverflow.com/questions/38663751/how-to-safely-render-html-in-react

const sanitize = (dirty: string) => ({
  __html: dirty
});

interface SanitizeHtmlProps {
  html: string;
}

export default function SanitizeHTML({ html }: SanitizeHtmlProps) {
  return <div dangerouslySetInnerHTML={sanitize(html)}/>;
}
