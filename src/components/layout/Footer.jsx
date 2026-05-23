export function Footer({ copyrightText = 'Medeva Mint' }) {
  return (
    <footer className="border-t border-gray-200 bg-white py-4 px-6 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} {copyrightText}. All rights reserved.
    </footer>
  )
}
