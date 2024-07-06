import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';

const Reports = () => {
  const [child, setChild] = useState(sessionStorage.getItem('childId'));
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState({});
  const [games, setGames] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [childFeedback, setChildFeedback] = useState('');

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
      // console.log('Games played response:', response.data);

      const res = await axios.get(`https://jwlgamesbackend.vercel.app/api/data/${child}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setChildData(res.data);
      console.log('Child data response:', res.data);

      const gamesRes = await axios.get('https://jwlgamesbackend.vercel.app/api/data/allgames');
      const gameresdata = gamesRes.data;
      setGames(gameresdata);
      // console.log('All games response:', gamesRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.put(`https://jwlgamesbackend.vercel.app/api/data/feedback/${child}`, {
        feedback: feedback
      }, {
        headers: {
          Authorization: `${sessionStorage.getItem('logintoken')}`
        }
      });
      setChildFeedback(response.data);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const getGameName = (gameId) => {
    const game = games.find((game) => game.gameId === gameId);
    return game ? game.gamename : '';
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
                <strong>Doctor:</strong> {childData.doctorName}<br />
                {/* Uncomment the below line if there's progress data in your response */}
                {/* <ProgressBar now={childData.progress} label={`${childData.progress}%`} /> */}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Header>Feedback</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Leave Feedback</Form.Label>
                  <Form.Control
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback"
                  />
                </Form.Group>
                <Button className="mt-3" variant="primary" onClick={handleSubmitFeedback}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Recent Actions</Card.Header>
            <Table hover>
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Tries</th>
                  <th>Timer</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {data.map((action, index) => (
                  <tr key={index}>
                    <td>{getGameName(action.gameId)}</td>
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
