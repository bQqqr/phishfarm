import { TableBodyProps, Tbody } from '@chakra-ui/react';

interface ITableBodyProps extends TableBodyProps {
  children: React.ReactNode;
}

export const TableBody = ({
  children,
  ...props
}: ITableBodyProps) => {
  return <Tbody {...props}>{children}</Tbody>;
};
