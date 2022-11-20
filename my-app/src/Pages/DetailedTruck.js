import React from 'react';
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

    const data = getData()[id]

    return (
        <>
            <Breadcrumbs style={cardStyle} aria-label='breadcrumb'>
                <Link style={{textDecoration: 'none'}} to='/'>Rent</Link>
                <Link style={{textDecoration: 'none'}} to={`/rent/${id}`}>{data.brand + " " + data.name}</Link>
            </Breadcrumbs>
            <Card key={data.name} style={cardStyle}>
                <Card.Img style={cardImage} className="img-fluid" variant="top" src={data.image} height={100} width={100}/>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Объём: {data.capacity}м<sup>3</sup></ListGroup.Item>
                    <ListGroup.Item>Стоимость: {data.price}р.</ListGroup.Item>
                    <ListGroup.Item>Страна: {data.country}</ListGroup.Item>
                    <ListGroup.Item>Описание: {data.description}</ListGroup.Item>
                    <ListGroup.Item>Грузоподъемность: {data.payload} т.</ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    );
}

export default DetailedTruck;