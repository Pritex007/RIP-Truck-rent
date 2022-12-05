import React, {useContext, useEffect} from 'react';
import {Card} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useParams} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import {Context} from "../Supporting Files/context";
import {LOAD_TRUCK} from "../Supporting Files/reducer";
import {createRoot} from "react-dom/client";


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

    const {
        fetchTruck,
        fetchBrand,
        dispatch,
        state
    } = useContext(Context)

    useEffect(() => {
        fetchTruck(id).then(truck => {
            fetchBrand(truck.brand).then(brand => {
                dispatch({
                    type: LOAD_TRUCK,
                    payload: {
                        truck: truck,
                        brand: brand
                    }
                })
                createRoot()
            })
        })
        return () => {

        }
    },[])

   /* useEffect(()=>{
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
    },[])*/

    if (!state.truck || !state.brand) {
        return <></>
    } else {
        return (
            <>
                <Breadcrumbs style={cardStyle} aria-label='breadcrumb'>
                    <Link style={{textDecoration: 'none'}} to='/'>Rent</Link>
                    <Link style={{textDecoration: 'none'}}
                          to={`/rent/${id}`}>{state.brand.title + " " + state.truck.title}</Link>
                </Breadcrumbs>
                <Card style={cardStyle}>
                    <Card.Img style={cardImage} className="img-fluid" variant="top" src={state.truck.photo} height={100}
                              width={100}/>
                    <Card.Body>
                        <Card.Title>{state.brand.title + " " + state.truck.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Объём: {state.truck.capacity}м<sup>3</sup></ListGroup.Item>
                        <ListGroup.Item>Стоимость: {state.truck.price}р.</ListGroup.Item>
                        <ListGroup.Item>Страна: {state.brand.country}</ListGroup.Item>
                        <ListGroup.Item>Описание: {state.truck.description}</ListGroup.Item>
                        <ListGroup.Item>Грузоподъемность: {state.truck.payload} т.</ListGroup.Item>
                    </ListGroup>
                </Card>
            </>
        );
    }
}

export default DetailedTruck;