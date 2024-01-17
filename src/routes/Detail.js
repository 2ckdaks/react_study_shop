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
    </div>
  );
}
