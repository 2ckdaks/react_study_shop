import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { Context1 } from "./../App.js";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store";

// styled componets 사용
let Box = styled.div`
  padding: 20px;
  color: grey;
`;
let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
`;

export default function Detail(props) {
  let itemState = useSelector((state) => {
    return state.item;
  });
  // console.log(itemState);
  let dispatch = useDispatch();

  let { id } = useParams();
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);

  // context API로 전송받은 스테이트 사용
  let { 재고 } = useContext(Context1);

  let findItem = props.shoes.find((x) => x.id == id);

  useEffect(() => {
    //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
    // console.log(1);
    //return을 쓰면 리턴문 안에있는게 실행 된 다음 console.log(1) 실행됨
    //코드실행전 클린업할게있을때 유용
    return setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let getItem = localStorage.getItem("watched");
    getItem = JSON.parse(getItem);
    getItem.push(findItem.id);
    getItem = new Set(getItem);
    getItem = Array.from(getItem);
    localStorage.setItem("watched", JSON.stringify(getItem));
  }, []);

  return (
    <div className="container">
      <Box className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          {/* 스타일컴포넌트의 이너스타일또한 porps전송으로 적용 가능 */}
          <YellowBtn
            bg="skyblue"
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({ id: 1, name: props.shoes[id].title, count: 1 })
              );
            }}
          >
            주문하기
          </YellowBtn>
        </div>
      </Box>
      {alert == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [탭]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
