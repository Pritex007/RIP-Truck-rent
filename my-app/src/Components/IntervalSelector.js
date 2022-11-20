import {Form} from "react-bootstrap";

const dateSelectorBlock = {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px'
};

const dateSelectorField = {
    width: '30%'
};

function IntervalSelector() {
    return (
        <div>
            <Form className="row" style={dateSelectorBlock}>
                <Form className="col-6" style={dateSelectorField}>
                    <Form.Label>Дата заказа</Form.Label>
                    <Form.Control type="dateTime-local" placeholder="Enter email" />
                </Form>
                <Form className="col-6" style={dateSelectorField}>
                    <Form.Label>Дата завершения</Form.Label>
                    <Form.Control type="dateTime-local" placeholder="Password" />
                </Form>
            </Form>
        </div>
    );
}

export default IntervalSelector;