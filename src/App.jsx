import './App.css'
import React, { useState, useRef } from 'react';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import Footer from './Components/Footer';
import img1 from '/asset/image.png';
import img2 from '/asset/img.png';
import img3 from '/asset/MapMitv2.png';
import img4 from '/asset/MapMitv2.0.pdf';


function App() {
    const [openSection, setOpenSection] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const contactRef = useRef(null);

    const toggleSection = (sectionNumber) => {
        setOpenSection(openSection === sectionNumber ? null : sectionNumber);
    };

    const maps = [
        { id: 1, title: "Revels WebMap", image: img1 },
        { id: 2, title: "Map MIT", image: img3 },
    ];

    const scrollToMap = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.children[0].offsetWidth;
            const scrollAmount = cardWidth + 20;

            if (direction === 'left') {
                const newIndex = Math.max(0, activeIndex - 1);
                setActiveIndex(newIndex);
                container.scrollTo({
                    left: newIndex * scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                const newIndex = Math.min(maps.length - 1, activeIndex + 1);
                setActiveIndex(newIndex);
                container.scrollTo({
                    left: newIndex * scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.children[0].offsetWidth;
            const scrollPosition = container.scrollLeft;
            const newIndex = Math.round(scrollPosition / cardWidth);
            setActiveIndex(newIndex);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    // Add touch event handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleContactClick = () => {
        if (contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app">
            <Navbar onContactClick={handleContactClick} />
            <div className="content">
                <h1 className="neon-heading">
                    Revolutionizing<br/>
                    navigation and events<br/>
                    using cutting-edge geospatial<br/>
                    technology
                </h1>
                <div className="image-container">
                    <img src={img1} alt="Campus Map" className="feature-image"/>
                    <img src={img2} alt="3D Mapping" className="feature-image"/>
                </div>

                <div className="sections-container">
                    <div className="section-item">
                        <div
                            className="section-header"
                            onClick={() => toggleSection(1)}
                        >
                            <h3>1 Interactive Mapping (2D and 3D)</h3>
                            <span className={`arrow ${openSection === 1 ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`section-content ${openSection === 1 ? 'open' : ''}`}>
                            
                        <p>1. We Provide Static High Detail Maps that allow user interaction, customization, and visualization in both 2D and 3D formats</p>
                            
                        <p>2. We also Provide Dynamic Digital Maps to interact with Map elements and customise Visualisation </p>   
                            
                        <p> 3. VR Enabled Maps: Virtual Reality (VR) maps create fully immersive 3D environments that users can explore using VR headsets. These are ideal for virtual tours, such as exploring a museum, a historical site, or a real estate property without being physically present</p>  

                            
                        </div>
                    </div>

                    <div className="section-item">
                        <div
                            className="section-header"
                            onClick={() => toggleSection(2)}
                        >
                            <h3>2 Indoor Mapping</h3>
                            <span className={`arrow ${openSection === 2 ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`section-content ${openSection === 2 ? 'open' : ''}`}>
                            <p>This category focuses on mapping technologies designed for indoor environments, where traditional GPS often struggles due to signal limitations. Indoor mapping provides detailed layouts and navigation tools for spaces like buildings, malls, or airports..</p>
                        </div>
                    </div>

                    <div className="section-item">
                        <div
                            className="section-header"
                            onClick={() => toggleSection(3)}
                        >
                            <h3>3 Event Tracking</h3>
                            <span className={`arrow ${openSection === 3 ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`section-content ${openSection === 3 ? 'open' : ''}`}>
                            <p>This category involves real-time tracking and management of events within a mapped area, often for operational or safety purposes. It's focused on monitoring activities and responding to dynamic situations.</p>
                        </div>
                    </div>
                </div>

                <h2 className="section-title">Our Maps</h2>
                <p className="coming-soon">More Coming Soon....</p>
                
                <div className="scroll-container">
                    <button 
                        className={`scroll-button left ${activeIndex === 0 ? 'disabled' : ''}`}
                        onClick={() => scrollToMap('left')}
                        disabled={activeIndex === 0}
                    >
                        &#10094;
                    </button>
                    
                    <div 
                        className="scroll-wrapper" 
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {maps.map((map, index) => (
                            <div 
                                key={map.id} 
                                className={`map-card ${index === activeIndex ? 'active' : ''}`}
                                onClick={
                                    map.title === "Revels WebMap"
                                        ? () => window.open('https://mit.nakshatramaps.com/', '_blank')
                                        : map.title === "Map MIT"
                                            ? () => window.open(img4, '_blank')
                                            : undefined
                                }
                                style={
                                    map.title === "Revels WebMap" || map.title === "Map MIT"
                                        ? { cursor: 'pointer' }
                                        : {}
                                }
                            >
                                <img src={map.image} alt={map.title} />
                                <h3>{map.title}</h3>
                            </div>
                        ))}
                    </div>

                    <button 
                        className={`scroll-button right ${activeIndex === maps.length - 1 ? 'disabled' : ''}`}
                        onClick={() => scrollToMap('right')}
                        disabled={activeIndex === maps.length - 1}
                    >
                        &#10095;
                    </button>

                    <div className="scroll-dots">
                        {maps.map((map, index) => (
                            <span 
                                key={map.id} 
                                className={`dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    scrollRef.current.scrollTo({
                                        left: index * (scrollRef.current.children[0].offsetWidth + 20),
                                        behavior: 'smooth'
                                    });
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div ref={contactRef}>
                    <ContactUs />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
