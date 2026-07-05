import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="disclaimer-container">
      <style jsx>{`
        .disclaimer-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 50px;
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.8;
          color: #000;
          background: white;
        }

        .disclaimer-container blockquote {
          margin: 0;
          padding: 0;
        }

        .disclaimer-container .underline {
          text-decoration: underline;
        }

        .disclaimer-container h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 30px 0 20px 0;
          text-align: left;
          font-family: 'Times New Roman', Times, serif;
        }

        .disclaimer-container p {
          margin: 16px 0;
          font-size: 18px;
          text-align: justify;
        }

        .disclaimer-container .terms-list {
          list-style: none;
          padding-left: 30px;
          margin: 20px 0;
          counter-reset: item;
        }

        .disclaimer-container .terms-list li {
          position: relative;
          padding-left: 30px;
          margin-bottom: 14px;
          font-size: 18px;
          text-align: justify;
          line-height: 1.8;
        }

        .disclaimer-container .terms-list li::before {
          position: absolute;
          left: -15px;
        }

        .disclaimer-container .terms-list li:nth-child(1)::before { content: "1."; }
        .disclaimer-container .terms-list li:nth-child(2)::before { content: "2."; }
        .disclaimer-container .terms-list li:nth-child(3)::before { content: "3."; }
        .disclaimer-container .terms-list li:nth-child(4)::before { content: "4."; }
        .disclaimer-container .terms-list li:nth-child(5)::before { content: "5."; }
        .disclaimer-container .terms-list li:nth-child(6)::before { content: "6."; }
        .disclaimer-container .terms-list li:nth-child(7)::before { content: "7."; }
        .disclaimer-container .terms-list li:nth-child(8)::before { content: "8."; }
        .disclaimer-container .terms-list li:nth-child(9)::before { content: "9."; }
        .disclaimer-container .terms-list li:nth-child(10)::before { content: "10."; }

        .disclaimer-container .bold {
          font-weight: 700;
        }

        .disclaimer-container .underline-text {
          text-decoration: underline;
        }

        .disclaimer-container .mark-text {
          background-color: #FFFF00;
          padding: 2px 5px;
          font-weight: 700;
        }

        .disclaimer-container .accent-bg {
          background-color: #FFD700;
          padding: 2px 5px;
        }

        .disclaimer-container .signature-section {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #000;
          text-align: right;
        }

        .disclaimer-container .signature-section .mark {
          background-color: #FFFF00;
          padding: 2px 8px;
          font-weight: 700;
        }

        .disclaimer-container .acronyms {
          margin-top: 30px;
          padding: 20px 30px;
          background: #f9f9f9;
          border-left: 4px solid #333;
        }

        .disclaimer-container .acronyms p {
          margin: 8px 0;
          font-size: 17px;
        }

        .disclaimer-container .acronyms .acronym {
          font-weight: 700;
        }

        .disclaimer-container .separator {
          text-align: center;
          font-size: 24px;
          letter-spacing: 5px;
          margin: 25px 0;
          color: #333;
        }

        @media (max-width: 768px) {
          .disclaimer-container {
            padding: 20px;
          }
          .disclaimer-container h1 {
            font-size: 22px;
          }
          .disclaimer-container p,
          .disclaimer-container .terms-list li {
            font-size: 16px;
          }
        }
      `}</style>

      <blockquote>
        <p><span className="underline">[Disclaimer]</span></p>
      </blockquote>

      <h1>Terms and Conditions between the End Users and the <span className="underline">Radiant InfoTech Nepal Pvt. Ltd</span></h1>

      <p>
        The relationship between <span className="underline">Radiant InfoTech Nepal Pvt. Ltd</span> and the Customer (Individual /Institutional) is governed by the <span className="underline">Electronic Transaction Act 2064</span>, except where the following general terms and conditions apply and are subject to any further agreement inwriting.
      </p>

      <p>
        <strong>DSC</strong> means authentication of any electronic record by a subscriber by means of electronic methods or procedures in accordance with the provisions of Licensed <strong>ICA in Nepal.</strong>
      </p>

      <ul className="terms-list">
        <li>
          As a <strong>CA, Radiant InfoTech Nepal Pvt. Ltd.</strong> will verify the identity, issues <strong>Digital Signature and Certificate,</strong> and maintain the <strong>CRL.</strong>
        </li>
        <li>
          Subscriber is an individual entity or institution that owns and possesses a <strong>DSC</strong> in his/her name.
        </li>
        <li>
          The <strong>DSC</strong> is being used for the purpose permitted for the corresponding <strong>Class</strong> of the <strong>Certificate</strong> only.
        </li>
        <li>
          Authenticating transactions on Personal usage by way of <strong>DSC</strong> using the PKI technology is a major feature available to the users.
        </li>
        <li>
          It is the <strong>User or Company&apos;s</strong> responsibility to purchase the <strong>DSC</strong> from an authorized <strong>CA</strong> and renew the <strong>DSC</strong> in case of any expiry or changes.
        </li>
        <li>
          In case of renewal of the <strong>DSC</strong> on account of expiry of the same or in case of <strong>Revocation</strong> and <strong>Reissuance</strong> on account of loss, the <strong>Subscriber</strong> will be needed to get in touch with mentioned offices.
        </li>
        <li>
          The <strong>DSC</strong> is being used for the purpose permitted for the corresponding <strong>Class</strong> of the <strong>Certificate</strong> only.
        </li>
        <li>
          Wrong use of the <strong>DSC</strong> or its services shall be liable to proceed with <strong>civil</strong> and <strong>criminal</strong> consequences and shall be subjected to penalties and punishment under the rule of the <strong>Electronic Transaction Act, 2064.</strong>
        </li>
        <li>
          Subscriber will frilly undertake the process; publish certificate practice of the <strong>CA</strong> endorsed by <strong>OCC.</strong>
        </li>
        <li>
          The terms of an end user license agreement accompanying particular <strong>DSC</strong> usage shall supersede the terms presented above.
        </li>
      </ul>

      <p>
        <strong>I accept and agree to use the Digital Signature and Certificate governed by the license agreement term of CA.</strong>
      </p>

      <div className="separator">-----------------------------------------</div>

      <div className="signature-section">
        <span className="mark">[Subscriber/Official Seal and Signature]</span>
      </div>

      <div className="acronyms">
        <p>
          <span className="acronym">Digital Signature</span>: A <strong>digital signature</strong> is an electronic form of a signature that can be used to authenticate the identity of the sender of a message or the signer of a document, and also ensure that the original content of the message or document that has been sent is unchanged.
        </p>
        <p>
          <span className="acronym">CA</span>: <strong>Certification Authority</strong> is an entity that issues digital certificates. A digital certificate certifies the ownership of a public key by the named subject of the certificate. A trusted third-party <strong>organization or company</strong> that issues <strong>Digital Certificates</strong> is used to create <strong>Digital Signatures</strong> and <strong>Public-Private key pairs.</strong>
        </p>
        <p>
          <span className="acronym">RA</span>: A <strong>Registration Authority</strong> is an authority in a network that verifies user requests for a <strong>Digital Certificate</strong> and tells the <strong>CA</strong> to issue it.
        </p>
        <p>
          <span className="acronym">CPS</span>: A <strong>Certification Practice Statement</strong> is a document from a <strong>CA</strong> or a member of a web of trust which describes their practice for issuing and managing <strong>public key certificates.</strong>
        </p>
        <p>
          <span className="acronym">CRL</span>: <strong>Certificate Revocation List</strong>
        </p>
        <p>
          <span className="acronym">PKI</span>: <strong>Public key Infrastructure</strong>
        </p>
        <p>
          <span className="acronym">ICA</span>: <strong>Issuing Certifying Authority</strong>
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;