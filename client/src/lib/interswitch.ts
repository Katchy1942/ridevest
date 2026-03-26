const APP_URL = import.meta.env.VITE_APP_URL;

type InterswitchPaymentParams = {
   amount: string;
   customerEmail: string;
   customerName: string;
   customerId: string;
   trackingId: string;
   onComplete: (response: any) => void;
};

export const initiateInterswitchPayment = ({
   amount,
   customerEmail,
   customerName,
   customerId,
   trackingId,
   onComplete,
}: InterswitchPaymentParams) => {
   const paymentParameters = {
      merchant_code: "MX6072",
      pay_item_id: "9405967",
      amount: amount,
      txn_ref: trackingId,
      customer_id: customerId,
      customer_email: customerEmail,
      customer_name: customerName,
      site_redirect_url: `${APP_URL}/payment-response?txnref=${trackingId}&amount=${amount}`,
      currency: "566",
      mode: "TEST",
      onComplete: onComplete,
   };

   if ((window as any).webpayCheckout) {
      (window as any).webpayCheckout(paymentParameters);
   } else {
      console.error("Interswitch script not loaded");
   }
};
