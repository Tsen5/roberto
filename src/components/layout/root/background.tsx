import styled from '@emotion/styled';

const noiseSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E";

const Background = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // eslint-disable-next-line
  background: `linear-gradient(135deg, ${theme.colors.background.pink} 0%, ${theme.colors.background.yellow} 50%, ${theme.colors.background.cyan} 100%)`,
  '&:before': {
    content: '""',
    backgroundColor: 'transparent',
    backgroundImage: `url("${noiseSvg}")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '300px',
    opacity: 0.25,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}));

export default Background;
