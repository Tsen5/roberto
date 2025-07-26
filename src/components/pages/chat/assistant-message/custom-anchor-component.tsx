import { useTheme } from '@emotion/react';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

// import { shell } from 'electron';

export type CustomAnchorComponentProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const CustomAnchorComponent = ({
  children,
  ...props
}: CustomAnchorComponentProps) => {
  const theme = useTheme();

  return (
    <a
      css={{ color: theme.colors.tokens.info }}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default CustomAnchorComponent;
