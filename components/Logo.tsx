import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group">
      <span className="font-mono text-xl font-bold tracking-widest text-[#00ff41] group-hover:text-white transition-colors">
        <span className="cursor-blink">&#9608;</span>{' '}
        VSQ<span className="text-white group-hover:text-[#00ff41] transition-colors">.</span>NEWS
      </span>
    </Link>
  );
}
