import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="space-y-8 mx-auto px-4 max-w-7xl text-center">
        <Image
          className="mx-auto"
          src="/img/logo.png"
          alt="logo"
          width={200}
          height={200}
        />
        <p className="text-gray-600">
          Marketplace for searching, filtering and instantly booking team
          activities
        </p>
        <div className="flex justify-center space-x-4">
          <Facebook className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
          <Linkedin className="w-5 h-5" />
          <Mail className="w-5 h-5" />
        </div>
        <div className="pt-6 border-t">
          <p className="text-gray-500 text-sm">Copyright © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
