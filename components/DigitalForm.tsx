"use client";

import { useForm } from "react-hook-form";

export default function DigitalSignatureForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);

    await fetch("/api/digital-signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center py-10">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[800px] p-10 text-[14px] leading-7"
      >

        {/* HEADER */}
        <h1 className="text-center font-bold text-lg">Schedule – 5</h1>
        <p className="text-center">(Relating to Sub-rule (1) of Rule 31)</p>
        <p className="text-center font-bold text-xl mt-2">
          The Radiant InfoTech Nepal Private Limited<br />
          (Issuing Certifying Authority)
        </p>
        <p className="text-center font-semibold mt-2">
          Subject: Request for Issuance of the Digital Signature Certificate
        </p>

        <p className="mt-6">
          As the certified Digital signature is required to be obtained, I have filed this application attaching the following documents and details.
        </p>

        <div className="mt-6">
          <span className="font-semibold">1. Name, surname, and address of the subscriber </span>
          <input {...register("name")} className="border-b border-dotted w-full outline-none" />
        </div>

        {/* 2 */}
        <div className="mt-6">
          <span className="font-semibold">2. Legal status of subscriber: </span>
          <input {...register("legalStatus")} 
                    placeholder="Nepalese citizen"
          className="border-b border-dotted w-[300px] outline-none ml-2" />
        </div>

        {/* 3 */}
        <div className="mt-6">
          <p className="font-semibold">3. Certificate to identify the subscriber:-</p>

          <p className="ml-4 mt-2">3.1 In case of natural person:</p>

          <div className="ml-8 mt-2">
            a) Citizenship/Passport No: 
            <input {...register("citizenshipNo")} className="border-b border-dotted w-[300px] ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            b) Issuing office:
            <input {...register("issuingOffice")} className="border-b border-dotted w-[400px] ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            c) Date of issue:
            <input type="date" {...register("issueDate")} className="border-b border-dotted ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            d) Duration of validity:
            <input {...register("validity")} className="border-b border-dotted w-[300px] ml-2 outline-none" />
          </div>
        </div>

        {/* 3.2 */}
        <div className="mt-6">
          <p className="ml-4 font-semibold">
            3.2 In case of a firm, Company, Corporate body or Agency
          </p>

          <div className="ml-8 mt-2">
            a) Registration Certificate:
            <input {...register("registrationCertificate")} className="border-b border-dotted w-full ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            b) Date of Issue:
            <input type="date" {...register("companyIssueDate")} className="border-b border-dotted ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            c) Issuing office:
            <input {...register("companyIssuingOffice")} className="border-b border-dotted w-[400px] ml-2 outline-none" />
          </div>

          <div className="ml-8 mt-2">
            d) Objectives:
            <input {...register("objectives")} className="border-b border-dotted w-full ml-2 outline-none" />
          </div>
        </div>

        {/* 4 */}
        <div className="mt-6">
         <span className="font-semibold">
            4. For what purpose the digital signature is intended to obtain:
          </span>

          <div className="ml-6 mt-2">
            <label>
              <input type="checkbox" {...register("purpose.all")} /> For all types of possible transaction
            </label>
          </div>

          <div className="ml-6">
            <label>
              <input type="checkbox" {...register("purpose.banking")} /> For Banking Purposes
            </label>
          </div>

          <div className="ml-6">
            <label>
              <input type="checkbox" {...register("purpose.purchase")} /> For other transactions relating to purchase and sale
            </label>
          </div>

          <div className="ml-6">
            <label>
              <input type="checkbox" {...register("purpose.certification")} />
              For certification of correspondence (Lenden)
            </label>
          </div>
        </div>

        {/* 5 */}
        <div className="mt-6">
         <span className="font-semibold">
            5. Maximum threshold of each transaction if financial transaction, among others, is intended to carry out:
          </span>
          <input {...register("threshold")} 
          placeholder="Enter  threshold"
          className="border-b border-dotted w-[300px] ml-2 outline-none" />
        </div>

        {/* Declaration */}
        <p className="mt-6">
The detailed stated above are true and correct, I shall submit other details and proofs, as required by the
Authority, at a time when so asked and I shall, upon the issuance of license, pay the feel therefor.        </p>

        {/* Signature */}
        <div className="mt-6 text-right">
          <div>
            Applicant’s:
            <input {...register("applicant")} className="border-b border-dotted w-[200px] ml-2 outline-none" />
          </div>
          <div className="mt-2">
            Signature:
            <input {...register("signature")} className="border-b border-dotted w-[200px] ml-2 outline-none" />
          </div>
          <div className="mt-2">
            Name:
            <input {...register("finalName")} className="border-b border-dotted w-[200px] ml-2 outline-none" />
          </div>
        </div>

        <p className="mt-4">
In the case of a corporate body, the seal of the office, signature, name, and designation of the person
making the application on behalf of the body.        </p>

        {/* SUBMIT */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Form
          </button>
        </div>

      </form>
    </div>
  );
}