import {
  ArrowRightIcon,
  BellRingingIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  HardDrivesIcon,
  NotePencilIcon,
  ShieldCheckIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react"

import { DownloadButton } from "@/components/download-button"
import { Galaxy } from "@/components/galaxy"
import { ProductTour } from "@/components/product-tour"
import { Reveal } from "@/components/reveal"
import { SiteHeader } from "@/components/site-header"

const GITHUB_URL = "https://github.com/Ajanth/hive-public"

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="opening">
        <SiteHeader />
        <main id="main">
          <section className="hero" aria-labelledby="hero-heading">
            <div className="hero-copy">
              <p className="hero-eyebrow">Your local agent workspace</p>
              <h1 id="hero-heading">
                <span>Your agent work.</span>
                <span>In one place.</span>
              </h1>
              <p className="hero-description">
                Organize agent sessions, save the context, and pick up your next
                step in one local Mac workspace.
              </p>
              <div className="hero-actions">
                <DownloadButton />
                <a className="text-link" href="#product">
                  Explore Hive <ArrowRightIcon size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <Galaxy />
          </section>

          <section id="product" className="product-section section-shell" aria-labelledby="product-heading">
            <Reveal>
              <div className="section-intro">
                <h2 id="product-heading">A place for every thread.</h2>
                <p>Your sessions, decisions, and next steps. Connected by the work they belong to.</p>
              </div>
              <ProductTour />
              <div className="product-caption">
                <span>Hive’s product tour, shown with sample work.</span>
                <span><HardDrivesIcon size={15} aria-hidden="true" /> Local on your Mac</span>
              </div>
            </Reveal>
          </section>

          <section className="context-section section-shell" aria-labelledby="context-heading">
            <Reveal>
              <div className="section-intro">
                <h2 id="context-heading">Keep the thinking.<br />Move the work forward.</h2>
                <p>A useful conversation becomes a saved decision, a clear task, or a reminder with the context still attached.</p>
              </div>
              <div className="feature-stories">
                <article className="story story-context">
                  <div className="story-copy">
                    <NotePencilIcon size={24} aria-hidden="true" />
                    <h3>Good context compounds.</h3>
                    <p>Save decisions as notes. Bookmark the useful moments. Keep a thread’s reasoning close to its next step.</p>
                  </div>
                  <div className="context-art">
                    <img src="/images/hive-context.webp" alt="Hive’s tour connects an OpenCode conversation to a note, bookmark, and reminder." width={1120} height={368} loading="lazy" />
                  </div>
                  <div className="story-details">
                    <span><NotePencilIcon size={16} aria-hidden="true" /> Notes</span>
                    <span><BookmarkSimpleIcon size={16} aria-hidden="true" /> Bookmarks</span>
                    <span><BellRingingIcon size={16} aria-hidden="true" /> Reminders</span>
                  </div>
                </article>
                <article className="story story-reminder">
                  <BellRingingIcon className="reminder-icon" size={38} weight="light" aria-hidden="true" />
                  <div className="story-copy">
                    <h3>A nudge. With the why.</h3>
                    <p>Set a reminder on the work itself. Come back to the conversation that made it matter.</p>
                  </div>
                </article>
                <article className="story story-memory">
                  <div className="story-copy">
                    <h3>Find the thread again.</h3>
                    <p>Search your local history and recover the decision, not just the session title.</p>
                  </div>
                  <div className="search-art">
                    <img src="/images/hive-search.webp" alt="Searching OpenCode history in Hive’s tour reveals matching threads and their saved context." width={1120} height={368} loading="lazy" />
                  </div>
                </article>
              </div>
            </Reveal>
          </section>

          <section id="workflow" className="workflow-section section-shell" aria-labelledby="workflow-heading">
            <Reveal>
              <div className="workflow-heading">
                <GitPullRequestIcon size={25} aria-hidden="true" />
                <h2 id="workflow-heading">From a thread<br />to a pull request.</h2>
                <p>Stay close to the repository. Keep the worktree, commits, and GitHub checks within reach as your work takes shape.</p>
              </div>
              <ol className="delivery-flow">
                <li>
                  <div className="flow-symbol"><GitBranchIcon size={27} weight="light" aria-hidden="true" /></div>
                  <h3>Give the work a home.</h3>
                  <p>Keep sessions organized around the project and worktree they belong to.</p>
                </li>
                <li>
                  <div className="flow-symbol"><GitCommitIcon size={27} weight="light" aria-hidden="true" /></div>
                  <h3>Keep changes in context.</h3>
                  <p>Move between agent work and repository actions without losing your place.</p>
                </li>
                <li>
                  <div className="flow-symbol"><GitPullRequestIcon size={27} weight="light" aria-hidden="true" /></div>
                  <h3>Follow it through.</h3>
                  <p>Create a pull request and check its GitHub status from the workspace.</p>
                </li>
              </ol>
              <p className="workflow-footnote"><TerminalWindowIcon size={17} aria-hidden="true" /> Open a thread. Resume in your terminal. Keep going.</p>
            </Reveal>
          </section>

          <section className="privacy-section section-shell" aria-labelledby="privacy-heading">
            <Reveal>
              <div className="privacy-composition">
                <div className="privacy-copy">
                  <p className="section-eyebrow">Local by design</p>
                  <h2 id="privacy-heading">Your work lives<br />where you do.</h2>
                  <p>Hive keeps your session history on your Mac. No telemetry, no analytics, and no remote logging.</p>
                  <a className="text-link" href={`${GITHUB_URL}#security--privacy`} target="_blank" rel="noreferrer">Read about privacy <ArrowRightIcon size={17} aria-hidden="true" /></a>
                </div>
                <img className="privacy-product" src="/images/hive-orbit-icon.webp" alt="A sculptural graphite rendering of the Hive app icon, encircled by a silver orbit." width={1280} height={1280} loading="lazy" />
              </div>
              <div className="privacy-principles">
                <span><HardDrivesIcon size={19} aria-hidden="true" /> Local session history</span>
                <span><ShieldCheckIcon size={19} aria-hidden="true" /> Signed app updates</span>
                <span><CheckIcon size={19} aria-hidden="true" /> No telemetry</span>
              </div>
            </Reveal>
          </section>

          <section className="faq-section section-shell" aria-labelledby="faq-heading">
            <Reveal>
              <h2 id="faq-heading">A few useful details.</h2>
              <div className="faq-list">
                <details>
                  <summary>What does Hive work with?<span aria-hidden="true">+</span></summary>
                  <p>Hive currently supports local OpenCode session history. It brings that work into a searchable board with notes, reminders, worktree tools, and terminal resume.</p>
                </details>
                <details>
                  <summary>Which Mac do I need?<span aria-hidden="true">+</span></summary>
                  <p>Hive requires macOS 14 or later. Download the signed DMG, open it, and drag Hive into Applications.</p>
                </details>
                <details>
                  <summary>Does my session history leave my Mac?<span aria-hidden="true">+</span></summary>
                  <p>Hive stores and indexes your history locally. Network access is used for features such as signed updates, submitted feedback, and integrations or repository actions you explicitly initiate.</p>
                </details>
                <details>
                  <summary>Can I pick up an existing session?<span aria-hidden="true">+</span></summary>
                  <p>Yes. Resume from a board card, focus a live terminal when available, or copy an OpenCode resume command to continue your work.</p>
                </details>
              </div>
            </Reveal>
          </section>

          <section className="closing-section section-shell" aria-labelledby="closing-heading">
            <Reveal>
              <img src="/hive-app-icon.webp" alt="" width={64} height={64} loading="lazy" />
              <h2 id="closing-heading">Make room for<br />your next good idea.</h2>
              <p>Bring the threads together. Keep the work moving.</p>
              <DownloadButton />
              <span className="platform-note">For macOS 14 and later</span>
            </Reveal>
          </section>
        </main>
      </div>
      <footer className="site-footer section-shell">
        <a className="footer-wordmark" href="#">Hive</a>
        <span>A little more space to think.</span>
        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noreferrer">Releases</a>
          <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer">Feedback</a>
        </div>
      </footer>
    </>
  )
}
