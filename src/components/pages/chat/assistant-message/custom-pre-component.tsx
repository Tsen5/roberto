import { useTheme } from '@emotion/react';
import { Check, Copy } from 'lucide-react';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { onlyText } from '../../../../helpers/onlyText';

import Flex from '../../../ui/flex/flex';
import CopyCodeButton from './copy-code-button';

export type CustomPreComponentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const CustomPreComponent = ({
  children,
  ...props
}: CustomPreComponentProps) => {
  const { t } = useTranslation('chats');
  const theme = useTheme();

  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);

  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  const code = useMemo(() => onlyText(children), [children]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setIsCodeCopied(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setIsCodeCopied(false);
    }, 2000);
  }, [code]);

  return (
    <pre {...props}>
      <Flex
        justify="flex-end"
        width="100%"
        css={{ backgroundColor: theme.colors.palette.black }}
      >
        <CopyCodeButton onClick={handleCopyCode}>
          <Flex align="center" gap={0.5}>
            {isCodeCopied ? <Check size={12} /> : <Copy size={12} />}
            {isCodeCopied ? t('button.copied') : t('button.copyCode')}
          </Flex>
        </CopyCodeButton>
      </Flex>
      {children}
    </pre>
  );
};

export default CustomPreComponent;
