import { useState, useEffect } from "react";
import { Accordion, Row, Col, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Slider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getMarketAsync } from "../redux/marketSlice";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MatketItem from "./MatketItem";
 
function Mycards(props) {
  function valuetext(value) {
    return (
      <Row className="sldr">
        <Col className="text-left">&#x20AC; {value[0]}</Col>
        <Col style={{ textAlign: "right" }}> &#x20AC;{value[1]}</Col>
      </Row>
    );
  }
  const [value, setValue] = useState([0, 100]);
  const [query, setquery] = useState("");
  const [postn, setpostn] = useState("");
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const dispatch = useDispatch();
   const market=useSelector((state)=>state.market)

  const counts = [];
  market.forEach((x) => {
    counts[x.cardType] = (counts[x.cardType] || 0) + 1;
  });
  const countsPosition = [];
  market.forEach((x) => {
    countsPosition[x.position] = (countsPosition[x.position] || 0) + 1;
  });

  const getCategories = (e) => {
    setquery(e.target.innerText);
  };
  const getPosition = (e) => {
    setpostn(e.target.innerText);
  };
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(market.length / PER_PAGE);

  const handlePagination = (e, p) => {
    setPage(p);
  };

  useEffect(() => {
    dispatch(getMarketAsync());
  }, [dispatch]);

  return (
    <div>
      <section className="MycardBody" id="section-2">
        <Row>
          <Col xs={12} className="mycardHead">
            <div>MY CARDS</div>
          </Col>

          <Col className="mb-1 accordGrid" xs={12} sm={6} md={4} lg={3} xxl={2}>
            <div className="accord">
              <Accordion alwaysOpen flush className="accordinside">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Card Type</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className="listgrp" variant="flush">
                      <ListGroup.Item>
                        <span onClick={getCategories}>Gold</span>
                        <span> ({counts.Gold})</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span onClick={getCategories}>Silver</span>
                        <span> ({counts.Silver})</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span onClick={getCategories}>Bronze</span>
                        <span> ({counts.Bronze})</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Position</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className="listgrp" variant="flush">
                      <ListGroup.Item>
                        <span onClick={getPosition}>Goalkeeper</span>
                        <span> ({countsPosition.Goalkeeper})</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span onClick={getPosition}>Defender</span>
                        <span> ({countsPosition.Defender})</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span onClick={getPosition}>Midfielder</span>
                        <span> ({countsPosition.Midfielder})</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span onClick={getPosition}>Forward</span>
                        <span> ({countsPosition.Forward})</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Price</Accordion.Header>
                  <Accordion.Body>
                    <Box sx={{ width: 130 }}>
                      {valuetext(value)}
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                      />
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col className="mt-1 mb-1" xs={12} sm={6} md={8} lg={9} xxl={10}>
            <Row>
              {market
                .filter(
                  (mydt) =>
                    mydt.cardType.toLowerCase().includes(query.toLowerCase()) &&
                    mydt.position.toLowerCase().includes(postn.toLowerCase()) &&
                    mydt.price >= value[0] &&
                    mydt.price <= value[1]
                ).slice((page*PER_PAGE-PER_PAGE), (page*PER_PAGE))

                .map((todo) => (
                  <MatketItem  
                    key={todo.id}
                    id={todo.id}
                    photoUrl={todo.photoUrl}
                    price={todo.price}
                    cardType={todo.cardType}
                    name={todo.name}
                    position={todo.position}
                    team={todo.team}
                    attributes={todo.attributes}
                    

                  />
                ))}
            </Row>
            
            
          </Col>
          
        </Row>
        <Row className="mt-3 text-center">
              <Col><Stack spacing={2}>
       <Pagination   count={count} 
        page={page}
          onChange={handlePagination}
          />
      </Stack></Col>
            </Row>
      </section>
    </div>
  );
}

export default Mycards;
