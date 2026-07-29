import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import useCardStore from '../../stores/CardStore';
import { updateBookSize } from '../../utils/CardUtils';
import './Card.css';

function Card() {    
    // Get the design dimensions from the store (800 x 1200)
    const { designWidth, designHeight, pages } = useCardStore();

    // Get the current window dimensions and calculate the book size based on the design dimensions
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const [ bookSize, setBookSize ] = useState(updateBookSize(windowHeight, windowWidth));

    return (
        <main>    
            <aside className = "tools">
                <h1> Top Tools </h1>
            </aside>    
            <section className = "card-container">
                <HTMLFlipBook className = "card" width = {bookSize.width} height = {bookSize.height} showCover = {true} usePortrait = { windowWidth > windowHeight ? false : true }>
                    {pages.map((page) => (
                        <section key = {page["page-number"]}>
                            <h2>Page {page["page-number"]}</h2>
                        </section>
                    ))}
                </HTMLFlipBook>
            </section>
            <aside className = "tools">
                <h1> Bottom Tools </h1>
            </aside>
        </main>
    );  
}

export default Card;