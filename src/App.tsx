import {
  ArrowRightIcon,
  BellRingingIcon,
  ChatCircleDotsIcon,
  CheckIcon,
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  HardDrivesIcon,
  KanbanIcon,
  LockSimpleIcon,
  NotebookIcon,
  TerminalWindowIcon
} from "@phosphor-icons/react"

import { DownloadButton } from "@/components/download-button"
import { ProductImage } from "@/components/product-tour"
import { HeroVideo } from "@/components/hero-video"
import { Reveal } from "@/components/reveal"
import { SiteHeader } from "@/components/site-header"

const GITHUB_URL = "https://github.com/Ajanth/hive-public"
const questions = [
  [
    "What does Hive work with?",
    "Hive currently works with OpenCode. Organize local sessions on the board, continue in Chat or Terminal, and keep notes, bookmarks, and reminders connected to the work."
  ],
  [
    "Which Mac do I need?",
    "Hive requires macOS 14 or later. Download the signed DMG, open it, and drag Hive into Applications."
  ],
  [
    "Does my session history leave my Mac?",
    "Hive stores and indexes your history locally, with no telemetry, analytics, or remote logging. Network access is used for agent requests, signed updates, submitted feedback, and integrations or repository actions you initiate."
  ],
  [
    "Can I continue work I already started?",
    "Yes. Bring existing OpenCode sessions into your workspace. Pick up a thread in Chat, use the integrated Terminal, or resume in an external terminal without losing the surrounding context."
  ]
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-material" aria-hidden="true" />
          <div className="hero-copy section-shell">
            <h1 id="hero-heading">
              Good ideas deserve
              <br />a great workspace.
            </h1>
            <p>
              Your agent conversations, code, and context.
              <br className="desktop-break" /> Beautifully connected, right on
              your Mac.
            </p>
            <div className="hero-actions">
              <DownloadButton />
              <a className="secondary-button" href="#product">
                Take a look <ArrowRightIcon size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div id="product" className="hero-product section-shell">
            <HeroVideo />
          </div>
        </section>

        <section
          className="features-section section-shell"
          aria-labelledby="features-heading"
        >
          <Reveal>
            <div className="section-intro">
              <h2 id="features-heading">
                Less switching.
                <br />
                <span>More making.</span>
              </h2>
              <p>
                A place for the work in progress, the thought worth keeping, and
                whatever comes next.
              </p>
            </div>
          </Reveal>
          <div className="bento-grid">
            <Reveal className="bento-board">
              <article className="bento-card board-card">
                <div className="bento-copy">
                  <KanbanIcon size={25} weight="duotone" aria-hidden="true" />
                  <h3>See the whole picture.</h3>
                  <p>
                    Give your OpenCode sessions a home. Organize the now, the
                    next, and the work you’ve moved forward.
                  </p>
                </div>
                <div className="board-crop">
                  <ProductImage view="board" decorative />
                </div>
              </article>
            </Reveal>
            <Reveal className="bento-notes">
              <article className="bento-card notes-card">
                <div className="bento-copy">
                  <NotebookIcon size={25} weight="duotone" aria-hidden="true" />
                  <h3>Keep the good thinking.</h3>
                  <p>
                    A real Markdown editor. A shared notes library. Your
                    decisions, close to the work that inspired them.
                  </p>
                </div>
                <div className="notes-crop">
                  <ProductImage view="focus" decorative />
                </div>
              </article>
            </Reveal>
            <Reveal className="bento-reminders">
              <article className="bento-card reminders-card">
                <div className="reminder-sculpture" aria-hidden="true">
                  <BellRingingIcon size={82} weight="duotone" />
                </div>
                <div className="bento-copy">
                  <h3>A nudge, with the why.</h3>
                  <p>
                    Set a reminder on the conversation. Come back to the
                    context, ready to take the next step.
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal className="bento-workflow">
              <article className="bento-card repository-card">
                <div className="repository-path" aria-hidden="true">
                  <span>
                    <GitBranchIcon size={30} weight="light" />
                  </span>
                  <i />
                  <span>
                    <GitCommitIcon size={30} weight="light" />
                  </span>
                  <i />
                  <span>
                    <GitPullRequestIcon size={30} weight="light" />
                  </span>
                </div>
                <div className="bento-copy">
                  <h3>From a thread to a pull request.</h3>
                  <p>
                    Worktrees, commits, and GitHub checks. Keep the repository
                    in reach as the idea becomes something real.
                  </p>
                  <a className="text-link" href="#workflow">
                    Find your flow{" "}
                    <ArrowRightIcon size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section
          id="workflow"
          className="workflow-section section-shell"
          aria-labelledby="workflow-heading"
        >
          <Reveal>
            <div className="workflow-layout">
              <div className="workflow-copy">
                <h2 id="workflow-heading">
                  Stay in the flow.
                  <br />
                  <span>Keep your place.</span>
                </h2>
                <p className="section-description">
                  Some moments call for a conversation. Others, a terminal. Hive
                  brings the pieces together around the same work.
                </p>
                <div className="workflow-list">
                  <div>
                    <ChatCircleDotsIcon
                      size={23}
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <div>
                      <h3>Talk it through.</h3>
                      <p>
                        Continue your OpenCode conversations in a dedicated Chat
                        workspace.
                      </p>
                    </div>
                  </div>
                  <div>
                    <TerminalWindowIcon
                      size={23}
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <div>
                      <h3>Get into the details.</h3>
                      <p>
                        Use the integrated Terminal or resume in your own. Your
                        project stays within reach.
                      </p>
                    </div>
                  </div>
                  <div>
                    <NotebookIcon
                      size={23}
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <div>
                      <h3>Leave a little context.</h3>
                      <p>
                        Save the decision, bookmark the useful moment, and pick
                        up where you left off.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="workflow-visual">
                <div className="workflow-window">
                  <ProductImage view="notes" decorative />
                </div>
                <p>
                  <NotebookIcon size={16} aria-hidden="true" /> A shared home
                  for your notes, across projects.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section
          className="privacy-section section-shell"
          aria-labelledby="privacy-heading"
        >
          <Reveal>
            <div className="privacy-panel">
              <div className="privacy-art" aria-hidden="true">
                <div className="icon-plinth">
                  <img
                    src="/hive-app-icon.webp"
                    alt=""
                    width={116}
                    height={116}
                    loading="lazy"
                  />
                </div>
                <LockSimpleIcon
                  className="privacy-lock"
                  size={26}
                  weight="duotone"
                />
              </div>
              <div className="privacy-copy">
                <h2 id="privacy-heading">
                  At home.
                  <br />
                  <span>On your Mac.</span>
                </h2>
                <p>
                  Your session history stays local. No telemetry, no analytics,
                  and no remote logging. Just a little more room to do your
                  thing.
                </p>
                <a
                  className="text-link"
                  href={`${GITHUB_URL}#security--privacy`}
                  target="_blank"
                  rel="noreferrer"
                >
                  The details on privacy{" "}
                  <ArrowRightIcon size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="privacy-principles">
                <span>
                  <HardDrivesIcon size={18} aria-hidden="true" /> Local history
                </span>
                <span>
                  <LockSimpleIcon size={18} aria-hidden="true" /> Signed app
                  updates
                </span>
                <span>
                  <CheckIcon size={18} aria-hidden="true" /> No telemetry
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <section
          className="faq-section section-shell"
          aria-labelledby="faq-heading"
        >
          <Reveal>
            <div className="faq-layout">
              <h2 id="faq-heading">
                A few
                <br />
                <span>useful details.</span>
              </h2>
              <div className="faq-list">
                {questions.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section
          className="closing-section section-shell"
          aria-labelledby="closing-heading"
        >
          <Reveal>
            <div className="closing-panel">
              <img
                src="/hive-app-icon.webp"
                alt=""
                width={56}
                height={56}
                loading="lazy"
              />
              <h2 id="closing-heading">
                Your next idea
                <br />
                looks good here.
              </h2>
              <p>Make yourself at home in Hive.</p>
              <DownloadButton />
              <span className="platform-note">For macOS 14 and later</span>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a className="wordmark" href="#" aria-label="Hive home">
          <img src="/hive-app-icon.webp" alt="" width={25} height={25} />
          Hive
        </a>
        <span>A little more space to think.</span>
        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noreferrer">
            Releases
          </a>
          <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer">
            Feedback
          </a>
        </div>
      </footer>
    </>
  )
}
