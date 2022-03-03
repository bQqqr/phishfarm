import { Table as ChakraTable, TableProps } from '@chakra-ui/react';
import { TableBody } from './TableBody';
import { TableCaption } from './TableCaption';
import { TableCell } from './TableCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';

interface ITableProps extends TableProps {
  children: React.ReactNode;
}

export const Table = ({ children, ...props }: ITableProps) => {
  return <ChakraTable {...props}>{children}</ChakraTable>;
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Column = TableColumnHeader;
Table.Cell = TableCell;
Table.Caption = TableCaption;
