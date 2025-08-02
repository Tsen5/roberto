import { useTheme } from '@emotion/react';
import { ArrowDown } from 'lucide-react';

import Flex from '../../ui/flex/flex';
import IconButton from '../../ui/icon-button/icon-button';

export interface ScrollToBottomButtonProps {
  inputContainerHeight: number;
  onClick: () => void;
}

const ScrollToBottomButton = ({
  inputContainerHeight,
  onClick,
}: ScrollToBottomButtonProps) => {
  const theme = useTheme();

  return (
    <Flex
      justify="center"
      width="100%"
      css={{
        position: 'fixed',
        bottom: inputContainerHeight + theme.sizes.spacing.getSpacing(2),
        left: 0,
      }}
    >
      <IconButton variant="soft" color="icon" onClick={onClick}>
        <ArrowDown />
      </IconButton>
    </Flex>
  );
};

export default ScrollToBottomButton;
