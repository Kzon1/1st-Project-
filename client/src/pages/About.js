import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          A privacy policy tells your website users about your personal data collection practices. This website policy is often legally required and must include information about what type of personal data you collect, how it’s tracked, why you track it, how it gets used, and who it’s shared with or sold to. There are a bunch of different titles for this policy, like a privacy notice, a privacy clause, a privacy page, or even a privacy agreement. There are also a few ways to make one. You can write it yourself, use a privacy policy template, or use a privacy policy generator to make things really easy. What matters more than the title, though, is what’s inside the agreement. Make sure yours complies with the regulations outlined by any data privacy laws your business falls under. For example, the screenshot below shows general merchandise retailer Target’s privacy policy, which complies with the amended CCPA.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
