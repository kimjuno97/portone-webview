window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get("storeId");
  const channelKey = params.get("channelKey");
  const paymentId = params.get("paymentId");
  const orderName = params.get("orderName");
  const totalAmount = params.get("totalAmount");
  const currency = params.get("currency");
  const payMethod = params.get("payMethod");

  const script = document.createElement("script");

  // 스크립트 소스 설정
  script.src = "https://cdn.portone.io/v2/browser-sdk.js";

  script.onload = () => {
    // 스크립트 로드 완료 시 Flutter에 알림
    window.successLoad.postMessage("successLoad");

    setTimeout(() => {
      requestPortOnePayment({
        storeId,
        channelKey,
        paymentId,
        orderName,
        totalAmount,
        currency,
        payMethod,
      });
    }, 1000);
  };
  document.head.appendChild(script);
};

async function requestPortOnePayment(paymentData) {
  try {
    /// redirect 방식 사용시 return값 없음.
    await PortOne.requestPayment({
      storeId: paymentData.storeId,
      channelKey: paymentData.channelKey,
      paymentId: paymentData.paymentId,
      orderName: paymentData.orderName,
      totalAmount: paymentData.totalAmount,
      currency: paymentData.currency,
      payMethod: paymentData.payMethod,
      redirectUrl: "https://kimjuno97.github.io/portone-webview/redirect",
    });
  } catch (error) {
    // 에러 발생 시 Flutter에 전송
    window.paymentError.postMessage(
      `${error.message} \n paymentData: ${paymentData}`
    );
  }
}
