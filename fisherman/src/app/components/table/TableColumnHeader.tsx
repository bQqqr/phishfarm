import { Th, TableColumnHeaderProps } from '@chakra-ui/react';

interface ITableColumnHeaderProps extends TableColumnHeaderProps {
  children: React.ReactNode;
}

export const TableColumnHeader = ({
  children,
  ...props
}: ITableColumnHeaderProps) => {
  return <Th {...props}>{children}</Th>;
};
