// Old route from an earlier version — the blog was removed (wixnova.com has no blog). Safe to delete this folder.
import { redirect } from 'next/navigation';

export default function BlogRedirect() {
  redirect('/');
}
