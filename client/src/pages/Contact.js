import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "./../components/Layout/Layout";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 " >
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          For any questions or information about the product, please call anytime we are ready to serve 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : kzonluxury@lxry.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0233-2134121
          </p>
          <p className="mt-3">
            <BiSupport /> : 1999-9999-9999 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
