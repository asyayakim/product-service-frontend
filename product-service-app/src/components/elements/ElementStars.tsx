import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function ElementStars({ rating }: { rating: number }) {

    const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={fullStars + i + 1} className="text-yellow-400" />);
    }

    return stars;
  };
    return (
        <div className="flex text-yellow-400">
            {renderStars(rating)}
        </div>
    );
}

