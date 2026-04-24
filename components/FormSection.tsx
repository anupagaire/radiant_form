"use client";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image'

export default function FormPage() {
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (photo) {
      data.append("photo", photo);
    }

    const res = await fetch("/api/form", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
    alert("Form submitted!");
  };

  return (

   <div className="max-w-5xl mx-auto py-10"> 
      <div className="text-center relative">
        <h1 className="text-2xl font-bold">Additional information</h1>
        <p>
          As mentioned Electronic Transactions Rules 2064 “Chapter -5” (3)
        </p>
        <p className="text-center font-bold text-xl mt-2">
          The Radiant InfoTech Nepal Private Limited<br />
          (Issuing Certifying Authority)
        </p>

        {/* Photo Box */}
        <div className="absolute top-0 right-0 w-32 h-36 border border-black flex items-center justify-center">
          <input type="file" onChange={handlePhotoChange} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* SECTION 1 */}
        <div>
          <p className="font-bold">
            1. Name, surname and address of the subscriber:
          </p>

          <p className="ml-4 font-semibold">1.1 In case of natural person</p>

          {/* Address */}
          <div className=" mt-2">
            <span className="p-2 w-32">a) Address:</span>
            <input
              name="address"
              onChange={handleChange}
              className="border p-2"
            />
          </div>

          {/* Mailing */}
          <div className="mt-2">b) Permanent Address (Mailing):</div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              name="province"
              placeholder="Province"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="district"
              placeholder="District"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="municipality"
              placeholder="VDC/Municipality"
              onChange={handleChange}
              className="border p-2"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-2">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="ward"
              placeholder="Ward No"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="postbox"
              placeholder="Post Box No"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div>
          <p className="font-bold">2. Certificate to identify the subscriber:</p>

          <p className="ml-4">2.1 In case of natural person:</p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              name="email"
              placeholder="Primary Email"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="altEmail"
              placeholder="Alternate Email"
              onChange={handleChange}
              className="border p-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              name="cell"
              placeholder="Cell Number"
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="telephone"
              placeholder="Telephone No"
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>
{/* 2.2 Firm / Company Section */}
<div className="mt-6">
  <p className="font-bold">
    2.2 In case of Firm, Company, Corporate body or Agency
  </p>

  {/* Types of Organization */}
  <div className="flex items-center  mt-2">
    <span className="p-2 w-56">a) Types of Organization:</span>
    <input className="flex-1 p-2 outline-none border border-black" name="orgName" />
  </div>

  <div className="flex gap-6 mt-2 ml-2 flex-wrap">
    {["Proprietorship", "Partnership", "Public", "NGO/INGO", "Government", "Others"].map((item) => (
      <label key={item} className="flex items-center gap-1">
        <input type="checkbox" name="orgType" value={item} onChange={handleChange} />
        {item}
      </label>
    ))}
  </div>

  {/* Address Row */}
  <div className="flex items-center mt-3 gap-2">
    <span>b) Address:</span>
    <input className="border p-2 flex-1" name="orgAddress" onChange={handleChange} />
    <span>City</span>
    <input className="border p-2 w-40" name="orgCity" onChange={handleChange} />
  </div>

  {/* Province / District */}
  <div className="flex items-center gap-2 mt-2">
    <span>Province</span>
    <input className="border p-2 w-40" name="orgProvince" onChange={handleChange} />
    <span>District</span>
    <input className="border p-2 w-40" name="orgDistrict" onChange={handleChange} />
    <span>VDC/Municipality</span>
    <input className="border p-2 flex-1" name="orgMunicipality" onChange={handleChange} />
  </div>

  {/* Ward + Contact */}
  <div className="flex items-center gap-2 mt-2">
    <span>Ward No</span>
    <input className="border p-2 w-20" name="orgWard" onChange={handleChange} />

    <span>Contact No: Cell</span>
    <input
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="border p-2"
            />

    <span>Telephone No:</span>
     <input
              name="telephone"
              placeholder="Telephone No"
              onChange={handleChange}
              className="border p-2"
            />
  </div>

  {/* Registration Certificate */}
  <p className="font-bold mt-6">Registration Certificate:</p>

  <div className="grid grid-cols-2 gap-4 mt-2">
    <div className="flex items-center gap-2">
      <span>a) PAN/VAT No</span>
      <input className="border p-2 flex-1" name="pan" onChange={handleChange} />
    </div>

    <div className="flex items-center gap-2">
      <span>Tax Clearance Up to</span>
      <input className="border p-2 flex-1" name="taxClearance" onChange={handleChange} />
    </div>

    <div className="flex items-center gap-2">
      <span>b) E-mail</span>
      <input className="border p-2 flex-1" name="email" onChange={handleChange} />
    </div>

    <div className="flex items-center gap-2">
      <span>Alternative E-mail</span>
      <input className="border p-2 flex-1" name="altEmail" onChange={handleChange} />
    </div>

    <div className="flex items-center gap-2">
      <span>c) Telephone/Fax</span>
      <input className="border p-2 flex-1" name="fax" onChange={handleChange} />
    </div>

    <div className="flex items-center gap-2">
      <span>Website (URL)</span>
      <input className="border p-2 flex-1" name="website" onChange={handleChange} />
    </div>
  </div>
</div>
        {/* SECTION 3 */}
        <div>
          <p className="font-bold">
            3. Purpose of digital signature:
          </p>

          <div className="flex gap-6 mt-2">
            <label>
              <input type="radio" name="class" value="1" onChange={handleChange} /> Class 1
            </label>
            <label>
              <input type="radio" name="class" value="2" onChange={handleChange} /> Class 2
            </label>
            <label>
              <input type="radio" name="class" value="3" defaultChecked onChange={handleChange} /> Class 3
            </label>
             <label>
              <input type="radio" name="class" value="2" onChange={handleChange} /> Class (GIOMS)
            </label>
          </div>

          <div className="flex gap-6 mt-2">
            <label>
              <input type="checkbox" name="signature" onChange={handleChange} /> Signature
            </label>
            <label>
              <input type="checkbox" name="encryption" onChange={handleChange} /> Encryption
            </label>
             <label>
              <input type="checkbox" name="encryption" onChange={handleChange} /> Both (Signature and Encryption)
            </label>
          </div>

          <div className="flex gap-6 mt-2">
            <label>
              <input type="radio" name="validity" value="1" onChange={handleChange} /> 1 Year
            </label>
            <label>
              <input type="radio" name="validity" value="2" onChange={handleChange} /> 2 Years
            </label>
          </div>
        </div>
<div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Form
          </button>
        </div>
       
      </form>
      {/* FOOTER SECTION */}
<div className="mt-12 border-t pt-6">
  <div className="flex justify-between items-end">

    {/* LEFT TEXT */}
    <div className="text-sm leading-relaxed max-w-2xl">
      <p>
        Radiant Building, Naxal, Bhattbhateni, Kathmandu, Nepal,
        Tel.: +977-01-4545765, 4524311
      </p>
      <p>
        Email:
        <span className="text-blue-600 underline ml-1">
          dsc@radiantnepal.info
        </span>
        ,
        <span className="text-blue-600 underline ml-1">
          admin@radiantnepal.com
        </span>
        ; Website:
        <span className="text-blue-600 underline ml-1">
          www.radiantca.com.np
        </span>
      </p>
    </div>

    {/* RIGHT SIGNATURE */}
    <div className="text-center">
      <div className="border-t w-64 mb-2"></div>
      <p className="font-semibold text-sm">
        Official Seal & Stamp (If Any) / Signature
      </p>

      {/* LOGO */}
      <div className="mt-4 flex flex-col items-center">
        <Image
          src="/logo.png"   
          alt="Radiant Logo"
          height={200}
          width={200}
          className="w-32"
        />
      <Link href="https://www.radiantca.com.np" target="_blank" rel="noopener noreferrer">
        <p className="text-xs mt-1">www.radiantca.com.np</p>
      </Link>
        <p className="text-xs">(Issuing Certifying Authority)</p>
      </div>
    </div>

  </div>
</div>
    </div>
  );
}