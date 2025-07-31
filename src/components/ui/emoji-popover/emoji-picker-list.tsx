import styled from '@emotion/styled';
import { EmojiPicker } from 'frimousse';

const EmojiPickerList = styled(EmojiPicker.List)(({ theme }) => ({
  paddingTop: theme.sizes.spacing.getSpacing(1),
}));

export default EmojiPickerList;
