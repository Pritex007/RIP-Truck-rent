import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner} from "react-bootstrap";
import getData from "../Components/data";
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useParams} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";


const cardStyle = {
    margin: "8px 30%",
    textColor: "black",
    textAlign: "center"
};

const cardImage = {
    width: "100%",
    height: "500px",
};

function DetailedTruck() {
    const {id} = useParams();

    const [data, setData] = useState({})
    const [brand, setBrand] = useState({})

    useEffect(()=>{
        const  getTruck = async () => {
            const res = await fetch(`/api/cars/${id}`)
                .then((response) => {
                    return response.json();
                }).catch(()=>{
                    return {resultCount:0, results:[]}
                })
            console.log(res)
            setData(res)

            const resBrand = await fetch(`/api/brands/${res.brand}`)
                .then((response) => {
                    return response.json();
                }).catch(()=>{
                    return {resultCount:0, results:[]}
                })
            console.log(resBrand)
            setBrand(resBrand)
        }

        getTruck();
    },[])

    return (
        <>
            <Breadcrumbs style={cardStyle} aria-label='breadcrumb'>
                <Link style={{textDecoration: 'none'}} to='/'>Rent</Link>
                <Link style={{textDecoration: 'none'}} to={`/rent/${id}`}>{brand.title + " " + data.title}</Link>
            </Breadcrumbs>
            <Card key={data.title} style={cardStyle}>
                <Card.Img style={cardImage} className="img-fluid" variant="top" src={data.photo} height={100} width={100}/>
                <Card.Body>
                    <Card.Title>{brand.title + " " + data.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Объём: {data.capacity}м<sup>3</sup></ListGroup.Item>
                    <ListGroup.Item>Стоимость: {data.price}р.</ListGroup.Item>
                    <ListGroup.Item>Страна: {brand.country}</ListGroup.Item>
                    <ListGroup.Item>Описание: {data.description}</ListGroup.Item>
                    <ListGroup.Item>Грузоподъемность: {data.payload} т.</ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    );
}

export default DetailedTruck;