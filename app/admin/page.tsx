"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type AdditionalInfo = {
  photoUrl: string | null;
  livePhotoUrl: string | null;
  address: string | null;
  province: string | null;
  district: string | null;
  municipality: string | null;
  city: string | null;
  ward: string | null;
  postbox: string | null;
  contact: string | null;
  email: string | null;
  altEmail: string | null;
  cell: string | null;
  telephone: string | null;
  orgName: string | null;
  orgType: string | null;
  orgAddress: string | null;
  orgCity: string | null;
  orgProvince: string | null;
  orgDistrict: string | null;
  orgMunicipality: string | null;
  orgWard: string | null;
  orgContact: string | null;
  orgTelephone: string | null;
  pan: string | null;
  taxClearance: string | null;
  fax: string | null;
  website: string | null;
  class: string | null;
  signatureUse: boolean | null;
  encryption: boolean | null;
  bothSignEnc: boolean | null;
  validityYears: string | null;
};

type Submission = {
  id: string;
  name: string | null;
  legalStatus: string | null;
  citizenshipNo: string | null;
  issuingOffice: string | null;
  issueDate: string | null;
  validity: string | null;
  registrationCertificate: string | null;
  companyIssueDate: string | null;
  companyIssuingOffice: string | null;
  objectives: string | null;
  purposeAll: boolean | null;
  purposeBanking: boolean | null;
  purposePurchase: boolean | null;
  purposeCertification: boolean | null;
  threshold: string | null;
  applicant: string | null;
  signature: string | null;
  finalName: string | null;
  createdAt: string;
  additionalInfo: AdditionalInfo | null;
};

function Field({ label, value }: { label: string; value: string | null | undefined | React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-0.5">{label}</p>
      <p className="text-[13px] text-slate-700 font-medium">
        {value || <span className="text-slate-300 italic">—</span>}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg font-bold uppercase tracking-widest text-indigo-400 mb-3">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-slate-100 my-6" />;
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-indigo-50 text-indigo-600 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-indigo-100">
      {label}
    </span>
  );
}

function SubmissionCard({ sub }: { sub: Submission }) {
  const [tab, setTab] = useState<"schedule5" | "additional">("schedule5");
  const [open, setOpen] = useState(false);

  const handleDownload = async (url: string, filename: string) => {
    // If it's a Base64 string, download directly
    if (url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
       try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback: just open in a new tab if fetch fails
      window.open(url, '_blank');
    }
  };

  const ai = sub.additionalInfo;
  const date = new Date(sub.createdAt);
  const avatarSrc = ai?.livePhotoUrl || ai?.photoUrl || null;

  const purposes = [
    { active: sub.purposeAll, label: "All Transactions" },
    { active: sub.purposeBanking, label: "Banking" },
    { active: sub.purposePurchase, label: "Purchase & Sale" },
    { active: sub.purposeCertification, label: "Certification" },
  ].filter((p) => p.active);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
   

<div
  onClick={() => setOpen(!open)}
  className="flex items-center justify-between px-4 sm:px-6 py-4 cursor-pointer"
>


        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-indigo-50 flex items-center justify-center flex-shrink-0">
            {avatarSrc ? (
              <img src={avatarSrc} alt="applicant" className="w-full h-full object-cover" />
            ) : (
              <span className="text-indigo-600 font-bold text-sm">
                {(sub.name || sub.finalName || "?")[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-[14px]">
              {sub.name || sub.finalName || "Unnamed Applicant"}
            </p>
            <p className="text-[11px] text-slate-400">
              {sub.legalStatus || "—"} · {date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {!open && purposes.length > 0 && (
        <div className="px-4 sm:px-6 pb-4 flex flex-wrap gap-1">
          {purposes.map((p) => <Badge key={p.label} label={p.label} />)}
        </div>
      )}

      {open && (
        <div className="border-t border-slate-100">
          <div className="flex border-b border-slate-100 bg-slate-50">
            {(["schedule5", "additional"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-[13px] font-semibold transition-colors ${
                  tab === t
                    ? "bg-white border-b-2 border-indigo-500 text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t === "schedule5" ? "📋 Schedule 5" : "📄 Additional Info"}
              </button>
            ))}
          </div>

          {/* Reduced padding on mobile */}
          <div className="p-4 sm:p-6 space-y-8">
            {tab === "schedule5" && (
              <>
                <div>
                  <SectionTitle>1. Subscriber Details</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="md:col-span-2">
                      <Field label="Name, Surname & Address" value={sub.name} />
                    </div>
                    <Field label="Legal Status" value={sub.legalStatus} />
                  </div>
                </div>
                <Divider />
                <div>
                  <SectionTitle>3.1 Natural Person — Identity Certificate</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field label="Citizenship / Passport No." value={sub.citizenshipNo} />
                    <Field label="Issuing Office" value={sub.issuingOffice} />
                    <Field label="Date of Issue" value={sub.issueDate ? new Date(sub.issueDate).toLocaleDateString("en-GB") : null} />
                    <Field label="Duration of Validity" value={sub.validity} />
                  </div>
                </div>
                <Divider />
                <div>
                  <SectionTitle>3.2 Firm / Company / Corporate Body</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="md:col-span-2">
                      <Field label="Registration Certificate" value={sub.registrationCertificate} />
                    </div>
                    <Field label="Company Date of Issue" value={sub.companyIssueDate ? new Date(sub.companyIssueDate).toLocaleDateString("en-GB") : null} />
                    <Field label="Company Issuing Office" value={sub.companyIssuingOffice} />
                    <div className="md:col-span-2">
                      <Field label="Objectives" value={sub.objectives} />
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <SectionTitle>4. Purpose of Digital Signature</SectionTitle>
                  <div className="flex flex-wrap gap-1.5">
                    {purposes.length > 0 ? purposes.map((p) => <Badge key={p.label} label={p.label} />) : <span className="text-slate-400 italic text-[12px]">None selected</span>}
                  </div>
                </div>
                <Divider />
                <div>
                  <SectionTitle>5. Transaction & Applicant Details</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="md:col-span-2"><Field label="Maximum Transaction Threshold" value={sub.threshold} /></div>
                    <Field label="Applicant's Title / Role" value={sub.applicant} />
                    <Field label="Signatory Name" value={sub.finalName} />
                    <Field label="Signature (text)" value={sub.signature} />
                  </div>
                </div>
                <Divider />
                <p className="text-[11px] text-slate-400 font-mono">Record ID: {sub.id}</p>
              </>
            )}

            {tab === "additional" && (
              ai ? (
                <>
                  {(ai.photoUrl || ai.livePhotoUrl) && (
                    <div>
                      <SectionTitle>Applicant Photos</SectionTitle>
                      <div className="flex flex-wrap gap-6">
                        {ai.photoUrl && (
                          <div className="text-center">
                            <img
                              src={ai.photoUrl}
                              alt="Uploaded"
                              className="w-32 h-40 object-cover rounded-xl border border-slate-200 shadow-sm"
                            />
                            <p className="text-[10px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                              Uploaded Photo
                            </p>
                            <button
            onClick={() => handleDownload(ai.photoUrl!, `uploaded-${sub.name || 'photo'}.jpg`)}
            className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
                          </div>
                        )}
                        {ai.livePhotoUrl && (
                          <div className="text-center">
                            <img
                              src={ai.livePhotoUrl}
                              alt="Live Capture"
                              className="w-32 h-40 object-cover rounded-xl border border-slate-200 shadow-sm"
                            />
                            <p className="text-[10px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                              Live Camera Photo
                            </p>
                             <button
            onClick={() => handleDownload(ai.livePhotoUrl!, `live-${sub.name || 'photo'}.jpg`)}
            className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-medium rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Divider />

                  <div>
                    <SectionTitle>1.1 Personal Address</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="md:col-span-2"><Field label="Address" value={ai.address} /></div>
                      <Field label="Province" value={ai.province} />
                      <Field label="District" value={ai.district} />
                      <Field label="VDC / Municipality" value={ai.municipality} />
                      <Field label="City" value={ai.city} />
                      <Field label="Ward No." value={ai.ward} />
                      <Field label="Post Box No." value={ai.postbox} />
                      <Field label="Contact Number" value={ai.contact} />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <SectionTitle>2.1 Contact Details</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <Field label="Primary Email" value={ai.email} />
                      <Field label="Alternate Email" value={ai.altEmail} />
                      <Field label="Cell Number" value={ai.cell} />
                      <Field label="Telephone No." value={ai.telephone} />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <SectionTitle>2.2 Organisation / Company</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <Field label="Organisation Name" value={ai.orgName} />
                      <Field label="Organisation Type" value={ai.orgType} />
                      <div className="md:col-span-2"><Field label="Address" value={ai.orgAddress} /></div>
                      <Field label="City" value={ai.orgCity} />
                      <Field label="Province" value={ai.orgProvince} />
                      <Field label="District" value={ai.orgDistrict} />
                      <Field label="VDC / Municipality" value={ai.orgMunicipality} />
                      <Field label="Ward No." value={ai.orgWard} />
                      <Field label="Contact No." value={ai.orgContact} />
                      <Field label="Telephone No." value={ai.orgTelephone} />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <SectionTitle>Registration Certificate</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <Field label="PAN / VAT No." value={ai.pan} />
                      <Field label="Tax Clearance Up To" value={ai.taxClearance} />
                      <Field label="Fax" value={ai.fax} />
                      <Field label="Website" value={ai.website} />
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <SectionTitle>3. Purpose of Digital Signature</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                      <Field label="Certificate Class" value={ai.class ? `Class ${ai.class}` : null} />
                      <Field label="Validity Period" value={ai.validityYears ? `${ai.validityYears} Year(s)` : null} />
                    </div>
                    <Field
                      label="Usage Type"
                      value={
                        <div className="flex flex-wrap gap-1.5">
                          {ai.signatureUse && <Badge label="Signature" />}
                          {ai.encryption && <Badge label="Encryption" />}
                          {ai.bothSignEnc && <Badge label="Both (Signature & Encryption)" />}
                          {!ai.signatureUse && !ai.encryption && !ai.bothSignEnc && (
                            <span className="text-slate-400 italic">None selected</span>
                          )}
                        </div>
                      }
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-[13px]">No additional information submitted</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const ITEMS_PER_PAGE = 20;

  // Quick Date Filters
  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setFromDate(today);
    setToDate(today);
  };

  const setYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    setFromDate(yesterdayStr);
    setToDate(yesterdayStr);
  };

  const setLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30); 
    
    setFromDate(lastMonth.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error("Logout API failed, clearing manually...");
    }
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    fetch("/api/combined-form")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setSubmissions(json.data || []);
        else setError("Failed to load submissions.");
      })
      .catch(() => setError("Network error. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const q = search.toLowerCase().trim();
      const subDate = new Date(sub.createdAt);

      const matchesSearch = !q ||
        sub.name?.toLowerCase().includes(q) ||
        sub.finalName?.toLowerCase().includes(q) ||
        sub.citizenshipNo?.toLowerCase().includes(q) ||
        sub.legalStatus?.toLowerCase().includes(q) ||
        sub.applicant?.toLowerCase().includes(q) ||
        sub.additionalInfo?.email?.toLowerCase().includes(q) ||
        sub.additionalInfo?.orgName?.toLowerCase().includes(q) ||
        sub.additionalInfo?.pan?.toLowerCase().includes(q);

      const matchesFromDate = !fromDate || subDate >= new Date(fromDate);
      const matchesToDate = !toDate || subDate <= new Date(toDate + "T23:59:59");

      return matchesSearch && matchesFromDate && matchesToDate;
    });
  }, [submissions, search, fromDate, toDate]);

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const completeSubmissions = submissions.filter((s) => s.additionalInfo).length;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Digital Signature Applications</h1>
              <p className="text-slate-500 text-sm mt-1">
                Total: {submissions.length} • Complete: {completeSubmissions}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl text-sm transition-all border border-red-100 hover:border-red-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
            <button onClick={setToday} className="px-4 sm:px-5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl text-sm transition-colors">
              📅 Today
            </button>
            <button onClick={setYesterday} className="px-4 sm:px-5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl text-sm transition-colors">
              📅 Yesterday
            </button>
          
            <button onClick={setLastMonth} className="px-4 sm:px-5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl text-sm transition-colors">
              📅 Last 1 Month
            </button>
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
                setSearch("");
              }}
              className="px-4 sm:px-5 py-2 text-slate-500 hover:text-slate-700 font-medium rounded-xl text-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Name, email, PAN, citizenship no..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-1 gap-2">
          <p className="text-sm text-slate-500">
            Showing {paginatedSubmissions.length} of {filteredSubmissions.length} applications
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-slate-500">Page {currentPage} of {totalPages}</p>
          )}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full mb-4"></div>
            <p>Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center">
            {error}
          </div>
        )}

        {!loading && !error && filteredSubmissions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-400 text-lg">No applications found</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}

        {!loading && !error && filteredSubmissions.length > 0 && (
          <div className="space-y-4">
            {paginatedSubmissions.map((sub) => (
              <SubmissionCard key={sub.id} sub={sub} />
            ))}
          </div>
        )}

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-10 gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-5 py-2 text-sm border border-slate-200 rounded-xl disabled:opacity-40 hover:bg-slate-50"
            >
              Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === pageNum ? "bg-indigo-600 text-white" : "border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-5 py-2 text-sm border border-slate-200 rounded-xl disabled:opacity-40 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}