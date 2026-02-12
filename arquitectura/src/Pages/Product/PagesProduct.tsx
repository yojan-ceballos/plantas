import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import MainLayout from '../../GlobalComponents/Layout/MainLayout';
import Gallery from './Components/Gallery';
import ProductInfo from './Components/ProductInfo';
import RelatedProducts from './Components/RelatedProducts';
import { products } from '../../Data/products';
import './ProductDetail.css';
import '../Shop/Shop.css'; /* For shop-card reuse in Related */

const PagesProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === id);

    if (!product) {
        return <Navigate to="/shop" replace />;
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem', width: '100%' }}>
                {/* Breadcrumbs */}
                <nav className="pdp-breadcrumbs">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/shop">Shop</Link>
                    <span>/</span>
                    <span className="pdp-breadcrumbs__current">{product.name}</span>
                </nav>

                {/* Main Layout */}
                <div className="pdp-main">
                    <Gallery image={product.image} name={product.name} tag={product.tag} />
                    <ProductInfo product={product} />
                </div>

                {/* Related Products */}
                <RelatedProducts currentProductId={product.id} />
            </div>
        </MainLayout>
    );
};

export default PagesProduct;
