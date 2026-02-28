import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata = {
  title: "Contact - TransBras Logistica",
  description:
    "Get in touch with TransBras. Partner with us, apply for a job, or submit a complaint.",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
