import React, { useEffect, useState } from "react";
import VisitorLayout from "@/components/VisitorLayout";
import RadioGroup from "@/components/RadioGroup";
import TextBox from "@/components/TextBox";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import { useUser } from "@/contexts/userContext";
import { useCart } from "@/contexts/cartContext";
import { useGeneralContext } from "@/contexts/generalContext";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import { createOrderWithPayment } from "@/services/orderService";
import {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  InternalServerException,
  NotFoundException,
  UnexpectedException,
} from "@/utils/exceptions";

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("Visa");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const { user } = useUser();
  const { cartItems, setCartItems } = useCart();
  const { showAlertBox, hideAlertBox } = useGeneralContext();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }

    if (cartItems.length === 0) {
      router.push("/products");
    }
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      return;
    }

    const orderObject = {
      userId: user.id,
      items: cartItems.map((item) => ({
        productId: item.ID,
        quantity: item.qty,
        price: item.price,
      })),
      paymentType: paymentMethod,
    };

    setLoading(true);

    try {
      await createOrderWithPayment(orderObject);
      showAlertBox({
        isVisible: true,
        title: "Order Successful",
        body: "Your order has been placed successfully.",
        buttonStructure: 0,
        button1OnClick: () => {
          hideAlertBox();
          setCartItems([]);
          router.push("/products");
        },
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        showAlertBox({
          isVisible: true,
          title: "Unauthorized",
          body: "You are not authorized to perform this action.",
          buttonStructure: 0,
        });
      } else if (error instanceof ForbiddenException) {
        showAlertBox({
          isVisible: true,
          title: "Forbidden",
          body: "You do not have permission to perform this action.",
          buttonStructure: 0,
        });
      } else if (error instanceof BadRequestException) {
        showAlertBox({
          isVisible: true,
          title: "Bad Request",
          body: "There was an error with your request.",
          buttonStructure: 0,
        });
      } else if (error instanceof InternalServerException) {
        showAlertBox({
          isVisible: true,
          title: "Server Error",
          body: "An internal server error occurred. Please try again later.",
          buttonStructure: 0,
        });
      } else if (error instanceof NotFoundException) {
        showAlertBox({
          isVisible: true,
          title: "Not Found",
          body: "The requested resource was not found.",
          buttonStructure: 0,
        });
      } else {
        showAlertBox({
          isVisible: true,
          title: "Unexpected Error",
          body: "An unexpected error occurred. Please try again later.",
          buttonStructure: 0,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <VisitorLayout>
      <div className="p-4 min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-green font-bold text-lg">Payment Options</h1>
        <RadioGroup
          value={paymentMethod}
          options={[
            { value: "Cash on Delivery", label: "Cash on Delivery" },
            { value: "Visa", label: "Visa/Master" },
            { value: "QR Pay", label: "QR Pay" },
          ]}
          onChange={setPaymentMethod}
          caption=""
          alignment="center"
          containerClassName="mt-6"
        />
        {paymentMethod === "Visa" && (
          <div className="flex flex-col justify-center items-center mt-4">
            <TextBox
              value={cardNumber}
              placeholder="Card Number"
              onChange={setCardNumber}
              maxCharCount={16}
              width="w-60"
            />
            <div className="flex justify-center items-center space-x-4 mt-4">
              <TextBox
                value={expiryDate}
                placeholder="Expiry Date"
                onChange={setExpiryDate}
                maxCharCount={5}
                width="w-28"
              />
              <TextBox
                value={cvv}
                placeholder="CVV"
                onChange={setCvv}
                maxCharCount={3}
                width="w-28"
              />
            </div>
          </div>
        )}
        {paymentMethod === "QR Pay" && (
          <div className="flex justify-center my-2">
            <img src={`/img/qr.svg`} />
          </div>
        )}
        {paymentMethod === "Cash on Delivery" && (
          <TextArea
            value={shippingAddress}
            placeholder="Enter your shipping address"
            onChange={setShippingAddress}
            width="w-72"
            containerClassName="mt-4"
          />
        )}
        <Button
          caption="Proceed"
          onClick={handleCheckout}
          buttonClassName="mt-6"
        />
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </VisitorLayout>
  );
};

export default PaymentPage;
