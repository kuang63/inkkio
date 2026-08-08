import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow'
import HTMLFlipBook from 'react-pageflip';
import { useCardStore } from '../../stores/CardStore';
import CardPage from '../../components/CardPage';
import Toolbar from '../../components/ToolBar';

function Card() {
    const bookRef = useRef();
    const { currentPage, setPage } = useCardStore(
        useShallow((state) => ({ currentPage: state.currentPage, setPage: state.setPage })),
    )

    useEffect(() => {
        function handleFlipping(event) {
            if (event.key === "ArrowLeft" && currentPage > 0) {
                bookRef.current.pageFlip().flipPrev();
                if (currentPage === 3) {
                    setPage(currentPage - 2);
                    return;
                }
                setPage(currentPage - 1);
            }       
            else if (event.key === "ArrowRight" && currentPage < 3) {
                bookRef.current.pageFlip().flipNext();
                if (currentPage === 1) {
                    setPage(currentPage + 2);
                    return;
                }
                setPage(currentPage + 1);
            }
        };

        window.addEventListener('keydown', handleFlipping);

        return () => {
            window.removeEventListener('keydown', handleFlipping);
        }
    }, [currentPage])

    return (
        <div>
            <HTMLFlipBook width = {400} height = {560} showCover = {true} ref = {bookRef} useMouseEvents = {false}>
                <section className = "page cover-page">
                    <CardPage pageId = {0}/>
                </section>
                <section className = "page inside-page">
                    <CardPage pageId = {1}/>
                </section>
                <section className = "page inside-page">
                    <CardPage pageId = {2}/>
                </section>
                <section  className = "page back-page">
                    <CardPage pageId = {3}/>
                </section>
            </HTMLFlipBook>
            <Toolbar></Toolbar>
        </div>
    )
}

export default Card;