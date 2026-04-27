import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/combined-form  →  save both forms, upload photo
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Upload photo to Cloudinary if provided ──────────────────────────
    let photoUrl: string | null = null;
    const photo = formData.get("photo") as File | null;

    if (photo && photo.size > 0) {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "radiant_dsc", resource_type: "image" }, (err, result) => {
            if (err || !result) return reject(err);
            resolve(result as { secure_url: string });
          })
          .end(buffer);
      });

      photoUrl = uploaded.secure_url;
    }

    // ── Helper to safely get string values ─────────────────────────────
    const s = (key: string) => (formData.get(key) as string | null) || null;
    const b = (key: string) => formData.get(key) === "true" || formData.get(key) === "on";
    const d = (key: string) => {
      const v = s(key);
      return v ? new Date(v) : null;
    };

    // ── 1. Save DigitalSignature (Schedule 5) ──────────────────────────
    const digitalSignature = await prisma.digitalSignature.create({
      data: {
        name:                    s("name"),
        legalStatus:             s("legalStatus"),
        citizenshipNo:           s("citizenshipNo"),
        issuingOffice:           s("issuingOffice"),
        issueDate:               d("issueDate"),
        validity:                s("validity"),
        registrationCertificate: s("registrationCertificate"),
        companyIssueDate:        d("companyIssueDate"),
        companyIssuingOffice:    s("companyIssuingOffice"),
        objectives:              s("objectives"),
        purposeAll:              b("purpose.all"),
        purposeBanking:          b("purpose.banking"),
        purposePurchase:         b("purpose.purchase"),
        purposeCertification:    b("purpose.certification"),
        threshold:               s("threshold"),
        applicant:               s("applicant"),
        signature:               s("signature"),
        finalName:               s("finalName"),
      },
    });

    // ── 2. Save AdditionalInfo linked to above ──────────────────────────
    const additionalInfo = await prisma.additionalInfo.create({
      data: {
        digitalSignatureId: digitalSignature.id,
        photoUrl,

        address:      s("address"),
        province:     s("province"),
        district:     s("district"),
        municipality: s("municipality"),
        city:         s("city"),
        ward:         s("ward"),
        postbox:      s("postbox"),
        contact:      s("contact"),

        email:        s("email"),
        altEmail:     s("altEmail"),
        cell:         s("cell"),
        telephone:    s("telephone"),

        orgName:         s("orgName"),
        orgType:         s("orgType"),
        orgAddress:      s("orgAddress"),
        orgCity:         s("orgCity"),
        orgProvince:     s("orgProvince"),
        orgDistrict:     s("orgDistrict"),
        orgMunicipality: s("orgMunicipality"),
        orgWard:         s("orgWard"),
        orgContact:      s("orgContact"),
        orgTelephone:    s("orgTelephone"),
        pan:             s("pan"),
        taxClearance:    s("taxClearance"),
        fax:             s("fax"),
        website:         s("website"),

        class:         s("class"),
        signatureUse:  b("signature"),
        encryption:    b("encryption"),
        bothSignEnc:   b("bothSignEnc"),
        validityYears: s("validity_years"),
      },
    });

    return NextResponse.json(
      { success: true, data: { digitalSignature, additionalInfo } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/combined-form]", error);
    return NextResponse.json(
      { success: false, error: "Failed to save form data." },
      { status: 500 }
    );
  }
}

// GET /api/combined-form  →  fetch all with linked additionalInfo
export async function GET() {
  try {
    const records = await prisma.digitalSignature.findMany({
      orderBy: { createdAt: "desc" },
      include: { additionalInfo: true },
    });

    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error("[GET /api/combined-form]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch records." },
      { status: 500 }
    );
  }
}