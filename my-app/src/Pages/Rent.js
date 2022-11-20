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

function Rent() {
    const [selectedCards, setSelectedCards] = useState([])
    const [trucks, setTrucks] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(()=>{
        const  getTrucks = async () => {
            const res = await fetch(`/api/cars/`)
                .then((response) => {
                     return response.json();
                }).catch(()=>{
                    return {resultCount:0, results:[]}
                })
            console.log(res)
            setTrucks(res)
            const resBrands = []
            for (const element of res) {
                const brand = await fetch(`/api/brands/${element.brand}`)
                    .then((response) => {
                        return response.json();
                    }).catch(()=>{
                        return {resultCount:0, results:[]}
                    })
                console.log(brand)
                resBrands.push(brand.title)
            }
            setBrands(resBrands)
        }
        getTrucks();

        return () => {
            setBrands([]);
            setTrucks([]);
        }
    },[])

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

            <Row className="g-4" style={TableBlockStyle}>
                {trucks.map((item, index)=>{
                    return<Col>
                        <TruckCard id={item.pk}
                                   name={item.title}
                                   price={item.price}
                                   brand={brands[index]}
                                   capacity={item.capacity}
                                   image={item.photo}
                                   isSelected={selectedCards.includes(item.pk)}
                                   onClickSelect={onClickSelect}/>
                    </Col>
                })}
            </Row>
        </>
    );
}

export default Rent;