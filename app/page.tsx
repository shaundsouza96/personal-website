import Link from "next/link";

export default function Home() {
  return (
    <main className="homePage">
      <div className="homeContent">
        <h1 className="homeName">Shaun D&rsquo;Souza</h1>
        <p className="homeRole">Senior Data Scientist</p>

        <div className="homeLinks">
          <a className="homeLink" href="https://github.com/shaundsouza96/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="homeLink" href="https://www.linkedin.com/in/shaundsouza96/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link className="homeLink" href="/writing">
            Writing →
          </Link>
        </div>
      </div>
    </main>
  );
}
