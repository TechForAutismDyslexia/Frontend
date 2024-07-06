import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col, Card, Table } from 'react-bootstrap';

const Reports = () => {
  const [child, setChild] = useState(sessionStorage.getItem('childId'));
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState({});

  useEffect(() => {
    if (child) {
      getData();
    }
  }, [child]);

  const getData = async () => {
    try {
      const token = sessionStorage.getItem('logintoken');
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/${child}/gamesplayed`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setData(response.data);

      const res = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/${child}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setChildData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card>
            {/* Uncomment and adjust the below line if there's an avatar URL in your data */}
            {/* <Card.Img variant="top" src={childData.avatar} alt="Avatar" className="img-fluid rounded-circle mt-3 mx-auto" style={{ width: '150px' }} /> */}
            <Card.Body className="text-center">
              <Card.Title>{childData.name}</Card.Title>
              <Card.Text>
                <strong>Caretaker:</strong> {childData.caretakerName}<br />
                <strong>Parent:</strong> {childData.parentDetails}<br />
                {/* Uncomment the below line if there's progress data in your response */}
                {/* <ProgressBar now={childData.progress} label={`${childData.progress}%`} /> */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Recent Actions</Card.Header>
            <Table hover>
              <thead>
                <tr>
                  <th>Game ID</th>
                  <th>Tries</th>
                  <th>Timer</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {data.map((action, index) => (
                  <tr key={index}>
                    <td>{action.gameId}</td>
                    <td>{action.tries}</td>
                    <td>{action.timer}</td>
                    <td>{action.status ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
