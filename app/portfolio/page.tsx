// Old route from an earlier version — client results now live at /work. Safe to delete this folder.
import { redirect } from 'next/navigation';

export default function PortfolioRedirect() {
  redirect('/work');
}
