import React, { useState, useEffect } from 'react';

import db from '../../../firestore';
import classes from './Carousel.module.scss';
import CarouselItem from './CarouselItem';
import { IconButton } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const Carousel = props => {

    const [items, setItems] = useState([]);
    const [activeIndexes, setActiveIndexes] = useState([]);
    const carouselLength = props.length ? props.length : 3;

    useEffect(() => {
        db.collection('destinations')
            .get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.docs.forEach(doc => {
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
            for (let i = 0; i < carouselLength; i++) {
                indexes.push(i)
            }
            setActiveIndexes(indexes);
        }
    }, [carouselLength])

    const next = () => {
        const nextIndexes = [];
        activeIndexes.forEach((val) => {
            val >= items.length - 1
                ? nextIndexes.push(0)
                : nextIndexes.push(val + 1)
        });
        setActiveIndexes(nextIndexes)
    }

    const prev = () => {
        const prevIndexes = [];
        activeIndexes.forEach((val) => {
            val <= 0
                ? prevIndexes.push(items.length - 1)
                : prevIndexes.push(val - 1)
        });
        setActiveIndexes(prevIndexes)
    }

    return (
        <div className={classes.Carousel}>
            <IconButton onClick={prev}>
                <KeyboardArrowLeftIcon style={{fontSize: '3rem'}}/>
            </IconButton>
            {
                items.length > 0
                && activeIndexes.map(val => {
                    return <CarouselItem key={val} item={items[val]} />
                })
            }            
            <IconButton onClick={next}>
                <KeyboardArrowRightIcon style={{fontSize: '3rem'}} />
            </IconButton>
        </div>
    )
};

export default Carousel;