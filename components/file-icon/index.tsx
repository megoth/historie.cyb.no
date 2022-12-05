import { BsFileEarmark, BsFileEarmarkPdf } from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface FileIconProps extends Omit<IconBaseProps, "children"> {
  mimeType: string;
}


export default function FileIcon({ mimeType, ...props }: FileIconProps) {
  switch(mimeType) {
    case "application/pdf": return <BsFileEarmarkPdf {...props} />;
    default: return <BsFileEarmark {...props} />
  }
}
