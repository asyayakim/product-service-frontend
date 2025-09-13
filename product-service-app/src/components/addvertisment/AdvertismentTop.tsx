import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';


export default function AdvertismentTop() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        modules: [Autoplay],
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 1,
        direction: 'vertical',
        effect: 'slide'
      });
    }
  }, []);

  return (
    <div className="py-2 top-bar">
      <div className="container-fluid container-xl">
        <div className="row align-items-center">

          <div className="text-center col-lg-4 col-md-12">
            <div 
              ref={swiperRef}
              className="announcement-slider swiper"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">🚚 Free shipping on orders over 500kr</div>
                <div className="swiper-slide">💰 30 days money back guarantee.</div>
                <div className="swiper-slide">🎁 10% off on your first order</div>
              </div>
            </div>
          </div>

            <div className="col-lg-4 d-none d-lg-flex justify-content-end">
          </div>
        </div>
      </div>
    </div>
  );
}