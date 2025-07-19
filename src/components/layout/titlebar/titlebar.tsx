import Container from './container';
import SectionCenter from './section-center/section-center';
import SectionLeft from './section-left';
import SectionRight from './section-right';

const Titlebar = () => {
  return (
    <Container>
      <SectionLeft />
      <SectionCenter />
      <SectionRight />
    </Container>
  );
};

export default Titlebar;
