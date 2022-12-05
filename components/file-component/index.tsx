import React from "react";
import { ComponentProps } from "../page-components";
import Container from '../container';
import { FileComponentQuery } from '../../lib/api/pages'
import Link from '../link';
import { containerStyle, metaDataStyle } from './styles.css';
import FileIcon from '../file-icon';

interface Props extends ComponentProps {
  component: FileComponentQuery
}

export default function FileComponent({ component }: Props) {
  return <Container>
    <div className={containerStyle}>
      <FileIcon mimeType={component.file.mimeType} size={"2em"}/>
      <div>
        {component.name ? (
          <>
            <Link href={component.file.url}>{component.name})</Link><br/>
            <span className={metaDataStyle}>{component.file.originalFilename}</span>
          </>
        ) : (
          <Link href={component.file.url}>{component.file.originalFilename})</Link>
        )}
      </div>
    </div>
  </Container>;
}
