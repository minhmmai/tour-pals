import React, { useState, useEffect, useCallback } from 'react';

import db from '../../../firestore';
import classes from './Carousel.module.scss';
import CarouselItem from './CarouselItem';
import { Slide, IconButton } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Carousel = props => {

    const [items, setItems] = useState([]);
    const [activeIndexes, setActiveIndexes] = useState([]);
    const carouselLength = props.length ? props.length : 3;

    useEffect(() => {
        db.collection('destinations')
            .get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.docs.map(doc => {
                    data.push({
                        name: doc.data().name,
                        description: doc.data().description,
                        thumbnail: doc.data().thumbnail,
                    })
                })
                setItems(data);
            }).catch(err => console.log(err));
            if (carouselLength) {
                const indexes = []
                for(let i = 0; i < carouselLength; i++) {
                    indexes.push(i)
                }
                setActiveIndexes(indexes);
            }
    }, [])

    const next = () => {
        const nextIndexes = [];
        activeIndexes.map((val) => {
            val >= items.length - 1
                ? nextIndexes.push(0)
                : nextIndexes.push(val + 1)
        });
        setActiveIndexes(nextIndexes)
    }

    const prev = () => {
        const prevIndexes = [];
        activeIndexes.map((val) => {
            val <= 0
                ? prevIndexes.push(items.length - 1)
                : prevIndexes.push(val - 1)
        });
        setActiveIndexes(prevIndexes)
    }

    return (
        <div className={classes.Carousel}>
            <button onClick={prev}>Prev</button>
            {items.length > 0
                && activeIndexes.map(val => {
                    return <CarouselItem key={val} item={items[val]} />
                })}
            <button onClick={next}>Next</button>
        </div>
    )
};

export default Carousel;