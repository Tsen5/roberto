import styled from '@emotion/styled';
import { EmojiPicker } from 'frimousse';
import { getGlassmorphismStyle } from '../../../helpers/getGlassmorphismStyle';

const EmojiPickerRoot = styled(EmojiPicker.Root)(({ theme }) => ({
  height: 368,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.sizes.radius.getRadius(1),
  paddingLeft: theme.sizes.spacing.getSpacing(1),
  paddingRight: theme.sizes.spacing.getSpacing(1),
  ...getGlassmorphismStyle({ backgroundOpacity: 0.5, borderWidth: 0 }),
}));

export default EmojiPickerRoot;
