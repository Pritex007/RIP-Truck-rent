import Table from 'react-bootstrap/Table';
import {Col} from "react-bootstrap";
import TruckCard from "../Components/TruckCard";
import React, {useContext, useEffect} from "react";
import {Context} from "../Supporting Files/context";
import {useParams} from "react-router-dom";
import {LOAD_ORDERS} from "../Supporting Files/reducer";

function History() {
    const {id} = useParams()

    const {
        fetchOrders,
        dispatch,
        state
    } = useContext(Context)

    useEffect(()=>{
        fetchOrders(id).then(orders => {
            console.log("fetchOrders")
            console.log(orders)
            dispatch({
                type: LOAD_ORDERS,
                payload: { orders: orders }
            })
        })
    }, [])


    if (state.isAuthenticated) {
        return (
            <Table striped bordered hover style={{
                width: "60%",
                textAlign: "center",
                margin: "24px auto"
            }}>
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Стоимость р.</th>
                    <th>Дата заказа</th>
                </tr>
                </thead>
                <tbody>
                {state.orders.map((item, index) => {
                    return <tr>
                        <th>{index+1}</th>
                        <th>{item.price}</th>
                        <th>{(new Date(item.time)).toLocaleDateString()}</th>
                    </tr>
                })}
                </tbody>
            </Table>
        );
    } else {
        return (<h2 style={{
            textAlign: "center",
            marginTop: "16px"
        }}>Авторизируйтесь, чтобы посмотреть список покупок</h2>)
    }
}

export default History;