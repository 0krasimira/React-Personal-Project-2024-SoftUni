import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: "https://static.bnr.bg/gallery/cr/7acf6c65f6ba908de5a1bfc8348f86ef.jpg",
            text: "Discover New Worlds"
        },
        {
            src: "https://assets.iflscience.com/assets/articleNo/70892/aImg/70999/utroba-cave-o.webp",
            text: "Unlock Ancient Secrets"
        },
        {
            src: "https://th-thumbnailer.cdn-si-edu.com/n2EIdgI6IKCVkAHaVr-wperop3o=/fit-in/1072x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/7c/17/7c174f2b-8027-4669-957c-e93dfbb7e4f6/sqj_1604_danube_gold_04.jpg",
            text: "Embark On A Journey Through Time"
        },
        {
            src: "https://static.bnr.bg/gallery/cr/57b1c426ad83a7823aea7c5c16c8e939.JPG",
            text: "Explore History's Treasures"
        },
        {
            src: "https://static.bnr.bg/gallery/cr/1fc970373b6b8ed4ec655e66aed55d4c.jpg",
            text: "Join Our Community Today"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const setSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles.wrapper}>
            <header id="home" className={styles.header}>
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <div className={styles.headerContent}>
                            <h1 className={styles.discover}>
                                <span>Discover </span>the most captivating archaeological sites in Bulgaria
                            </h1>
                            <blockquote className={styles.blockquote} cite="https://example.com">
                                <p className={styles.blockquoteText}>
                                    “For me, archaeologists do not discover the past; they work on what remains. Archaeology is about our relationships with what is left of the past. And more – archaeology is the discipline of things – the history of design, how people get on with the material world, materiality itself.”
                                </p>
                                <footer className={styles.blockquoteFooter}>— Michael Shanks, Archaeologist</footer>
                            </blockquote>
                            {/* <button className={styles.button}><a href="#" className="text-uppercase">Book Now</a></button> */}
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.slideshowContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
                    >
                        <img
                            src={slide.src}
                            alt={`Image ${index + 1}`}
                            className={styles.image}
                        />
                        <div className={styles.text}>{slide.text}</div>
                    </div>
                ))}
                <a className={styles.prev} onClick={prevSlide}>&#10094;</a>
                <a className={styles.next} onClick={nextSlide}>&#10095;</a>
                <div className={styles.dotContainer}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                            onClick={() => setSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}
