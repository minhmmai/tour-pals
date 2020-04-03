import React, { useState, useEffect } from 'react';

import db from '../../../firestore';
import CarouselItem from './CarouselItem';
import classes from './Carousel.module.scss';

const Carousel = props => {

    const [destinations, setDestinations] = useState([]);

    const visibleItems = 3;
    const displayingItems = [];

    useEffect(() => {
        db.collection('destinations')
            .onSnapshot(snapshot => {
                const destData = [];
                snapshot.forEach(document => {
                    destData.push({
                        id: document.data().id,
                        name: document.data().name,
                        description: document.data().description,
                        thumbnail: document.data().thumbnail
                    });
                });
                setDestinations(destData);
            });
    }, []);



    return (
        <div className={classes.Carousel}>
            {destinations.map(destination => {
                return (<CarouselItem
                    key={destination.id}
                    name={destination.name}
                    thumbnail={destination.thumbnail}
                    description={destination.description}/>)
            })}
        </div>
    )
};

export default Carousel;