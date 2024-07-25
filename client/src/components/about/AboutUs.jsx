import React from 'react';
import Footer from '../footer/Footer';
import styles from './AboutUs.module.css'; // Adjust the import path as needed

export default function AboutPage() {
    return (
        <div className={styles.pageWrapper}>
            <main className={styles.mainContent}>
                <section id="about">
                    <div className={styles.aboutTitle}>
                        <h1 className={styles.h1}>About Us</h1>
                    </div>
                    <div className={styles.aboutContainer}>
                        <div className={styles.aboutItem}>
                            <p className={styles.paragraph}>
                                Welcome to <span className={styles.emphasis}>ArchaeoConnect</span> - Bulgaria's newest and most exciting archaeology database!
                            </p>
                            <p className={styles.paragraph}>
                                Have you ever wished to embark on a <span className={styles.emphasis}>once in a lifetime</span> journey? Seek no more, as our web page will give you this opportunity. Venture into a virtual voyage through time and space by exploring some of Bulgaria's most <span className={styles.emphasis}>captivating archaeological sites</span>, holding national and international significance.
                            </p>
                            <p className={styles.paragraph}>
                                With us, you will have the chance to not only engage in captivating landscapes and stories but also <span className={styles.emphasis}>expand your knowledge</span> on various cultures that inhabited Bulgarian lands in the past. Climb aboard this unusual vehicle that connects the past and the present and <span className={styles.emphasis}>have yourself a time</span>!
                            </p>
                            <p className={styles.paragraph}>
                                Or are you perhaps an archaeologist yourself? Have your discoveries made you so <span className={styles.emphasis}>exhilarated</span> that you want to tell their story to the world? Seek no more, this is <span className={styles.emphasis}>your place</span>! We provide the perfect grounds for exchanging experience, ideas, and emotions, be it with <span className={styles.emphasis}>fellow archaeologists</span> or <span className={styles.emphasis}>zealous enthusiasts</span>!
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
