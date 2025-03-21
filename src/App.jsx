import './App.css'
import React, { useState, useRef } from 'react';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import Footer from './Components/Footer';
import img1 from '/asset/img_1.png';
import img2 from '/asset/img.png';
import img3 from '/asset/gta_map.png';
import img4 from '/asset/san_andreas_map.png';

function App() {
    const [openSection, setOpenSection] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    const toggleSection = (sectionNumber) => {
        setOpenSection(openSection === sectionNumber ? null : sectionNumber);
    };

    const maps = [
        { id: 1, title: "MapMIT", image: img1 },
        { id: 2, title: "los Santos", image: img3 },
        { id: 3, title: "San Andreas", image: img4 },
        { id: 4, title: "Map 4", image: img1 },
    ];

    const scrollToMap = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.children[0].offsetWidth;
            const scrollAmount = cardWidth + 20; // 20 is the gap between cards

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

    return (
        <div className="app">
            <Navbar />
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel accumsan justo.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat porttitor velit,
                                quis imperdiet magna pharetra a. Maecenas blandit efficitur quam. Pellentesque ornare
                                sagittis elit eget porta. Curabitur interdum nisl a scelerisque ornare, odio ex pulvinar
                                lorem, sed.</p>
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel accumsan justo.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat porttitor velit,
                                quis imperdiet magna pharetra a. Maecenas blandit efficitur quam. Pellentesque ornare
                                sagittis elit eget porta. Curabitur interdum nisl a scelerisque ornare, odio ex pulvinar
                                lorem, sed.</p>
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel accumsan justo.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat porttitor velit,
                                quis imperdiet magna pharetra a. Maecenas blandit efficitur quam. Pellentesque ornare
                                sagittis elit eget porta. Curabitur interdum nisl a scelerisque ornare, odio ex pulvinar
                                lorem, sed.</p>
                        </div>
                    </div>
                </div>

                <h2 className="section-title">Our Maps</h2>
                
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
                    >
                        {maps.map((map, index) => (
                            <div 
                                key={map.id} 
                                className={`map-card ${index === activeIndex ? 'active' : ''}`}
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
                <ContactUs />
            </div>
            <Footer />
        </div>
    );
}

export default App;
