import Link from "next/link"
import { Truck, MapPin, Phone, Mail, Linkedin, Github, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#4a3d33] text-[#DFD3B5]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C6E36]">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Trans<span className="text-[#E3BD90]">Bras</span>
              </span>
            </Link>
            <p className="leading-relaxed text-[#C0BDBC]">
              Premium logistics solutions connecting all 26 Brazilian states with
              reliability, speed, and care.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/shippings", label: "Shippings" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#C0BDBC] transition-colors hover:text-[#E3BD90]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "Road Freight",
                "Express Delivery",
                "Warehousing",
                "Supply Chain",
              ].map((service) => (
                <span key={service} className="text-sm text-[#C0BDBC]">
                  {service}
                </span>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E3BD90]">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E3BD90]" />
                <span className="text-sm text-[#C0BDBC]">
                  Rio Negrinho, Santa Catarina - Brazil
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#E3BD90]" />
                <span className="text-sm text-[#C0BDBC]">+55 (47) 98873-1818</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#E3BD90]" />
                <span className="text-sm text-[#C0BDBC]">zandreviniciusmuller@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#DFD3B5]/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[#C0BDBC]/60">
              &copy; 2026 Vinicius Müller. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/andré-vinicius-müller-432b17327"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#C0BDBC]/60 transition-colors hover:bg-[#DFD3B5]/10 hover:text-[#E3BD90]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Viinicius-Muller"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#C0BDBC]/60 transition-colors hover:bg-[#DFD3B5]/10 hover:text-[#E3BD90]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/andre.viniih/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#C0BDBC]/60 transition-colors hover:bg-[#DFD3B5]/10 hover:text-[#E3BD90]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="flex gap-6">
              <span className="text-sm text-[#C0BDBC]/60 hover:text-[#C0BDBC] cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-sm text-[#C0BDBC]/60 hover:text-[#C0BDBC] cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
