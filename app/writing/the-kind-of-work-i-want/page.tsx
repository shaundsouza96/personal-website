import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Kind of Work I Want",
  description:
    "What I look for in my next role, from how I learn to the teams and products I want to work on.",
};

export default function KindOfWorkPage() {
  return (
    <main className="articlePage">
      <article className="articleContent">
        <Link href="/writing" className="writingBack">← Writing</Link>
        <h1 className="articleTitle">The Kind of Work I Want</h1>
        <div className="articleBody">
          <p>
            <strong>I want to learn new ways to solve problems.</strong>{" "}
            While it would be nice for my learning to be in applied stats, learning to think
            more clearly in general would also be valuable. These skills should be{" "}
            <strong>translatable to other environments</strong>{" "}
            rather than specific to the company or industry context. To learn, I need people
            that I can learn from and management that will give me the time and space to apply
            something new.
          </p>
          <p>
            <strong>I want to work on small’ish teams.</strong>{" "}
            On these teams, because there is more work than there are people, you can take
            ownership of tasks without squabbling over who gets to do what. You are also likely
            to have a broader scope which is something I enjoy. Teams of around 10 have been
            the most enjoyable
          </p>
          <p>
            <strong>I want to work in person.</strong>{" "}
            I need people to talk to and a space to work that’s separate from my home. Working
            in this way feels emotionally healthier because I’m able to build relationships.
            There doesn’t need to be a strong company culture per se, but rather people whose
            company I enjoy
          </p>
          <p>
            <strong>I want to work for a company with growth potential.</strong>{" "}
            High growth companies offer better financial benefits while also giving younger
            employees opportunities that might require more experience. While I’m interested
            in AI, I don’t need the company to be producing an AI product, so long as I’m able
            to utilize it in my work.
          </p>
          <p>
            <strong>I’d like the company to be in the consumer space.</strong>{" "}
            It’s more interesting to solve problems for people than it is to solve problems
            for other companies
          </p>
          <p>
            <strong>I do not want to work on systems that cause direct harm.</strong>{" "}
            No online gambling, no defense.
          </p>
        </div>
      </article>
    </main>
  );
}
