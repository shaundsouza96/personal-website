import Link from "next/link";

export default function Home() {
  return (
    <main className="homePage">
      <div className="homeContent">
        <h1 className="homeName">Shaun D&rsquo;Souza</h1>
        <p className="homeRole">Senior Data Scientist</p>
        <div className="homeLinks">
          <a
            className="homeLink"
            href="https://github.com/shaunamd"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="homeLink"
            href="https://linkedin.com/in/shaunamd"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <Link className="homeLink" href="/writing">
            Writing &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
