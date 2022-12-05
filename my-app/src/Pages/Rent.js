import React, {useContext, useEffect} from 'react';
import {Col, Row, Button} from "react-bootstrap";
import TruckCard from "../Components/TruckCard";
import IntervalSelector from "../Components/IntervalSelector";
import {LOAD_TRUCKS, SWITCH_ID} from "../Supporting Files/reducer";
import {Context} from "../Supporting Files/context";
import {checkUserIsAuth} from "../App";
import {postOrder} from "../Supporting Files/NetworkRequests";

const TableBlockStyle = {
    margin: "20px 15%",
    textAlign: 'center',
}

const TableCardStyle = {
    display: "inline-block",
    margin: "8px 8px 8px 0px",
}

function Rent() {
    const {
        fetchTrucks,
        fetchBrands,
        state,
        dispatch
    } = useContext(Context)

    const tryPost = () => {
        if (state.id != 0) {
            postOrder({
                price: state.trucks.find(element => element.pk == state.selectedTruck).price,
                address_take: "Москва",
                time: state.time,
                car: state.selectedTruck,
                user: state.id
            })
        } else {
            alert("Авторизируйтесь, чтобы оформить заказ")
        }
    }

    useEffect(()=>{
        fetchTrucks().then(trucks => {
            fetchBrands(trucks).then(brands => {
                dispatch({
                    type: LOAD_TRUCKS,
                    payload: {
                        trucks: trucks,
                        brands: brands
                    }
                })
            })
        })
    },[])

    useEffect(()=>{
    },[state])

    return (
        <>
            <IntervalSelector/>
            <Row className="g-4" style={TableBlockStyle}>
                {state.trucks.map((item, index)=>{
                    console.log(state.selectedTruck)
                    return<Col>
                        <TruckCard
                            key={item.pk}
                            id={item.pk}
                            name={item.title}
                            price={item.price}
                            brand={state.brands[index]}
                            capacity={item.capacity}
                            image={item.photo}
                            isSelected={state.selectedTruck == item.pk}/>
                    </Col>
                })}
            </Row>
            <Button variant="primary"
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "160px",
                        height: "80px",
                        fontSize: "30px"}}
                    onClick={tryPost}
            >
                Заказать
            </Button>
        </>
    );
}

export default Rent;