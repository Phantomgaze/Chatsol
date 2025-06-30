import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Docs", href: "#docs" },
      { name: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
    ],
  },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: (
      <svg width="20" height="20" fill="currentColor" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.213 2.188 4.096A4.904 4.904 0 0 1 .964 8.1v.062a4.918 4.918 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.084 4.936 4.936 0 0 0 4.604 3.419A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg width="20" height="20" fill="currentColor" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.012-1.232-.017-2.234-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 6.844c1.022.005 2.051.138 3.013.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 px-4 dark:bg-[#18181B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="flex flex-col items-start gap-4 md:w-1/3">
          <Image src="/images/chatsol-logo.png" alt="Corinna AI Logo" width={120} height={40} />
          <p className="text-muted-foreground text-sm max-w-xs">Empowering your workflow with intelligent automation and modern UI.</p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-grow justify-between gap-8">
          <div className="flex gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-2 text-foreground">{section.title}</h4>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-full sm:w-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} ChatSol. All rights reserved.
      </div>
    </footer>
  );
}
