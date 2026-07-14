import { redirect } from 'next/navigation';
// import {locales} from "@/navigation";

export default function RootPage() {
  // const locale = locales.includes(navigator.languages[0].split('-')[0])
  //   ? navigator.languages[0].split('-')[0] : 'en';
  // redirect(`/${locale}`);
  redirect('/en');
}
