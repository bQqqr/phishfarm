import {
  TableCaption as ChakraTableCaption,
  TableCaptionProps,
} from '@chakra-ui/table';

interface ITableCaptionProps extends TableCaptionProps {
  children: React.ReactNode;
}

export const TableCaption = ({
  children,
  ...props
}: ITableCaptionProps) => {
  return (
    <ChakraTableCaption {...props}>{children}</ChakraTableCaption>
  );
};
