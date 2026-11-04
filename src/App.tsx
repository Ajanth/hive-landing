import { ArrowRightIcon } from "@phosphor-icons/react"

import { DownloadButton } from "@/components/download-button"
import { HeroVideo } from "@/components/hero-video"
import { ProductImage } from "@/components/product-tour"
import { Reveal } from "@/components/reveal"
import { SiteHeader } from "@/components/site-header"

const GITHUB_URL = "https://github.com/Ajanth/hive-public"

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-material" aria-hidden="true" />
          <div className="hero-copy section-shell">
            <h1 id="hero-heading">Your agent work.<br />All in one place.</h1>
            <p>
              Your OpenCode conversations, code, and context, brought together
              in one thoughtful Mac workspace.
            </p>
            <div className="hero-actions">
              <DownloadButton />
              <a className="text-link" href="#product">
                See Hive in action <ArrowRightIcon size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div id="product" className="hero-product section-shell">
            <HeroVideo />
          </div>
        </section>

        <section className="story-section section-shell" aria-labelledby="board-heading">
          <Reveal className="story-row board-story">
            <div className="story-copy">
              <h2 id="board-heading">Give every session<br />a place.</h2>
              <p>
                Bring your sessions into view. Move work between Now, Queue,
                and Done, with every project and worktree close by.
              </p>
            </div>
            <div className="story-stage board-stage">
              <ProductImage view="board" />
            </div>
          </Reveal>
        </section>

        <section id="workflow" className="story-section section-shell" aria-labelledby="chat-heading">
          <Reveal className="story-row conversation-story">
            <div className="story-copy">
              <h2 id="chat-heading">One thread.<br />Chat or Terminal.</h2>
              <p>
                Continue the same work in Chat or Terminal. Type a thought,
                speak it aloud, and keep the conversation in context.
              </p>
            </div>
            <div className="story-stage conversation-stage">
              <div className="chat-window">
                <img
                  src="/images/hive-chat-dark.webp"
                  alt="Hive’s built-in Chat showing a real OpenCode prompt and response."
                  width={1900} height={1070} loading="lazy"
                />
              </div>
              <div className="terminal-window">
                <img
                  src="/images/hive-terminal-dark.webp"
                  alt="The same OpenCode conversation in Hive’s integrated Terminal."
                  width={1900} height={1070} loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className="story-section context-section section-shell" aria-labelledby="context-heading">
          <Reveal>
            <div className="context-intro">
              <h2 id="context-heading">Keep the thinking<br />close to the work.</h2>
              <p>
                Turn a useful moment into a Markdown note. Keep decisions,
                ideas, and project details together in your shared library.
              </p>
            </div>
            <div className="story-stage context-stage">
              <div className="note-window"><ProductImage view="focus" /></div>
            </div>
          </Reveal>
        </section>

        <section id="reminders" className="story-section reminders-section section-shell" aria-labelledby="reminders-heading">
          <Reveal className="story-row reminders-story">
            <div className="story-copy">
              <h2 id="reminders-heading">A reminder.<br />With the reason why.</h2>
              <p>
                Leave a nudge for your next step. Return to the right project
                and worktree, with the context ready when you are.
              </p>
            </div>
            <div className="story-stage reminders-stage">
              <div className="reminder-detail">
                <img
                  src="/images/hive-reminder-dark.webp"
                  alt="A scheduled Hive reminder with its project and worktree context."
                  width={1900} height={1070} loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <div className="context-close">
            <p>A little less switching. A little more making.</p>
            <DownloadButton />
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <p>Made for your Mac. Your history stays local.</p>
        <div>
          <a href={`${GITHUB_URL}#security--privacy`} target="_blank" rel="noreferrer">Privacy</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noreferrer">Releases</a>
          <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer">Feedback</a>
        </div>
        <span>macOS 14 or later</span>
      </footer>
    </>
  )
}
