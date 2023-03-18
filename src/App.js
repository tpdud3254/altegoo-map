import { Route, Routes } from "react-router-dom";
import Map from "./screens/Map";
import Map2 from "./screens/Map2";
import Payment from "./screens/Payment";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/map" element={<Map />} />
                <Route path="/map2" element={<Map2 />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    );
}

export default App;
