import { Route, Routes } from "react-router-dom";
import Map from "./screens/Map";
import Payment from "./screens/Payment";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/map" element={<Map />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    );
}

export default App;
