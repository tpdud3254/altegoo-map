import { Route, Routes } from "react-router-dom";
import Map from "./screens/Map";
import Map2 from "./screens/Map2";
import Payment from "./screens/Payment";
import Certification from "./screens/Certification";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/certification" element={<Certification />} />
                <Route path="/map" element={<Map />} />
                <Route path="/map2" element={<Map2 />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    );
}

export default App;
