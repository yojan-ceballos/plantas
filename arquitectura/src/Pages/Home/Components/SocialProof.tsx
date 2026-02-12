import React from 'react';


const SocialProof: React.FC = () => {
    return (
        <section className="social-proof">
            <div className="social-proof__container">
                <p className="social-proof__label">As seen in</p>
                <div className="social-proof__logos">
                    <span className="social-proof__logo social-proof__logo--serif">VOGUE</span>
                    <span className="social-proof__logo social-proof__logo--serif" style={{ fontStyle: 'normal' }}>WIRED</span>
                    <span className="social-proof__logo social-proof__logo--sans">HYPEBEAST</span>
                    <span className="social-proof__logo social-proof__logo--serif" style={{ fontStyle: 'normal' }}>ELLE</span>
                    <span className="social-proof__logo social-proof__logo--sans">GQ</span>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
