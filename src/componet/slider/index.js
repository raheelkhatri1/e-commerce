import Carousel from 'react-bootstrap/Carousel';
import Slider1 from './../../image/slider1.png';
import Slider2 from './../../image/slider2.png'

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={Slider1} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Slider2} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
