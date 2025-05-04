export default function Footer() {
  return (
    <footer className="bg-teal-400 mt-auto">
      <div className="container mx-auto text-center py-5">
        <p className="text-[17px] text-white">Este proyecto está bajo Licencia MIT © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
