import { TableHeadProps, Thead } from '@chakra-ui/react';

interface ITableHeadProps extends TableHeadProps {
  children: React.ReactNode;
}

export const TableHead = ({
  children,
  ...props
}: ITableHeadProps) => {
  return <Thead {...props}>{children}</Thead>;
};
