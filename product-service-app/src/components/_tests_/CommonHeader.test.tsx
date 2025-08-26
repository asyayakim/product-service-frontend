import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useCart } from '../context/CartContext'
import CommonHeader from '../header/CommonHeader';
import userEvent from '@testing-library/user-event';
jest.mock('../context/CartContext', () => ({
    useCart: jest.fn(),
}));

jest.mock('../addvertisment/AdvertismentTop', () => () => (
    <div data-testid="advertisement-top">Advertisement</div>
));


const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

interface MockFavoriteItem {
    productId: number;
    imageUrl: string;
    productName: string;
    brand?: string;
    unitPrice: number;
    quantity: number;
    store?: { name: string; logo?: string };
}

interface MockBasketItem {
    productId: number;
    imageUrl: string;
    productName: string;
    brand?: string;
    unitPrice: number;
    quantity: number;
    store?: { name: string; logo?: string };
}


describe('CommonHeader', () => {
    const mockUser = { name: 'Test User' };
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseCart.mockReturnValue({
            favorites: [{ productId: 1 }, { productId: 2 }] as MockFavoriteItem[],
            basket: [{ productId: 1 }, { productId: 2 }, { productId: 3 }] as MockBasketItem[],
            addToBasket: jest.fn(),
            removeFromBasket: jest.fn(),
            setQuantity: jest.fn(),
            clearBasket: jest.fn(),
            addToFavorites: jest.fn(),
            removeFromFavorites: jest.fn(),
            clearFavorites: jest.fn(),
        });
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));
    });

    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <CommonHeader user={mockUser} logout={mockLogout} />
            </BrowserRouter>
        );

        expect(screen.getByText('Product Donor')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('displays the correct number of favorites and basket items', () => {
        render(
            <BrowserRouter>
                <CommonHeader user={mockUser} logout={mockLogout} />
            </BrowserRouter>
        );
        const favoriteBadge = screen.getByText('2');
        const basketBadge = screen.getByText('3');

        expect(favoriteBadge).toBeInTheDocument();
        expect(basketBadge).toBeInTheDocument();
    });
});

