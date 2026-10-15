interface SiteFooterProps {
  namaProduk: string;
}

export default function SiteFooter({ namaProduk }: SiteFooterProps) {
  return (
    <footer className="border-t mt-auto p-4 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()} {namaProduk}. Hak Cipta Dilindungi.</p>
    </footer>
  );
}