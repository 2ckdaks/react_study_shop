import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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
  let { id } = useParams();
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
    console.log(1);
    //return을 쓰면 리턴문 안에있는게 실행 된 다음 console.log(1) 실행됨
    //코드실행전 클린업할게있을때 유용
    return setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  return (
    <div className='container'>
      <Box className='row'>
        <div className='col-md-6'>
          <img
            src='https://codingapple1.github.io/shop/shoes1.jpg'
            width='100%'
          />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <YellowBtn bg='skyblue' className='btn btn-danger'>
            주문하기
          </YellowBtn>
        </div>
      </Box>
      {alert == true ? (
        <div className='alert alert-warning'>2초이내 구매시 할인</div>
      ) : null}
    </div>
  );
}
