import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../sotre/userSlice";
import { increaseAge } from "../sotre/userSlice";
import { addCount } from "../store";
import { memo, useMemo, useState } from "react";

// memo를 사용해서 자식컴포넌트의 재렌더링 막기
// child라는 컴포넌트가 무거운거면 개꿀
let Child = memo(function () {
  console.log("버튼클릭시 얘도 재렌더링되나?");
  return <div>자식컴포넌트</div>;
});

function 무거운함수() {
  return "반복문 10억번 돌린결과";
}

export default function Cart() {
  let [count, setCount] = useState(0);
  let state = useSelector((state) => {
    return state;
  });
  // redux toolkit에서 등록한 스테이트 변경함수 실행을 위해 useDispatch로 감싸기 필수
  let dispatch = useDispatch();

  //useMemo사용시 컴포넌트 렌더링시 1회만 실행시켜줌
  //useEffect랑 똑같이 디펜던시도 사용가능 []
  //차이점으로는 실행시점 차이 useEffect는 html랜더링 이후 실행되지만 useMemo는 그전에 실행
  let result = useMemo(() => {
    return 무거운함수();
  }, []);

  console.log(state);

  return (
    <div>
      <Child />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        일부로 렌더링
      </button>
      {state.user.age}
      <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        ++
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.item.map((a, i) => {
            return (
              <tr key={i}>
                <td>{state.item[i].id}</td>
                <td>{state.item[i].name}</td>
                <td>{state.item[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.item[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
