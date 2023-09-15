import { Bootpay } from "@bootpay/client-js";
import { useEffect, useState } from "react";

function Payment() {
    const [data, setData] = useState({});
    const requestPayment = async (event) => {
        const parsed = JSON.parse(event.data);

        try {
            const response = await Bootpay.requestPayment({
                application_id: parsed.application_id,
                price: parsed.price,
                order_name: parsed.order_name,
                order_id: parsed.order_id,
                pg: "나이스페이",
                tax_free: 0,
                user: {
                    // username: parsed.user.username || "알테구",
                    username: "알테구",
                    phone: parsed.user.phone,
                },
                extra: {
                    open_type: "iframe",
                    card_quota: "0,2,3",
                    escrow: false,
                    // separately_confirmed:true
                },
            });

            console.log(response);

            switch (response.event) {
                case "issued":
                    // 가상계좌 입금 완료 처리
                    response.handle = "issued";
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify(response)
                    );
                    break;
                case "done":
                    response.handle = "done";
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify(response)
                    );
                    // 결제 완료 처리
                    break;
                case "confirm": //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
                    console.log(response.receipt_id);
                    /**
                     * 1. 클라이언트 승인을 하고자 할때
                     * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
                     */
                    const confirmedData = await Bootpay.confirm(); //결제를 승인한다
                    if (confirmedData.event === "done") {
                        //결제 성공
                    }

                    /**
                     * 2. 서버 승인을 하고자 할때
                     * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
                     * Bootpay.destroy(); //결제창을 닫는다.
                     */
                    break;
            }
        } catch (e) {
            console.log(e.message);
            // alert(JSON.stringify(e));
            switch (e.event) {
                case "cancel":
                    // 사용자가 결제창을 닫을때 호출
                    e.handle = "cancel";
                    window.ReactNativeWebView.postMessage(JSON.stringify(e));
                    break;
                case "error":
                    // 결제 승인 중 오류 발생시 호출
                    console.log(e.error_code);
                    e.handle = "error";
                    window.ReactNativeWebView.postMessage(JSON.stringify(e));
                    break;
            }
        }
    };

    useEffect(() => {
        document.addEventListener("message", requestPayment);
    }, []);

    const sendMessage = (str) => {
        window.ReactNativeWebView.postMessage(str);
    };

    return <div></div>;
}

export default Payment;
