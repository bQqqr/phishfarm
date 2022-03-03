import { TableCellProps, Td } from '@chakra-ui/react';

interface ITableCellProps extends TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({
  children,
  ...props
}: ITableCellProps) => {
  return <Td {...props}>{children}</Td>;
};
