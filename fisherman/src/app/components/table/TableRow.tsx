import { TableRowProps, Tr } from '@chakra-ui/react';

interface ITableRowProps extends TableRowProps {
  children: React.ReactNode;
}

export const TableRow = ({ children, ...props }: ITableRowProps) => {
  return <Tr {...props}>{children}</Tr>;
};
