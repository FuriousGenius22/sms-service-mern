import { footerData } from "@/constants/footer";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { IFooterLink } from "@/types";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/">
              <img
                src="/assets/logo.svg"
                alt="Logo"
                className="h-7 w-auto"
                width={120}
                height={28}
              />
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
              Virtual phone numbers and SMS API for verification and testing.
              Trusted by thousands of developers worldwide.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#!"
                className="text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#!"
                className="text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#!"
                className="text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold text-gray-200">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link: IFooterLink, i: number) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] text-sm text-gray-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
