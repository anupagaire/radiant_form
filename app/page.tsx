"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────
// Shared input style helpers
// ─────────────────────────────────────────────
const inp = "border border-gray-300 p-2 outline-none focus:border-blue-400 rounded text-[13px] w-full";
const inpInline = "border border-gray-300 p-2 outline-none focus:border-blue-400 rounded text-[13px]";

export default function CombinedPage() {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "radio" ? (type === "checkbox" ? target.checked : value) : value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const data = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });

      // Append photo
      if (photo) data.append("photo", photo);

      const res = await fetch("/api/combined-form", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 font-sans text-[14px]">

      <form onSubmit={handleSubmit} className="space-y-12">

        {/* ═══════════════════════════════════════════════════
            PART 1 — SCHEDULE 5 (Digital Signature Request)
        ═══════════════════════════════════════════════════ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-center font-bold text-lg">Schedule – 5</h2>
          <p className="text-center text-[13px] text-gray-700">(Relating to Sub-rule (1) of Rule 31)</p>
          <p className="text-center font-bold text-xl mt-2">
            The Radiant InfoTech Nepal Private Limited<br />
            <span className="text-[15px] font-semibold">(Issuing Certifying Authority)</span>
          </p>
          <p className="text-center font-semibold mt-2 text-[14px]">
            Subject: Request for Issuance of the Digital Signature Certificate
          </p>

          <p className="mt-5 text-[13px] text-gray-600">
            As the certified Digital signature is required to be obtained, I have filed this application attaching the following documents and details.
          </p>

          <div className="mt-6 space-y-5">
            {/* 1 */}
            <div>
              <label className="font-semibold text-lg block mb-1">1. Name, surname, and address of the subscriber</label>
              <input name="name" onChange={handleChange} className={inp} />
            </div>

            {/* 2 */}
            <div>
              <label className="font-semibold text-lg block mb-1">2. Legal status of subscriber</label>
              <input name="legalStatus" placeholder="Nepalese citizen" onChange={handleChange} className={inp} />
            </div>

            {/* 3.1 */}
            <div>
              <p className="font-semibold text-lg mb-2">3. Certificate to identify the subscriber</p>
              <p className="ml-2 font-medium mb-2 text-gray-600">3.1 In case of natural person:</p>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <div>
                  <label className="text-base text-gray-700 block mb-1">a) Citizenship/Passport No.</label>
                  <input name="citizenshipNo" onChange={handleChange} className={inp} />
                </div>
                <div>
                  <label className="text-base text-gray-700 block mb-1">b) Issuing office</label>
                  <input name="issuingOffice" onChange={handleChange} className={inp} />
                </div>
                <div>
                  <label className="text-base text-gray-700 block mb-1">c) Date of issue</label>
                  <input type="date" name="issueDate" onChange={handleChange} className={inp} />
                </div>
                <div>
                  <label className="text-base text-gray-700 block mb-1">d) Duration of validity</label>
                  <input name="validity" onChange={handleChange} className={inp} />
                </div>
              </div>
            </div>

            {/* 3.2 */}
            <div>
              <p className="ml-2 font-medium mb-2 text-gray-600">3.2 In case of a firm, Company, Corporate body or Agency</p>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <div className="col-span-2">
                  <label className="text-base text-gray-700 block mb-1">a) Registration Certificate</label>
                  <input name="registrationCertificate" onChange={handleChange} className={inp} />
                </div>
                <div>
                  <label className="text-base text-gray-700 block mb-1">b) Date of Issue</label>
                  <input type="date" name="companyIssueDate" onChange={handleChange} className={inp} />
                </div>
                <div>
                  <label className="text-base text-gray-700 block mb-1">c) Issuing office</label>
                  <input name="companyIssuingOffice" onChange={handleChange} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className="text-base text-gray-700 block mb-1">d) Objectives</label>
                  <input name="objectives" onChange={handleChange} className={inp} />
                </div>
              </div>
            </div>

            {/* 4 */}
            <div>
              <p className="font-semibold mb-2 text-lg">4. For what purpose the digital signature is intended to obtain, the details therefor::</p>
              <div className="flex flex-wrap gap-4 ml-4">
                {[
                  { name: "purpose.all", label: "For all types of possible transaction (mention the possible details)" },
                  { name: "purpose.banking", label: "Banking Purposes" },
                  { name: "purpose.purchase", label: "Other transactions relating to purchase and sale" },
                  { name: "purpose.certification", label: "The certification that any correspondence, in writing, is issued by oneself except general transaction (Lenden)." },
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name={item.name} onChange={handleChange} className="w-4 h-4" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* 5 */}
            <div>
              <label className="font-semibold text-lg block mb-1">5. Maximum threshold of each transaction if financial transaction, among others, is intended to carry out:</label>
              <input name="threshold" placeholder="Enter threshold" onChange={handleChange} className={`${inp} max-w-xs`} />
            </div>
<p>The detailed stated above are true and correct, I shall submit other details and proofs, as required by the
Authority, at a time when so asked and I shall, upon the issuance of license, pay the feel therefor.</p>
            {/* Signature row */}
            <div className="flex justify-end gap-6 flex-wrap pt-4 border-t border-gray-100">
              {[
                { name: "applicant", label: "Applicant's" },
                { name: "signature", label: "Signature" },
                { name: "finalName", label: "Name" },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-600 whitespace-nowrap">{f.label}:</span>
                  <input name={f.name} onChange={handleChange} className={`${inpInline} w-44`} />
                </div>
              ))}
            </div>
            <p>In the case of a corporate body, the seal of the office, signature, name, and designation of the person
making the application on behalf of the body.</p>
          </div>
        </section>

        {/* PART 2 — ADDITIONAL INFORMATION*/}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          {/* Header with photo box */}
          <div className="relative mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Additional Information</h2>
              <p className="text-[13px] text-gray-700">As mentioned Electronic Transactions Rules 2064 "Chapter -5" (3)</p>
              <p className="text-center font-bold text-xl mt-2">
                The Radiant InfoTech Nepal Private Limited<br />
                <span className="text-[15px] font-semibold">(Issuing Certifying Authority)</span>
              </p>
            </div>

            {/* Photo upload */}
            <div className="absolute top-0 right-0 w-32 h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-2">
                  <p className="text-[10px] text-gray-400 leading-tight">Click to upload photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-6">

            {/* Section 1 - Address */}
            <div>
              <p className="font-bold mb-3 text-lg">1. Name, surname and address of the subscriber</p>
              <p className="ml-2 font-medium text-gray-600 mb-2">1.1 In case of natural person</p>

              <div className="ml-4 space-y-3">
                <div>
                  <label className="text-base text-gray-700 block mb-1">a) Address</label>
                  <input name="address" onChange={handleChange} className={inp} />
                </div>

                <div>
                  <p className="text-base text-gray-700 mb-1">b) Permanent Address (Mailing)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["province", "district", "municipality"].map((f) => (
                      <input key={f} name={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} onChange={handleChange} className={inp} />
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[
                      { name: "city", placeholder: "City" },
                      { name: "ward", placeholder: "Ward No" },
                      { name: "postbox", placeholder: "Post Box No" },
                      { name: "contact", placeholder: "Contact Number" },
                    ].map((f) => (
                      <input key={f.name} name={f.name} placeholder={f.placeholder} onChange={handleChange} className={inp} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 - Contact */}
            <div>
              <p className="font-bold  text-lg mb-3">2. Certificate to identify the subscriber</p>
              <p className="ml-2 font-medium text-gray-600 mb-2">2.1 In case of natural person</p>
              <div className="ml-4 grid grid-cols-2 gap-3">
                {[
                  { name: "email", placeholder: "Primary Email" },
                  { name: "altEmail", placeholder: "Alternate Email" },
                  { name: "cell", placeholder: "Cell Number" },
                  { name: "telephone", placeholder: "Telephone No" },
                ].map((f) => (
                  <input key={f.name} name={f.name} placeholder={f.placeholder} onChange={handleChange} className={inp} />
                ))}
              </div>
            </div>

            {/* Section 2.2 - Company */}
            <div>
              <p className="font-bold mb-3">2.2 In case of Firm, Company, Corporate body or Agency</p>
              <div className="ml-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] whitespace-nowrap w-40">a) Types of Organization:</span>
                  <input name="orgName" onChange={handleChange} className={inp} />
                </div>

                <div className="flex flex-wrap gap-4">
                  {["Proprietorship", "Partnership", "Public", "NGO/INGO", "Government", "Others"].map((item) => (
                    <label key={item} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" name={`orgType_${item}`} value={item} onChange={handleChange} className="w-4 h-4" />
                      {item}
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "orgAddress", label: "b) Address" },
                    { name: "orgCity", label: "City" },
                    { name: "orgProvince", label: "Province" },
                    { name: "orgDistrict", label: "District" },
                    { name: "orgMunicipality", label: "VDC/Municipality" },
                    { name: "orgWard", label: "Ward No" },
                    { name: "orgContact", label: "Contact No" },
                    { name: "orgTelephone", label: "Telephone No" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="text-base text-gray-700 block mb-1">{f.label}</label>
                      <input name={f.name} onChange={handleChange} className={inp} />
                    </div>
                  ))}
                </div>

                <p className="font-semibold mt-2">Registration Certificate</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "pan", label: "a) PAN/VAT No" },
                    { name: "taxClearance", label: "Tax Clearance Up to" },
                    { name: "email", label: "b) E-mail" },
                    { name: "altEmail", label: "Alternative E-mail" },
                    { name: "fax", label: "c) Telephone/Fax" },
                    { name: "website", label: "Website (URL)" },
                  ].map((f) => (
                    <div key={f.name + f.label}>
                      <label className="text-base text-gray-700 block mb-1">{f.label}</label>
                      <input name={f.name} onChange={handleChange} className={inp} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold mb-3 text-lg">3. For what purpose the digital signature is intended to obtain, the details therefor:</p>
              <div className="ml-4 space-y-3">
                <div className="flex flex-wrap gap-5">
                  {["1", "2", "3"].map((v) => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="class" value={v} onChange={handleChange} className="w-4 h-4" />
                      Class {v}
                    </label>
                  ))}
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="class" value="GIOMS" onChange={handleChange} className="w-4 h-4" />
                    Class (GIOMS)
                  </label>
                </div>

                <div className="flex flex-wrap gap-5">
                  {[
                    { name: "signature", label: "Signature" },
                    { name: "encryption", label: "Encryption" },
                    { name: "bothSignEnc", label: "Both (Signature and Encryption)" },
                  ].map((item) => (
                    <label key={item.name} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" name={item.name} onChange={handleChange} className="w-4 h-4" />
                      {item.label}
                    </label>
                  ))}
                </div>

                <div className="flex gap-5">
                  {["1", "2"].map((v) => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="validity_years" value={v} onChange={handleChange} className="w-4 h-4" />
                      {v} Year{v === "2" ? "s" : ""}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t pt-6 flex justify-between items-end flex-wrap gap-6">
            <div className="text-[13px] text-gray-600 leading-relaxed">
              <p>Radiant Building, Naxal, Bhattbhateni, Kathmandu, Nepal</p>
              <p>Tel.: +977-01-4545765, 4524311</p>
              <p>
                Email:{" "}
                <a href="mailto:dsc@radiantnepal.info" className="text-blue-600 underline">dsc@radiantnepal.info</a>,{" "}
                <a href="mailto:admin@radiantnepal.com" className="text-blue-600 underline">admin@radiantnepal.com</a>
              </p>
              <p>
                Website:{" "}
                <a href="https://www.radiantca.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  www.radiantca.com.np
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="border-t w-64 mb-2" />
              <p className="font-semibold text-[13px]">Official Seal & Stamp (If Any) / Signature</p>
              <div className="mt-3 flex flex-col items-center">
                <Image src="/logo.png" alt="Radiant Logo" height={200} width={200} className="w-28" />
                <Link href="https://www.radiantca.com.np" target="_blank" rel="noopener noreferrer">
                  <p className="text-xs mt-1 text-blue-600 underline">www.radiantca.com.np</p>
                </Link>
                <p className="text-xs text-gray-700">(Issuing Certifying Authority)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SINGLE SUBMIT BUTTON
        ═══════════════════════════════════════════════════ */}
        <div className="text-center pb-10">
          {status === "success" && (
            <p className="mb-4 text-green-600 font-semibold">✅ Both forms submitted successfully!</p>
          )}
          {status === "error" && (
            <p className="mb-4 text-red-600 font-semibold">❌ Submission failed. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold text-[15px] disabled:opacity-50 transition-colors shadow-md"
          >
            {status === "loading" ? "Submitting..." : "Submit Complete Application"}
          </button>
        </div>

      </form>
    </div>
  );
}