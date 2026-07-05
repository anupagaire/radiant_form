"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CameraCapture from "@/components/CameraCapture";
import Disclaimer from '@/components/Disclaimer';
import LocationSelect from "@/components/LocationSelect";
import { provinceData, getDistrictsByProvince, getMunicipalitiesByDistrict, getVdcsByDistrict } from "@/data/nepal-data";



const inp = "border border-gray-300 p-2 outline-none focus:border-blue-400 rounded text-[13px] w-full";
const inpInline = "border border-gray-300 p-2 outline-none focus:border-blue-400 rounded text-[13px]";

export default function CombinedPage() {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});

  // Uploaded photo (file input)
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Live camera captured photo
  const [livePhotoBase64, setLivePhotoBase64] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "uploading" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
const [vdcs, setVdcs] = useState<{ id: string; name: string }[]>([]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target as HTMLInputElement;
  const { name, value, type } = target;
  
  // Handle VDC loading when district changes
  if (name === "orgDistrict" && value) {
    const vdcList = getVdcsByDistrict(value);
    setVdcs(vdcList);
  }
  
  // For checkboxes and radio buttons
  if (type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked,
    }));
  } else if (type === "radio") {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  } else {
    // For text inputs and select dropdowns - ensure string value
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  }
};


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  // Convert a base64 data URL (from camera capture) into a File object
  const base64ToFile = (base64: string, filename: string): File => {
    const [header, data] = base64.split(",");
    const mimeMatch = header.match(/data:(.*?);base64/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const byteChars = atob(data);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!photo) {
      setErrorMsg("Please upload a photo before submitting.");
      return;
    }
    if (!livePhotoBase64) {
      setErrorMsg("Please capture a live photo before submitting.");
      return;
    }

    try {
      setStatus("loading");

      const data = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });

      // Append uploaded photo (file input)
      data.append("photo", photo);

      // Append live camera captured photo (convert base64 -> File first)
      const liveFile = base64ToFile(livePhotoBase64, "live-photo.jpg");
      data.append("livePhoto", liveFile);

      const res = await fetch("/api/combined-form", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 font-sans text-[14px]">

      <form onSubmit={handleSubmit} className="space-y-12">

      
<section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">          <h2 className="text-center font-bold text-lg">Schedule – 5</h2>
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

           
            <div>
              <p className="font-semibold text-lg mb-2">3. Certificate to identify the subscriber</p>
              <p className="ml-2 font-medium mb-2 text-gray-600">3.1 In case of natural person:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
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
                  <label className="text-base text-gray-700 block mb-1">d) Duration of validity (in case of the passport):</label>
                  <input name="validity" onChange={handleChange} className={inp} />
                </div>
              </div>
            </div>

            {/* 3.2 */}
            <div>
              <p className="ml-2 font-medium mb-2 text-gray-600">3.2 In case of a firm, Company, Corporate body or Agency</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-0 sm:ml-4">
                <div className="col-span-2">
                  <label className="text-base text-gray-700 block mb-1">a) Registration Certificate</label>
                  <input name="registrationCertificate" placeholder="Enter your company name" onChange={handleChange} className={inp} />
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
  <p className="font-semibold mb-2 text-lg">
    4. For what purpose the digital signature is intended to obtain, the details therefor:
  </p>
  <div className="flex flex-col gap-4 ml-4">
    {[
      { 
        name: "purpose.all", 
        label: "For all types of possible transaction (mention the possible details)",
        hasInput: true,
        placeholder: "GIOMS"
      },
      { 
        name: "purpose.banking", 
        label: "For Banking Purposes",
        hasInput: false
      },
      { 
        name: "purpose.purchase", 
        label: "For other transactions relating to purchase and sale",
        hasInput: false
      },
      { 
        name: "purpose.certification", 
        label: "For the certification that any correspondence, in writing, is issued by oneself except general transaction (Lenden).",
        hasInput: false
      },
    ].map((item) => (
      <div key={item.name} className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            name={item.name} 
            onChange={handleChange} 
            className="w-4 h-4 flex-shrink-0" 
          />
          <span className="text-gray-800">{item.label}</span>
        </label>
        
        {/* Show input field when checkbox is checked and hasInput is true */}
        {item.hasInput && (
          <div className="ml-6 mt-1">
            <input
              type="text"
              name={`${item.name}_details`}
              placeholder={item.placeholder}
              onChange={handleChange}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
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
<div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 pt-4 border-t border-gray-100">
              {[
                { name: "applicant", label: "Applicant's" },
                { name: "signature", label: "Signature" },
                { name: "finalName", label: "Name" },
              ].map((f) => (
    <div key={f.name} className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-[13px] text-gray-600 whitespace-nowrap">{f.label}:</span>
      <input name={f.name} onChange={handleChange} className={`${inpInline} w-full sm:w-44`} />
                </div>
              ))}
            </div>
            <p>In the case of a corporate body, the seal of the office, signature, name, and designation of the person
              making the application on behalf of the body.</p>
          </div>
        </section>

        {/* PART 2 — ADDITIONAL INFORMATION*/}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">


 <div className="mb-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
  <div className="text-center md:text-center w-full md:w-auto">
              <h2 className="text-2xl font-bold">Additional Information</h2>


          {/* <div className="relative mb-6">
            <div className="text-center">*/}
              <p className="text-[13px] text-gray-700">As mentioned Electronic Transactions Rules 2064 "Chapter -5" (3)</p>
              <p className="text-center font-bold text-xl mt-2">
                The Radiant InfoTech Nepal Private Limited<br />
                <span className="text-[15px] font-semibold">(Issuing Certifying Authority)</span>
              </p>
            </div>

             <div className="flex gap-4 items-start shrink-0">
              {/* Upload box */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-32 sm:w-32 sm:h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        {photoPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoPreview} alt="Uploaded preview" className="w-full h-full object-cover" />
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
                <span className="text-[10px] text-gray-500">Upload Photo</span>
              </div>

              {/* Live camera capture box */}
              <div className="flex flex-col items-center gap-1">
               {/* <div className="w-28 h-32 sm:w-32 sm:h-36 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"> */}
        <CameraCapture
          onCapture={(base64) => setLivePhotoBase64(base64)}
          onClear={() => setLivePhotoBase64(null)}
        />
      {/* </div> */}
                <span className="text-[10px] text-gray-500">Live Photo (Camera)</span>
              </div>
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
              <div>
  <label className="text-base text-gray-700 block mb-1">b) Permanent Address (Mailing)</label>
  <LocationSelect 
    provinceName="province"
    districtName="district"
    municipalityName="municipality"
    onProvinceChange={(val) => {
      const province = provinceData.find(p => p.id === val);
      setFormData(prev => ({ ...prev, province: province?.name || '' }));
    }}
    onDistrictChange={(val) => {
      const district = getDistrictsByProvince('').find(d => d.id === val);
      setFormData(prev => ({ ...prev, district: district?.name || '' }));
      // Load VDCs when district changes
      if (val) {
        const vdcList = getVdcsByDistrict(val);
        setVdcs(vdcList);
      }
    }}
    onMunicipalityChange={(val) => {
      // Check if it's municipality or VDC
      const muni = getMunicipalitiesByDistrict(formData.district as string).find(m => m.id === val);
      const vdc = vdcs.find(v => v.id === val);
      setFormData(prev => ({ 
        ...prev, 
        municipality: muni?.name || vdc?.name || val,
        locationType: muni ? 'Municipality' : vdc ? 'VDC' : ''
      }));
    }}
  />
  {/* Show selected type for top section */}
  {formData.municipality && (
    <p className="text-xs text-gray-500 mt-1">
      Selected: <span className="font-medium">{formData.locationType || 'Municipality/VDC'}</span>
    </p>
  )}
</div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
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

            <div>
              <p className="font-bold  text-lg mb-3">2. Certificate to identify the subscriber</p>
              <p className="ml-2 font-medium text-gray-600 mb-2">2.1 In case of natural person</p>
              <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
  {/* Address - Text Input */}
  <div>
    <label className="text-base text-gray-700 block mb-1">b) Address</label>
    <input name="orgAddress" onChange={handleChange} className={inp} />
  </div>

  {/* City - Text Input */}
  <div>
    <label className="text-base text-gray-700 block mb-1">City</label>
    <input name="orgCity" onChange={handleChange} className={inp} />
  </div>

  {/* Province - Dropdown */}
  <div>
    <label className="text-base text-gray-700 block mb-1">Province</label>
    <select 
      name="orgProvince" 
      onChange={handleChange} 
      className={inp}
      value={typeof formData.orgProvince === 'string' ? formData.orgProvince : ""}
    >
      <option value="">Select Province</option>
      {provinceData.map((prov) => (
        <option key={prov.id} value={prov.id}>
          {prov.name}
        </option>
      ))}
    </select>
  </div>

  {/* District - Dropdown (depends on province) */}
  <div>
    <label className="text-base text-gray-700 block mb-1">District</label>
    <select 
      name="orgDistrict" 
      onChange={handleChange} 
      className={inp}
       value={typeof formData.orgDistrict === 'string' ? formData.orgDistrict : ""}
      disabled={!formData.orgProvince}
    >
      <option value="">Select District</option>
      {formData.orgProvince && getDistrictsByProvince(formData.orgProvince as string).map((dist) => (
        <option key={dist.id} value={dist.id}>
          {dist.name}
        </option>
      ))}
    </select>
  </div>
{/* Municipality/VDC Dropdown */}
<div>
  <label className="text-base text-gray-700 block mb-1">Municipality or VDC</label>
  <select 
    name="orgLocation" 
    onChange={(e) => {
      handleChange(e);
      const selected = e.target.value;
      const muni = getMunicipalitiesByDistrict(formData.orgDistrict as string).find(m => m.id === selected);
      const vdc = vdcs.find(v => v.id === selected);
      setFormData(prev => ({ 
        ...prev, 
        orgLocationName: muni?.name || vdc?.name || '',
        orgLocationType: muni ? 'Municipality' : vdc ? 'VDC' : ''
      }));
    }}
    className={inp}
    value={typeof formData.orgLocation === 'string' ? formData.orgLocation : ""}

    disabled={!formData.orgDistrict}
  >
    <option value="">Select Municipality or VDC</option>
    
    {formData.orgDistrict && getMunicipalitiesByDistrict(formData.orgDistrict as string).map((muni) => (
      <option key={`muni_${muni.id}`} value={muni.id} style={{fontWeight: 'bold'}}>
         {muni.name} (Municipality)
      </option>
    ))}
    
    {vdcs.map((vdc) => (
      <option key={`vdc_${vdc.id}`} value={vdc.id}>
         {vdc.name} (VDC)
      </option>
    ))}
  </select>
  
  {/* Show selected type */}
  {formData.orgLocation && (
    <p className="text-xs text-gray-500 mt-1">
      Selected: <span className="font-medium">{formData.orgLocationType || ''}</span>
    </p>
  )}
</div>

  {/* Ward No - Text Input */}
  <div>
    <label className="text-base text-gray-700 block mb-1">Ward No</label>
    <input name="orgWard" onChange={handleChange} className={inp} />
  </div>

  {/* Contact No - Text Input */}
  <div>
    <label className="text-base text-gray-700 block mb-1">Contact No</label>
    <input name="orgContact" onChange={handleChange} className={inp} />
  </div>

  {/* Telephone No - Text Input */}
  <div>
    <label className="text-base text-gray-700 block mb-1">Telephone No</label>
    <input name="orgTelephone" onChange={handleChange} className={inp} />
  </div>
</div>

                <p className="font-semibold mt-2">Registration Certificate</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
<div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">            <div className="text-[13px] text-gray-600 leading-relaxed">
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
          {status === "uploading" && <p className="mb-4 text-blue-600 font-semibold">Uploading photo...</p>}
          {status === "success" && (
            <p className="mb-4 text-green-600 font-semibold">✅ Both forms submitted successfully!</p>
          )}
          {status === "error" && (
            <p className="mb-4 text-red-600 font-semibold">❌ {errorMsg ?? "Submission failed. Please try again."}</p>
          )}
          {errorMsg && status === "idle" && (
            <p className="mb-4 text-red-600 font-semibold">{errorMsg}</p>
          )}
          <button
            type="submit"
            disabled={status === "loading" || status === "uploading"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 rounded-xl font-semibold text-[15px] disabled:opacity-50 transition-colors shadow-md"
          >
            {status === "uploading" ? "Uploading Photo..." : status === "loading" ? "Submitting..." : "Submit Complete Application"}
          </button>
        </div>

      </form>
        <Disclaimer />
    </div>
  );
}