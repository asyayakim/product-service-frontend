import  { useEffect, useRef } from 'react';
import Swiper from 'swiper';

export default function AdvertismentTop() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
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
    <div className="top-bar py-2">
      <div className="container-fluid container-xl">
        <div className="row align-items-center">

          <div className="col-lg-4 col-md-12 text-center">
            <div 
              ref={swiperRef}
              className="announcement-slider swiper"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">🚚 Free shipping on orders over $50</div>
                <div className="swiper-slide">💰 30 days money back guarantee.</div>
                <div className="swiper-slide">🎁 20% off on your first order</div>
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