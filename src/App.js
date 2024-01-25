import "./App.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.js";
import {
  createContext,
  lazy,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  json,
} from "react-router-dom";
import axios from "axios";
// import Detail from "./routes/Detail.js";
// import Cart from "./routes/Cart";
import { useQuery } from "react-query";

//메인페이지에서 보이지않는 컴포넌트를 굳이 바로 import할필요없어 lazy하게 임포트
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

// export let Context1 = React.createContext();
export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  // 최근본상품등 웹브라우저내 localstorage에 저장/출력 문법
  let obj = { name: "Lee" };
  localStorage.setItem("data", JSON.stringify(obj));
  let out = localStorage.getItem("data");
  console.log(JSON.parse(out));

  useEffect(() => {
    let getItem = localStorage.getItem("watched");
    //이미 데이터가있으면 아래 코드 실행하지 않기
    if (!getItem) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  // react-query로 실시간으로 데이터 받아오는 코드(일정간격 반복 실행, 간격조절 가능) + 로딩/에러 상태 출력가능
  useQuery("작명", async () => {
    const a = await axios.get("https://codingapple1.github.io/userdata.json");
    return console.log(a.data);
  });

  return (
    <div className="App">
      <Study />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* routes안에 컴포넌트를 보통 전부 lazy임포트하기때문에 로딩 화면 추가 */}
      <Suspense fallback={<div>loading</div>}>
        {/* 라우터를 이용하여 페이지 나누기 */}
        {/* onClick시 다음페이지 이전페이지등 다양한 기능 사용 가능 */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* 이미지 속성/스타일은 prop전송또한 가능 */}
                <div className="main-bg">{/* <img src='/bg.png' /> */}</div>
                <div className="container">
                  <div className="row">
                    {shoes.map(function (a, i) {
                      return <Card shoes={shoes[i]} i={i + 1} key={i} />;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    // axios라이브러리를 사용하여 서버와 통신 가능
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        console.log(결과.data);
                        let copy = [...shoes];
                        copy = [...shoes, ...결과.data];
                        setShoes(copy);
                      })
                      .catch(() => {
                        console.log("실패함");
                      });
                  }}
                >
                  get요청 버튼
                </button>
                {/* <button onClick={()=>{
                axios.post(
                  'api', {name : 'kim'}
                  )
              }}>post요청 버튼</button> */}
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div>
                어바웃페이지임<Outlet></Outlet>
              </div>
            }
          >
            <Route path="member" element={<div>멤버들</div>} />
            <Route path="location" element={<div>회사위치</div>} />
          </Route>
          {/* 상세페이지를 위한 URL파라미터 사용 */}
          <Route
            path="/detail/:id"
            element={
              // context api를 사용하여 props전송없이 자식 컴포넌트로 스테이트 전송
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart />} />
          {/* 만들어둔 라우트페이지를 제외한 모든페이지에 출력 404페이지 */}
          <Route path="*" element={<div>없는페이지임</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

//useTransition, useDeferredValue 학습
function Study() {
  let [name, setName] = useState("");
  console.log(name);
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(state); //얘도 startTransition과 같은 기능을함 늦게처리하고싶은 스테이트를 안에 넣어서 실행

  let a = new Array(10000).fill(0);

  return (
    <div>
      <input
        onChange={(e) => {
          //성능저하원인에다가 사용시 코드시작 시점을 뒤로 늦춰 성능이 향상됨 (카드 빚 돌려막기 같음)
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {/* isPending은 startTransition이 처리중일때 true가 됨으로 그동안 로딩중같은 내용 출력가능 */}
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{name}</div>; //useDeferredValue를 사용하려면 {name} 대신 {state}사용
          })}
    </div>
  );
}

export default App;
