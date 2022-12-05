import React from "react";
import { ComponentProps } from "../page-components";
import Container from '../container';
import { FileComponentQuery } from '../../lib/api/pages'
import Link from '../link';
import { containerStyle, downloadIconStyle, mainInfoStyle, metaDataStyle } from './styles.css';
import FileIcon from '../file-icon';
import { BsDownload } from "react-icons/bs";

interface Props extends ComponentProps {
  component: FileComponentQuery
}

export default function FileComponent({ component }: Props) {
  return <Container>
    <Link href={component.file.url} className={containerStyle}>
      <FileIcon mimeType={component.file.mimeType} size={"2em"}/>
      <div className={mainInfoStyle}>
        {component.name ? (
          <>
            <span>{component.name})</span><br/>
            <span className={metaDataStyle}>{component.file.originalFilename}</span>
          </>
        ) : (
          <span>{component.file.originalFilename})</span>
        )}
      </div>
      <BsDownload className={downloadIconStyle} size={"1.5em"} />
    </Link>
  </Container>;
}
