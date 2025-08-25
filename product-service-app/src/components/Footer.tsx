export default function Footer() {
    return (
        <footer id="footer" className="footer dark-background">
            <div className="footer-main">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget footer-about">
                                <a href="index.html" className="logo">
                                    <span className="sitename">Product Donor</span>
                                </a>
                                <p>Buy food for them who need it the most.</p>

                            </div>
                        </div>

                    

                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h4>Support</h4>
                                <ul className="footer-links">
                                    <li><a href="support.html">Help Center</a></li>
                                    <li><a href="account.html">Order Status</a></li>
                                    <li><a href="shiping-info.html">Shipping Info</a></li>
                                    <li><a href="return-policy.html">Returns &amp; Exchanges</a></li>
                    
                                    <li><a href="contact.html">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row gy-3 align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="copyright">
                                <p>© <span>Copyright</span> <strong className="sitename">NiceShop</strong>. All Rights Reserved.</p>
                            </div>
                            <div className="mt-1 credits">
                                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="flex-wrap gap-4 d-flex justify-content-lg-end justify-content-center align-items-center">
                                <div className="payment-methods">
                                    <div className="payment-icons">
                                        <i className="bi bi-credit-card" aria-label="Credit Card"></i>
                                        <i className="bi bi-paypal" aria-label="PayPal"></i>
                                        <i className="bi bi-apple" aria-label="Apple Pay"></i>
                                        <i className="bi bi-google" aria-label="Google Pay"></i>
                                        <i className="bi bi-shop" aria-label="Shop Pay"></i>
                                        <i className="bi bi-cash" aria-label="Cash on Delivery"></i>
                                    </div>
                                </div>

                                <div className="legal-links">
                                    <a href="tos.html">Terms</a>
                                    <a href="privacy.html">Privacy</a>
                                    <a href="tos.html">Cookies</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}