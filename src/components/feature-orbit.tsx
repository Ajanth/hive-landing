import {
  ArrowUpRightIcon,
  BellIcon,
  ColumnsIcon,
  GitPullRequestIcon,
  NotePencilIcon,
  PlusSquareIcon,
} from "@phosphor-icons/react"

export function FeatureOrbit() {
  return (
    <ul className="feature-orbit" aria-label="Hive features">
      <li className="feature-anchor feature-notes" data-feature="notes" data-angle="-2">
        <a className="feature-card" href="#product">
          <NotePencilIcon size={17} aria-hidden="true" />
          <h2>Keep the good thinking.</h2>
          <p>Decisions and notes, close to the thread.</p>
          <span className="feature-footer">Notes &amp; bookmarks <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
        </a>
      </li>
      <li className="feature-anchor feature-reminders" data-feature="reminders" data-angle="2">
        <a className="feature-card" href="#context-heading">
          <BellIcon size={17} aria-hidden="true" />
          <h2>Remember the next step.</h2>
          <p>A timely nudge, with the context attached.</p>
          <span className="feature-footer">Reminders <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
        </a>
      </li>
      <li className="feature-anchor feature-kanban" data-feature="kanban" data-angle="-1">
        <a className="feature-card" href="#product">
          <ColumnsIcon size={17} aria-hidden="true" />
          <h2>Every thread. A clear next move.</h2>
          <img className="orbit-board-image" src="/images/hive-board.webp" alt="Hive’s Now, Queue, and Done board." width={1120} height={368} fetchPriority="high" />
          <span className="feature-footer">The board <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
        </a>
      </li>
      <li className="feature-anchor feature-tasks" data-feature="tasks" data-angle="1.5">
        <a className="feature-card" href="#product">
          <PlusSquareIcon size={17} aria-hidden="true" />
          <h2>Make the idea actionable.</h2>
          <p>Create a task before the work begins.</p>
          <span className="feature-footer">Tasks &amp; sessions <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
        </a>
      </li>
      <li className="feature-anchor feature-github" data-feature="github" data-angle="-1.5">
        <a className="feature-card" href="#workflow">
          <GitPullRequestIcon size={17} aria-hidden="true" />
          <h2>Keep the code in view.</h2>
          <p>Worktrees, commits, and pull requests.</p>
          <span className="feature-footer">GitHub <ArrowUpRightIcon size={13} aria-hidden="true" /></span>
        </a>
      </li>
    </ul>
  )
}
