"use client";

import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ContactRow = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

export default function ContactSection() {
  const rows: ContactRow[] = [
    {
      icon: <Mail className="h-[18px] w-[18px]" />,
      label: "Email",
      value: "info@aspirecollege.edu.pk",
    },
    {
      icon: <Phone className="h-[18px] w-[18px]" />,
      label: "Phone",
      value: "+92 21 1234 5678",
    },
    {
      icon: <MapPin className="h-[18px] w-[18px]" />,
      label: "Address",
      value: (
        <>
          Aspire College, Main Campus,
          <br />
          Plot # 45, Education City, Karachi, Pakistan.
        </>
      ),
    },
    {
      icon: <Clock className="h-[18px] w-[18px]" />,
      label: "Office Hours",
      value: (
        <>
          Monday – Friday
          <br />
          9:00 AM – 5:00 PM
        </>
      ),
    },
  ];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-white p-5">
      <div className="relative z-10 grid w-full max-w-full grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] md:grid-cols-2">
        {/* LEFT: image panel */}
        <div
          className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#dce3f5] via-[#e8edf8] to-[#f0f4ff] md:min-h-[640px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)" }}
        >
          <Image
            src="https://images.pexels.com/photos/3855619/pexels-photo-3855619.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt="Staff member ready to help with your inquiry"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* RIGHT: info panel */}
        <div className="p-9 md:p-14">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#1c3fe0] shadow-sm">
            Get in touch
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#0a1240]">
            Contact <span className="text-[#2f56fb]">Us</span>
          </h1>

          <div className="my-4 flex items-center gap-1.5">
            <div className="h-1 w-[34px] rounded-full bg-[#2f56fb]" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-55" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-30" />
          </div>

          <p className="mb-7 max-w-[420px] text-[15px] leading-[1.8] text-[#3d4566]">
            We&apos;d love to hear from you! Reach out to us for admissions,
            inquiries, or any other information.
          </p>

          <div>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-start gap-4 py-4 ${
                  i === rows.length - 1 ? "" : "border-b border-[#e8edf8]"
                }`}
              >
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full bg-[#2f56fb] text-white shadow-[0_8px_16px_-4px_rgba(47,86,251,0.3)]">
                  {row.icon}
                </div>
                <div>
                  <div className="mb-0.5 text-[13px] font-semibold text-[#2f56fb]">
                    {row.label}
                  </div>
                  <div className="text-[15px] font-medium leading-snug text-[#0a1240]">
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/Contact"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] cursor-pointer [&:hover>svg]:translate-x-1"
          >
            Contact Us
            <ArrowRight className="h-[18px] w-[18px] transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}