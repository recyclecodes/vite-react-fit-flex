import { FC } from 'react';
import BodyPart from './BodyPart';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';

interface Item {
  id: string;
  name: string;
  description: string;
}

interface HorizontalSliderProps {
  data: Item[];
  bodyPart: Item; 
  setBodyPart: (item: Item) => void; 
}

const HorizontalSlider: FC<HorizontalSliderProps> = ({
  data,
  bodyPart,
  setBodyPart,
}) => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={'auto'}
        loopAddBlankSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 10,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HorizontalSlider;
