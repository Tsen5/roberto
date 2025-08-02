import { useTheme } from '@emotion/react';
import { EmojiPickerListCategoryHeaderProps } from 'frimousse';

import Overline from '../overline/overline';

export type CategoryHeaderProps = EmojiPickerListCategoryHeaderProps;

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const theme = useTheme();

  return (
    <Overline
      css={{
        color: theme.colors.tokens.icon,
        fontSize: 10,
        // position: 'sticky',
        // top: 0,
        paddingTop: theme.sizes.spacing.getSpacing(1),
        paddingBottom: theme.sizes.spacing.getSpacing(1),
      }}
    >
      {category.label}
    </Overline>
  );
};

export default CategoryHeader;
