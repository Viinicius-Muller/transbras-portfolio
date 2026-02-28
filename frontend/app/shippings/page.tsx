import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShippingsContent } from "@/components/shippings/shippings-content"

export const metadata = {
  title: "Shippings - TransBras Logistica",
  description:
    "Browse available shipping routes across Brazil and make competitive offers on cargo transportation.",
}

export default function ShippingsPage() {
  return (
    <>
      <Header />
      <main>
        <ShippingsContent />
      </main>
      <Footer />
    </>
  )
}
