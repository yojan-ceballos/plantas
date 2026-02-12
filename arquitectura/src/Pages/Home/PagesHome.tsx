import React from 'react';
import MainLayout from '../../GlobalComponents/Layout/MainLayout';
import Hero from './Components/Hero';
import SocialProof from './Components/SocialProof';
import Categories from './Components/Categories';
import FeaturedProducts from './Components/FeaturedProducts';
import Newsletter from './Components/Newsletter';
import './Components/HomeSections.css';

const PagesHome: React.FC = () => {
    return (
        <MainLayout>
            <Hero />
            <SocialProof />
            <Categories />
            <FeaturedProducts />
            <Newsletter />
        </MainLayout>
    );
};

export default PagesHome;
