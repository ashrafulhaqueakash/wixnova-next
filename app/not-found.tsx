import { TalkButton } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 pt-32 text-center">
      <div>
        <p className="label">Error 404</p>
        <h1 className="cond mt-6 text-mega">Lost?<br /><span className="text-lime-700">Happens.</span></h1>
        <p className="lead mx-auto mt-8 max-w-md">This page wandered off. Let&apos;s get you somewhere useful.</p>
        <div className="mt-8 flex justify-center"><TalkButton href="/">Back home</TalkButton></div>
      </div>
    </section>
  );
}
