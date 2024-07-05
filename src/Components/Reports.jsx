import React, { useState } from 'react';
import { ProgressBar, Container, Row, Col, Card, Table } from 'react-bootstrap';

const Reports = () => {
  const [child, setChild] = useState();
  const [data, setData] = useState([]);
  setChild(sessionStorage.getItem('childId'));
  const getData = async () => {
    try {
      const token = sessionStorage.getItem('logintoken');
      const response = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/${child}/gamesplayed`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card>
            {/* <Card.Img variant="top" src={user.avatar} alt="Avatar" className="img-fluid rounded-circle mt-3 mx-auto" style={{ width: '150px' }} /> */}
            <Card.Body className="text-center">
              <Card.Title>{child.name}</Card.Title>
              <Card.Text>
                <strong>Caretaker:</strong> {child.caretakerName}<br />
                <strong>Parent:</strong> {child.parentName}<br />
                <strong>Games Played:</strong> {child.gamesPlayed}
              </Card.Text>
              <ProgressBar now={child.progress} label={`${child.progress}%`} />
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
                  <th>Game Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {child.recentActions.map((action, index) => (
                  <tr key={index}>
                    <td>{action.GameId}</td>
                    <td>{action.Game_Name}</td>
                    <td>{action.Status}</td>
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
