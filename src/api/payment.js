import api from "./apiClient"
export const checkout=(orderid)=>api.post(`/payments/new/${orderid}`);

export const verify=(orderId,paymentId,signature)=>api.post("/payments/verify",{orderId,paymentId,signature});