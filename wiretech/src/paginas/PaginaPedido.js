import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErroCarregamento from "../componentes/ErroCarregamento";

export default function PaginaPedido() {
  const lastTransactionData = JSON.parse(
    localStorage.getItem("ultimaTransacao")
  );
  const aprovado = localStorage.getItem("aprovado");

  return (
    <div>
      <Helmet>
        <title>Ultimo Pedido</title>
      </Helmet>
      <h1 className="my-3">Pedido</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Envio</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {lastTransactionData.fullName} <br />
                <strong>Endereço: </strong> {lastTransactionData.address} -
                {lastTransactionData.city} - CEP {lastTransactionData.cep} -
                {lastTransactionData.pais}
                &nbsp; &nbsp;
                <br />
                {123 && 123 && (
                  <a
                    target="_new"
                    href={`https://maps.google.com?q=${123},${123}`}
                  >
                    Mostrar no mapa
                  </a>
                )}
              </Card.Text>
              {aprovado === "1" ? (
                <ErroCarregamento variant="danger">
                  Aguardando Entrega
                </ErroCarregamento>
              ) : (
                <ErroCarregamento variant="danger">
                  Aguardando confirmação
                </ErroCarregamento>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Método:</strong> {lastTransactionData.metodoPagamento}
              </Card.Text>
              {aprovado === "1" ? (
                <ErroCarregamento variant="success">Aprovado</ErroCarregamento>
              ) : (
                <ErroCarregamento variant="danger">
                  Aguardando aprovação da loja
                </ErroCarregamento>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {lastTransactionData.carrinhoitems2.carrinhoItems.map(
                  (item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.imagem_produto_path}
                            alt={item.nome_produto}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{" "}
                          <Link to={`/produto/${item.link_url}`}>
                            {item.nome_produto}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantidade}</span>
                        </Col>
                        <Col md={3}>${item.valor_produto}</Col>
                      </Row>
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Resumo do pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      ${lastTransactionData.carrinhoitems2.valor_produto}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Frete</Col>
                    <Col>
                      {lastTransactionData.pais === "Brasil"
                        ? "R$ 15.00"
                        : "R$ 100.00"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>
                        ${lastTransactionData.carrinhoitems2.preco_total}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
