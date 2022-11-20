import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner} from "react-bootstrap";
import TruckCard from "../Components/TruckCard";
import IntervalSelector from "../Components/IntervalSelector";
import getData from "../Components/data";

const TableBlockStyle = {
    margin: "20px 15%",
    textAlign: 'center',
}

const TableCardStyle = {
    display: "inline-block",
    margin: "8px 8px 8px 0px",
}

async function getTrucks() {
    const res = await fetch(`/api/cars/`)
        .then((response) => {
            return response.json();
        }).catch(()=>{
            return {resultCount:1, results:[]}
        })
    return res
}

function Rent() {
    const [selectedCards, setSelectedCards] = useState([])

    useEffect()

    const onClickSelect = (id) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(prev => prev.filter(_id => _id != id));
        } else {
            setSelectedCards((prev) => [...prev, id])
        }
    }

    return (
        <>
            <IntervalSelector/>
            {!getData().length && <div>
                <h1>К сожалению, пока нет свободного транспорта :(</h1>
            </div>}

            <Row className="g-4" style={TableBlockStyle}>
                {getData().map((item)=>{
                    return<Col>
                        <TruckCard id={item.pk}
                                   name={item.name}
                                   brand={item.brand}
                                   price={item.brand}
                                   capacity={item.capacity}
                                   image={item.image}
                                   isSelected={selectedCards.includes(item.pk)}
                                   onClickSelect={onClickSelect}/>
                    </Col>
                })}
            </Row>
        </>
    );
}

export default Rent;