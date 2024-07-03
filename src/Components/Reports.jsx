import React from 'react';
import { ProgressBar, Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';

const Reports = () => {
  const user = {
    avatar: 'https://via.placeholder.com/150',
    name: 'Dummy',
    caretakerName: 'Ram',
    parentName: 'Rajesh',
    gamesPlayed: 5,
    progress: 40, 
    recentActions: [
      { GameId: '#12', Game_Name: 'Connecting Letters', Status: 'Completed' },
      { GameId: '#15', Game_Name: 'Sentence Verification', Status: 'Attempted' },
      { GameId: '#2', Game_Name: 'Shape Matching', Status: 'Completed' },
      { GameId: '#1', Game_Name: 'Animal Matching', Status: 'Attempted' },
      { GameId: '#7', Game_Name: 'Joining Shapes', Status: 'Completed' },
    ],
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={user.avatar} alt="Avatar" className="img-fluid rounded-circle mt-3 mx-auto" style={{ width: '150px' }} />
            <Card.Body className="text-center">
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>
                <strong>Caretaker:</strong> {user.caretakerName}<br />
                <strong>Parent:</strong> {user.parentName}<br />
                <strong>Games Played:</strong> {user.gamesPlayed}
              </Card.Text>
              <ProgressBar now={user.progress} label={`${user.progress}%`} />
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
                {user.recentActions.map((action, index) => (
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
