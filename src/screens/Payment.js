import { Bootpay } from "@bootpay/client-js";
import { useEffect } from "react";

function Payment() {
    const requestPayment = async () => {
        try {
            const response = await Bootpay.requestPayment({
                application_id: "641080ba755e27001c692292",
                price: 1000,
                order_name: "테스트결제",
                order_id: "TEST_ORDER_ID",
                pg: "나이스페이",
                // method: "가상계좌",
                tax_free: 0,
                user: {
                    id: "회원아이디",
                    username: "회원이름",
                    phone: "01000000000",
                    email: "test@test.com",
                },
                items: [
                    {
                        id: "item_id",
                        name: "테스트아이템",
                        qty: 1,
                        price: 1000,
                    },
                ],
                extra: {
                    open_type: "iframe",
                    card_quota: "0,2,3",
                    escrow: false,
                },
            });

            console.log(response);

            switch (response.event) {
                case "issued":
                    // 가상계좌 입금 완료 처리
                    break;
                case "done":
                    console.log(response);
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
            switch (e.event) {
                case "cancel":
                    // 사용자가 결제창을 닫을때 호출
                    console.log(e.message);
                    break;
                case "error":
                    // 결제 승인 중 오류 발생시 호출
                    console.log(e.error_code);
                    break;
            }
        }
    };

    useEffect(() => {
        document.addEventListener("message", receiveMessage);
        requestPayment();
    }, []);

    const sendMessage = (str) => {
        window.ReactNativeWebView.postMessage(str);
    };

    const receiveMessage = (event) => {
        // alert("받은 데이터(Web) : " + event.data);
    };

    return <div></div>;
}

export default Payment;
