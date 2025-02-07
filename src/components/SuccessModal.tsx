"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ${
        open ? "visible" : "hidden"
      }`}
    >
      <div className="relative space-y-4 bg-white p-4 rounded-lg w-96">
        <button className="top-2 right-2 absolute" onClick={onClose}>
          <X strokeWidth={"1px"} className="w-6 h-6" />
        </button>
        <Image
          src="/img/form-modal.svg"
          alt="form modal"
          width={800}
          height={800}
          className="bg-gray-300 mx-auto rounded-full w-36 h-36"
        />
        <p className="font-semibold text-center text-xl">Form Submitted</p>
      </div>
    </div>
  );
}
