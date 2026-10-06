import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShoppingBasket,
  Sparkles,
  X,
} from 'lucide-react';
import { products } from './data/products.js';

const shop = {
  phone: '9403112400',
  email: 'khade4443@gmail.com',
  address: 'Hanuman Chowk, Jeur, Karmala, Solapur',
  hours: '9 AM to 9 PM',
  mapUrl: 'https://maps.app.goo.gl/VzAgtZXH2GXVuZns8?g_st=ac',
};

const navigation = [
  ['Home', 'home'],
  ['Products', 'featured'],
  ['About', 'about'],
  ['Location', 'location'],
  ['Contact', 'contact'],
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopImageFailed, setShopImageFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const phoneHref = shop.phone ? `tel:${shop.phone}` : undefined;
  const emailHref = shop.email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(shop.email)}`
    : undefined;

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Ganesh Traders home">
          <span className="brand-mark"><ShoppingBasket size={20} strokeWidth={1.8} /></span>
          <span className="brand-name">GANESH <b>TRADERS</b></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button className="nav-visit" onClick={() => scrollTo('location')}>
            Visit our shop <ArrowUpRight size={15} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" aria-hidden="true">
            {!shopImageFailed && (
              <img
                src="/images/shop-front.jpg"
                alt=""
                onError={() => setShopImageFailed(true)}
              />
            )}
            {shopImageFailed && <img src="/images/shop-front-placeholder.svg" alt="" />}
          </div>
          <div className="hero-shade" />
          <div className="hero-inner">
            <p className="eyebrow hero-eyebrow"><span /> YOUR NEIGHBOURHOOD STORE</p>
            <h1>Good things,<br /><em>all in one place.</em></h1>
            <p className="hero-description">
              Quality Products. Trusted Service.<br />
              Explore our products and discover what Ganesh Traders has to offer.
            </p>
            <div className="hero-actions">
              <button className="button button-accent" onClick={() => scrollTo('featured')}>
                EXPLORE NOW <ArrowRight size={17} />
              </button>
              <button className="button button-outline-light" onClick={() => scrollTo('location')}>
                VISIT OUR SHOP <MapPin size={16} />
              </button>
            </div>
          </div>
          <div className="hero-caption"><span className="caption-line" /> YOUR LOCAL STORE, WITH A LITTLE MORE CARE</div>
          <button className="hero-scroll" onClick={() => scrollTo('featured')} aria-label="Scroll to featured products">
            <ArrowDown size={17} />
          </button>
        </section>

        <section className="benefit-strip" aria-label="What makes us special">
          <div><span className="benefit-icon"><PackageCheck size={19} /></span><span><b>Everyday essentials</b><small>Thoughtfully stocked for you</small></span></div>
          <div><span className="benefit-icon"><Sparkles size={19} /></span><span><b>Quality you can trust</b><small>Good products, good people</small></span></div>
          <div><span className="benefit-icon"><MessageCircle size={19} /></span><span><b>Here to help</b><small>A friendly face, every visit</small></span></div>
        </section>

        <section className="section featured-section" id="featured">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> A GOOD PLACE TO START</p>
              <h2>Our <em>products</em></h2>
              <p className="section-intro">A few of our popular products</p>
            </div>
          </div>
          <ProductGrid items={featuredProducts} onAsk={() => scrollTo('contact')} />
        </section>

        <section className="story-section" id="about">
          <div className="story-visual">
            <div className="story-photo">
              <img src="/images/shop-front.jpg" alt="Ganesh Traders storefront" onError={(event) => { event.currentTarget.src = '/images/shop-front-placeholder.svg'; }} />
            </div>
            <div className="story-note"><span className="note-icon"><Check size={19} /></span><span><b>A store with heart</b><small>Rooted in the neighbourhood</small></span></div>
          </div>
          <div className="story-copy">
            <p className="eyebrow"><span /> A LITTLE ABOUT US</p>
            <h2>Your local stop<br />for <em>everyday good.</em></h2>
            <p>
              At Ganesh Traders, shopping is personal. We bring together the everyday
              essentials you need and the friendly service you deserve—all in one
              welcoming local store.
            </p>
            <p>Drop in, have a look around, and let us help you find just what you need.</p>
            <button className="text-link" onClick={() => scrollTo('location')}>COME SAY HELLO <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> COME ON BY</p>
              <h2>Find us <em>nearby.</em></h2>
              <p className="section-intro">We’d love to welcome you in.</p>
            </div>
          </div>
          <div className="location-grid">
            <div className="map-card">
              <div className="map-pattern" aria-hidden="true"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /></div>
              <div className="map-pin"><MapPin size={23} fill="currentColor" /></div>
              <div className="map-label"><b>GANESH TRADERS</b><span>{shop.address || 'Your neighbourhood store'}</span></div>
              {shop.mapUrl ? <a href={shop.mapUrl} target="_blank" rel="noreferrer" className="map-open">OPEN IN MAPS <ArrowUpRight size={15} /></a> : <span className="map-open map-pending">LOCATION DETAILS COMING SOON</span>}
            </div>
            <div className="visit-details">
              <article className="detail-card">
                <span className="detail-icon"><MapPin size={19} /></span>
                <div><h3>Come visit</h3><p>{shop.address || 'Shop address will be added soon.'}</p></div>
              </article>
              <article className="detail-card">
                <span className="detail-icon"><Clock3 size={19} /></span>
                <div><h3>Store hours</h3><p>{shop.hours || 'Opening hours will be added soon.'}</p></div>
              </article>
              <div className="visit-tip"><Sparkles size={17} /><span>Have a product question? Give us a call or send us an email before you visit.</span></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow"><span /> WE’RE EASY TO REACH</p>
            <h2>Let’s have<br /><em>a conversation.</em></h2>
            <p>Questions about a product? We’re always happy to help. Reach out or drop by the store.</p>
          </div>
          <div className="contact-actions">
            <a className={`contact-action${phoneHref ? '' : ' is-pending'}`} href={phoneHref} aria-disabled={!phoneHref}>
              <span className="contact-icon"><Phone size={19} /></span>
              <span><small>GIVE US A CALL</small><b>{shop.phone || 'Phone details coming soon'}</b></span>
              <ArrowUpRight size={18} />
            </a>
            <a className={`contact-action${emailHref ? '' : ' is-pending'}`} href={emailHref} target={emailHref ? '_blank' : undefined} rel={emailHref ? 'noreferrer' : undefined} aria-disabled={!emailHref}>
              <span className="contact-icon"><Mail size={19} /></span>
              <span><small>EMAIL US</small><b>{shop.email || 'Email details coming soon'}</b></span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark"><ShoppingBasket size={20} strokeWidth={1.8} /></span>
          <span className="brand-name">GANESH <b>TRADERS</b></span>
        </a>
        <p>Quality Products. Trusted Service.</p>
        <div className="footer-right"><span>MADE FOR THE NEIGHBOURHOOD</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={17} /></a></div>
      </footer>
    </>
  );
}

function ProductGrid({ items, onAsk }) {
  return (
    <div className="product-grid">
      {items.map((product, index) => (
        <article className="product-card" key={product.id} style={{ '--card-delay': `${index * 55}ms` }}>
          <div className="product-image">
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="product-badge">IN STORE</span>
            <button className="product-arrow" onClick={onAsk} aria-label={`Ask about ${product.name}`}><ArrowUpRight size={17} /></button>
          </div>
          <div className="product-meta"><span>{product.category}</span><span className="availability"><i /> Available in store</span></div>
          <h3>{product.name}</h3>
          <p className="product-price">Ask in store for pricing</p>
        </article>
      ))}
    </div>
  );
}

export default App;
