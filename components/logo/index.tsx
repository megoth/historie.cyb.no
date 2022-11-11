import React from "react";

interface Props {
  width?: number;
  title?: string;
}

const defaultTitle = "Cybernetisk Selskab logo";

export default function Logo({
                               title = defaultTitle,
                             }: Props) {
  return (
    <div>
      <img
        src="https://d33wubrfki0l68.cloudfront.net/5bfd78f424312a6b4e3a35f22047ba2cffa934e2/af85c/img/cyb-stor.svg"
        alt={title} />
    </div>
  );
}
